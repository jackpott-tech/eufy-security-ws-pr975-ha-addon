import { WebSocketServer } from "ws";
import { Logger } from "tslog";
import { EventEmitter, once } from "events";
import { createServer, } from "http";
import { DeviceNotFoundError, InvalidCountryCodeError, InvalidLanguageCodeError, InvalidPropertyValueError, libVersion, NotSupportedError, ReadOnlyPropertyError, StationNotFoundError, WrongStationError, PropertyNotSupportedError, InvalidPropertyError, InvalidCommandValueError, LivestreamNotRunningError as EufyLivestreamNotRunningError, LivestreamAlreadyRunningError as EufyLivestreamAlreadyRunningError, InvalidPropertyError as EufyInvalidPropertyError, PropertyNotSupportedError as EufyPropertyNotSupportedError, StationConnectTimeoutError, RTSPPropertyNotEnabledError, } from "eufy-security-client";
import { EventForwarder } from "./forward.js";
import { version, minSchemaVersion, maxSchemaVersion } from "./const.js";
import { DeviceMessageHandler } from "./device/message_handler.js";
import { StationMessageHandler } from "./station/message_handler.js";
import { BaseError, DownloadAlreadyRunningError, DownloadNotRunningError, DownloadOnlyOneAtATimeError, ErrorCode, LivestreamAlreadyRunningError, LivestreamNotRunningError, SchemaIncompatibleError, TalkbackAlreadyRunningError, TalkbackNotRunningError, TalkbackOnlyOneAtATimeError, UnknownCommandError, } from "./error.js";
import { Instance } from "./instance.js";
import { ServerCommand } from "./command.js";
import { DriverMessageHandler } from "./driver/message_handler.js";
import { dumpState } from "./state.js";
import { LoggingEventForwarder } from "./logging.js";
import { ServerEvent } from "./event.js";
import { DriverEvent } from "./driver/event.js";
export class Client {
    socket;
    driver;
    logger;
    clientsController;
    receiveEvents = false;
    receiveLogs = false;
    _outstandingPing = false;
    schemaVersion = minSchemaVersion;
    receiveLivestream = {};
    receiveDownloadStream = {};
    sendTalkbackStream = {};
    instanceHandlers = {
        [Instance.station]: (message) => StationMessageHandler.handle(message, this.driver, this),
        [Instance.driver]: (message) => DriverMessageHandler.handle(message, this.driver, this, this.clientsController, this.logger),
        [Instance.device]: (message) => DeviceMessageHandler.handle(message, this.driver, this),
    };
    constructor(socket, driver, logger, clientsController) {
        this.socket = socket;
        this.driver = driver;
        this.logger = logger;
        this.clientsController = clientsController;
        socket.on("pong", () => {
            this._outstandingPing = false;
        });
        socket.on("message", (data) => this.receiveMessage(data));
    }
    rawDataToString(data) {
        if (Buffer.isBuffer(data)) {
            return data.toString("utf-8");
        }
        else if (data instanceof ArrayBuffer) {
            return new TextDecoder().decode(data);
        }
        else if (Array.isArray(data)) {
            return Buffer.concat(data).toString("utf-8");
        }
        return String(data);
    }
    get isConnected() {
        return this.socket.readyState === this.socket.OPEN;
    }
    async receiveMessage(data) {
        let msg;
        let dataString;
        try {
            dataString = this.rawDataToString(data);
            msg = JSON.parse(dataString);
        }
        catch (err) {
            // We don't have the message ID. Just close it.
            this.logger.debug(`Unable to parse data: ${Buffer.isBuffer(data) ? data.toString("utf-8").substring(0, 100) : String(data).substring(0, 100)}`);
            this.socket.close();
            return;
        }
        try {
            if (msg.command === ServerCommand.setApiSchema) {
                // Handle schema version
                this.schemaVersion = msg.schemaVersion;
                if (this.schemaVersion < minSchemaVersion ||
                    this.schemaVersion > maxSchemaVersion) {
                    throw new SchemaIncompatibleError(this.schemaVersion);
                }
                this.sendResultSuccess(msg.messageId, {});
                return;
            }
            if (msg.command === ServerCommand.startListening) {
                this.sendResultSuccess(msg.messageId, {
                    state: await dumpState(this.driver, this.schemaVersion),
                });
                this.receiveEvents = true;
                if (DriverMessageHandler.tfa) {
                    this.sendEvent({
                        source: "driver",
                        event: DriverEvent.verifyCode,
                    });
                }
                if (DriverMessageHandler.captchaId && DriverMessageHandler.captcha) {
                    if (this.schemaVersion >= 7) {
                        this.sendEvent({
                            source: "driver",
                            event: DriverEvent.captchaRequest,
                            captchaId: DriverMessageHandler.captchaId,
                            captcha: DriverMessageHandler.captcha,
                        });
                    }
                }
                return;
            }
            const instance = msg.command.split(".")[0];
            if (this.instanceHandlers[instance]) {
                return this.sendResultSuccess(msg.messageId, await this.instanceHandlers[instance](msg));
            }
            throw new UnknownCommandError(msg.command);
        }
        catch (error) {
            if (error instanceof BaseError) {
                this.logger.error("Message error", error);
                return this.sendResultError(msg.messageId, error.errorCode);
            }
            if (error instanceof DeviceNotFoundError) {
                this.logger.error("Message error", error);
                return this.sendResultError(msg.messageId, ErrorCode.deviceNotFound);
            }
            if (error instanceof StationNotFoundError) {
                this.logger.error("Message error", error);
                return this.sendResultError(msg.messageId, ErrorCode.stationNotFound);
            }
            if (error instanceof NotSupportedError) {
                this.logger.error("Message error", error);
                return this.sendResultError(msg.messageId, ErrorCode.deviceNotSupported);
            }
            if (error instanceof WrongStationError) {
                this.logger.error("Message error", error);
                return this.sendResultError(msg.messageId, ErrorCode.deviceWrongStation);
            }
            if (error instanceof InvalidPropertyValueError) {
                this.logger.error("Message error", error);
                return this.sendResultError(msg.messageId, ErrorCode.deviceInvalidPropertyValue);
            }
            if (error instanceof ReadOnlyPropertyError) {
                this.logger.error("Message error", error);
                return this.sendResultError(msg.messageId, ErrorCode.deviceReadOnlyProperty);
            }
            if (error instanceof InvalidCountryCodeError) {
                this.logger.error("Message error", error);
                return this.sendResultError(msg.messageId, ErrorCode.invalidCountryCode);
            }
            if (error instanceof InvalidLanguageCodeError) {
                this.logger.error("Message error", error);
                return this.sendResultError(msg.messageId, ErrorCode.invalidLanguageCode);
            }
            if (error instanceof InvalidPropertyError ||
                error instanceof EufyInvalidPropertyError) {
                this.logger.error("Message error", error);
                return this.sendResultError(msg.messageId, ErrorCode.deviceInvalidProperty);
            }
            if (error instanceof LivestreamAlreadyRunningError ||
                error instanceof EufyLivestreamAlreadyRunningError) {
                this.logger.error("Message error", error);
                return this.sendResultError(msg.messageId, ErrorCode.deviceLivestreamAlreadyRunning);
            }
            if (error instanceof LivestreamNotRunningError ||
                error instanceof EufyLivestreamNotRunningError) {
                this.logger.error("Message error", error);
                return this.sendResultError(msg.messageId, ErrorCode.deviceLivestreamNotRunning);
            }
            if (error instanceof PropertyNotSupportedError ||
                error instanceof EufyPropertyNotSupportedError) {
                this.logger.error("Message error", error);
                return this.sendResultError(msg.messageId, ErrorCode.devicePropertyNotSupported);
            }
            if (error instanceof InvalidCommandValueError) {
                this.logger.error("Message error", error);
                return this.sendResultError(msg.messageId, ErrorCode.deviceInvalidCommandValue);
            }
            if (error instanceof DownloadAlreadyRunningError) {
                this.logger.error("Message error", error);
                return this.sendResultError(msg.messageId, ErrorCode.deviceDownloadAlreadyRunning);
            }
            if (error instanceof DownloadNotRunningError) {
                this.logger.error("Message error", error);
                return this.sendResultError(msg.messageId, ErrorCode.deviceDownloadNotRunning);
            }
            if (error instanceof DownloadOnlyOneAtATimeError) {
                this.logger.error("Message error", error);
                return this.sendResultError(msg.messageId, ErrorCode.deviceOnlyOneDownloadAtATime);
            }
            if (error instanceof TalkbackAlreadyRunningError) {
                this.logger.error("Message error", error);
                return this.sendResultError(msg.messageId, ErrorCode.deviceTalkbackAlreadyRunning);
            }
            if (error instanceof TalkbackNotRunningError) {
                this.logger.error("Message error", error);
                return this.sendResultError(msg.messageId, ErrorCode.deviceTalkbackNotRunning);
            }
            if (error instanceof TalkbackOnlyOneAtATimeError) {
                this.logger.error("Message error", error);
                return this.sendResultError(msg.messageId, ErrorCode.deviceOnlyOneTalkbackAtATime);
            }
            if (error instanceof StationConnectTimeoutError) {
                this.logger.error("Message error", error);
                return this.sendResultError(msg.messageId, ErrorCode.stationConnectionTimeout);
            }
            if (error instanceof RTSPPropertyNotEnabledError) {
                this.logger.error("Message error", error);
                return this.sendResultError(msg.messageId, ErrorCode.deviceRTSPPropertyNotEnabled);
            }
            this.logger.error("Unexpected error", error);
            this.sendResultError(msg.messageId, ErrorCode.unknownError);
        }
    }
    sendVersion() {
        this.sendData({
            type: "version",
            driverVersion: libVersion,
            serverVersion: version,
            minSchemaVersion: minSchemaVersion,
            maxSchemaVersion: maxSchemaVersion,
        });
    }
    sendResultSuccess(messageId, result) {
        this.sendData({
            type: "result",
            success: true,
            messageId,
            result,
        });
    }
    sendResultError(messageId, errorCode) {
        this.sendData({
            type: "result",
            success: false,
            messageId,
            errorCode,
        });
    }
    sendEvent(event) {
        this.sendData({
            type: "event",
            event,
        });
    }
    sendData(data) {
        this.socket.send(JSON.stringify(data));
    }
    checkAlive() {
        if (this._outstandingPing) {
            this.disconnect();
            return;
        }
        this._outstandingPing = true;
        this.socket.ping();
    }
    disconnect() {
        this.socket.close();
    }
}
export class ClientsController {
    driver;
    logger;
    clients = [];
    pingInterval;
    eventForwarder;
    cleanupScheduled = false;
    loggingEventForwarder;
    closureReasons = {
        1000: "Normal Closure",
        1001: "Going Away",
        1002: "Protocol error",
        1003: "Unsupported Data",
        1005: "Closure without status (client implementation issue)",
        1006: "Abnormal Closure",
        1007: "Invalid frame payload data",
        1008: "Policy Viollation",
        1009: "Message Too Big",
        1010: "Mantatory Extension",
        1011: "Internal Error",
        1012: "Service Restart",
        1013: "Try Again Later",
        1014: "Bad Gateway",
        1015: "TLS handshake failure",
    };
    constructor(driver, logger) {
        this.driver = driver;
        this.logger = logger;
        this.eventForwarder = new EventForwarder(this, logger);
        this.eventForwarder.start();
    }
    addSocket(socket, request) {
        this.logger.debug(`New client with ip: ${request.socket.remoteAddress} port: ${request.socket.remotePort}`);
        const client = new Client(socket, this.driver, this.logger, this);
        socket.on("error", (error) => {
            this.logger.error(`Client with ip: ${request.socket.remoteAddress} port: ${request.socket.remotePort} socket error`, error);
        });
        socket.on("close", (code, reason) => {
            this.logger.info(`Client disconnected with ip: ${request.socket.remoteAddress} port: ${request.socket.remotePort} code: ${code} reason: ${this.closureReasons[code]}`);
            this.scheduleClientCleanup();
        });
        client.sendVersion();
        this.clients.push(client);
        if (this.pingInterval === undefined) {
            this.pingInterval = setInterval(() => {
                const newClients = [];
                for (const client of this.clients) {
                    if (client.isConnected) {
                        newClients.push(client);
                    }
                    else {
                        client.disconnect();
                    }
                }
                this.clients = newClients;
            }, 30000);
        }
    }
    get loggingEventForwarderStarted() {
        return this.loggingEventForwarder?.started === true;
    }
    restartLoggingEventForwarderIfNeeded() {
        this.loggingEventForwarder?.restartIfNeeded();
    }
    startLoggingEventForwarder() {
        if (this.loggingEventForwarder === undefined) {
            this.loggingEventForwarder = new LoggingEventForwarder(this, this.logger);
        }
        if (!this.loggingEventForwarderStarted) {
            this.loggingEventForwarder?.start();
        }
    }
    stopLoggingEventForwarder() {
        if (this.clients.filter((cl) => cl.receiveLogs).length == 0 &&
            this.loggingEventForwarderStarted) {
            this.loggingEventForwarder?.stop();
        }
    }
    scheduleClientCleanup() {
        if (this.cleanupScheduled) {
            return;
        }
        this.cleanupScheduled = true;
        setTimeout(() => this.cleanupClients(), 0);
    }
    cleanupClients() {
        this.cleanupScheduled = false;
        const disconnectedClients = this.clients.filter((cl) => cl.isConnected === false);
        this.clients = this.clients.filter((cl) => cl.isConnected);
        disconnectedClients.forEach((client) => {
            Object.keys(client.receiveLivestream).forEach((serialNumber) => {
                this.driver
                    .getDevice(serialNumber)
                    .then((device) => {
                    this.driver
                        .getStation(device.getStationSerial())
                        .then((station) => {
                        const streamingDevices = DeviceMessageHandler.getStreamingDevices(station.getSerial());
                        if (client.receiveLivestream[serialNumber] === true &&
                            streamingDevices.length === 1 &&
                            streamingDevices.includes(client)) {
                            if (station.isLiveStreaming(device))
                                station.stopLivestream(device);
                        }
                        client.receiveLivestream[device.getSerial()] = false;
                        DeviceMessageHandler.removeStreamingDevice(station.getSerial(), client);
                    })
                        .catch((error) => {
                        this.logger.error(`Error doing livestream cleanup of client`, error);
                    });
                })
                    .catch((error) => {
                    this.logger.error(`Error doing livestream cleanup of client`, error);
                });
            });
            Object.keys(client.receiveDownloadStream).forEach((serialNumber) => {
                this.driver
                    .getDevice(serialNumber)
                    .then((device) => {
                    this.driver
                        .getStation(device.getStationSerial())
                        .then((station) => {
                        const downloadingDevices = DeviceMessageHandler.getDownloadingDevices(station.getSerial());
                        if (client.receiveDownloadStream[serialNumber] === true &&
                            downloadingDevices.length === 1 &&
                            downloadingDevices.includes(client)) {
                            if (station.isDownloading(device))
                                station.cancelDownload(device);
                        }
                        client.receiveDownloadStream[device.getSerial()] = false;
                        DeviceMessageHandler.removeDownloadingDevice(station.getSerial(), client);
                    })
                        .catch((error) => {
                        this.logger.error(`Error doing download cleanup of client`, error);
                    });
                })
                    .catch((error) => {
                    this.logger.error(`Error doing download cleanup of client`, error);
                });
            });
            Object.keys(client.sendTalkbackStream).forEach((serialNumber) => {
                this.driver
                    .getDevice(serialNumber)
                    .then((device) => {
                    this.driver
                        .getStation(device.getStationSerial())
                        .then((station) => {
                        const talkbackingDevices = DeviceMessageHandler.getTalkbackingDevices(station.getSerial());
                        if (client.sendTalkbackStream[serialNumber] === true &&
                            talkbackingDevices.length === 1 &&
                            talkbackingDevices.includes(client)) {
                            if (station.isTalkbackOngoing(device))
                                station.stopTalkback(device);
                        }
                        client.sendTalkbackStream[device.getSerial()] = false;
                        DeviceMessageHandler.removeTalkbackingDevice(station.getSerial(), client);
                    })
                        .catch((error) => {
                        this.logger.error(`Error doing download cleanup of client`, error);
                    });
                })
                    .catch((error) => {
                    this.logger.error(`Error doing download cleanup of client`, error);
                });
            });
        });
        this.stopLoggingEventForwarder();
    }
    disconnect() {
        if (this.pingInterval !== undefined) {
            clearInterval(this.pingInterval);
        }
        this.pingInterval = undefined;
        this.clients.forEach((client) => {
            if (client.schemaVersion >= 10) {
                client.sendEvent({
                    source: "server",
                    event: ServerEvent.shutdown,
                });
            }
        });
        this.clients.forEach((client) => client.disconnect());
        this.clients = [];
        this.stopLoggingEventForwarder();
    }
}
export class EufySecurityServer extends EventEmitter {
    driver;
    options;
    server;
    wsServer;
    sockets;
    logger;
    constructor(driver, options) {
        super();
        this.driver = driver;
        this.options = options;
        this.logger = options.logger ?? new Logger();
    }
    async start() {
        this.server = createServer();
        this.wsServer = new WebSocketServer({ server: this.server });
        this.sockets = new ClientsController(this.driver, this.logger);
        this.wsServer.on("connection", (socket, request) => this.sockets?.addSocket(socket, request));
        this.logger.debug(`Starting server on host ${this.options.host}, port ${this.options.port}`);
        this.server.on("error", this.onError.bind(this));
        this.server.listen(this.options.port, this.options.host);
        await once(this.server, "listening");
        this.emit("listening");
        this.logger.info(`Eufy Security server listening on host ${this.options.host}, port ${this.options.port}`);
        await this.driver.connect();
    }
    onError(error) {
        this.emit("error", error);
        this.logger.error(error);
    }
    async destroy() {
        this.logger.debug(`Closing server...`);
        if (this.sockets) {
            this.sockets.disconnect();
        }
        if (this.server) {
            this.server.close();
            await once(this.server, "close");
        }
        this.logger.info(`Server closed`);
    }
}
//# sourceMappingURL=server.js.map