import { AudioCodec, CommandType, ErrorCode, ParamType, Station, VideoCodec, } from "eufy-security-client";
import { dumpStation } from "./station/state.js";
import { StationEvent } from "./station/event.js";
import { dumpDevice } from "./device/state.js";
import { DeviceEvent } from "./device/event.js";
import { DriverEvent } from "./driver/event.js";
import { StationCommand } from "./station/command.js";
import { DeviceCommand } from "./device/command.js";
import { maxSchemaVersion as internalSchemaVersion } from "./const.js";
import { DeviceMessageHandler } from "./device/message_handler.js";
import { DriverMessageHandler } from "./driver/message_handler.js";
import { convertCamelCaseToSnakeCase } from "./utils.js";
export class EventForwarder {
    clients;
    logger;
    constructor(clients, logger) {
        this.clients = clients;
        this.logger = logger;
    }
    start() {
        this.clients.driver.on("tfa request", () => {
            DriverMessageHandler.tfa = true;
            this.forwardEvent({
                source: "driver",
                event: DriverEvent.verifyCode,
            }, 0);
        });
        this.clients.driver.on("captcha request", (id, captcha) => {
            DriverMessageHandler.captchaId = id;
            DriverMessageHandler.captcha = captcha;
            this.forwardEvent({
                source: "driver",
                event: DriverEvent.captchaRequest,
                captchaId: id,
                captcha: captcha,
            }, 7);
        });
        this.clients.driver.on("connect", () => {
            this.clients.clients.forEach((client) => this.sendEvent(client, {
                source: "driver",
                event: DriverEvent.connected,
            }));
        });
        this.clients.driver.on("close", () => {
            this.clients.clients.forEach((client) => this.sendEvent(client, {
                source: "driver",
                event: DriverEvent.disconnected,
            }));
        });
        this.clients.driver.on("push connect", () => {
            this.clients.clients.forEach((client) => this.sendEvent(client, {
                source: "driver",
                event: DriverEvent.pushConnected,
            }));
        });
        this.clients.driver.on("push close", () => {
            this.clients.clients.forEach((client) => this.sendEvent(client, {
                source: "driver",
                event: DriverEvent.pushDisconnected,
            }));
        });
        this.clients.driver.on("mqtt connect", () => {
            this.clients.clients.forEach((client) => this.sendEvent(client, {
                source: "driver",
                event: DriverEvent.mqttConnected,
            }));
        });
        this.clients.driver.on("mqtt close", () => {
            this.clients.clients.forEach((client) => this.sendEvent(client, {
                source: "driver",
                event: DriverEvent.mqttDisconnected,
            }));
        });
        this.clients.driver.on("connection error", (error) => {
            this.forwardEvent({
                source: "driver",
                event: DriverEvent.connectionError,
                error: error,
            }, 14);
        });
        this.clients.driver.on("station removed", (station) => {
            this.clients.clients.forEach((client) => {
                if (client.schemaVersion <= 12) {
                    this.sendEvent(client, {
                        source: "station",
                        event: StationEvent.stationRemoved,
                        station: dumpStation(station, client.schemaVersion),
                    });
                }
                else {
                    this.sendEvent(client, {
                        source: "station",
                        event: StationEvent.stationRemoved,
                        station: station.getSerial(),
                    });
                }
            });
        });
        this.clients.driver.on("device removed", (device) => {
            this.clients.clients.forEach((client) => {
                if (client.schemaVersion <= 12) {
                    this.sendEvent(client, {
                        source: "device",
                        event: DeviceEvent.deviceRemoved,
                        device: dumpDevice(device, client.schemaVersion),
                    });
                }
                else {
                    this.sendEvent(client, {
                        source: "device",
                        event: DeviceEvent.deviceRemoved,
                        device: device.getSerial(),
                    });
                }
            });
        });
        this.clients.driver
            .getStations()
            .then((stations) => {
            stations.forEach((station) => {
                this.setupStation(station);
            });
        })
            .catch()
            .finally(() => {
            this.clients.driver.on("station added", (station) => {
                this.clients.clients.forEach((client) => {
                    if (client.schemaVersion <= 12) {
                        this.sendEvent(client, {
                            source: "station",
                            event: StationEvent.stationAdded,
                            station: dumpStation(station, client.schemaVersion),
                        });
                    }
                    else {
                        this.sendEvent(client, {
                            source: "station",
                            event: StationEvent.stationAdded,
                            station: station.getSerial(),
                        });
                    }
                });
                this.setupStation(station);
            });
        });
        this.clients.driver
            .getDevices()
            .then((devices) => {
            devices.forEach((device) => {
                this.setupDevice(device);
            });
        })
            .catch()
            .finally(() => {
            this.clients.driver.on("device added", (device) => {
                this.clients.clients.forEach((client) => {
                    if (client.schemaVersion <= 12) {
                        this.sendEvent(client, {
                            source: "device",
                            event: DeviceEvent.deviceAdded,
                            device: dumpDevice(device, client.schemaVersion),
                        });
                    }
                    else {
                        this.sendEvent(client, {
                            source: "device",
                            event: DeviceEvent.deviceAdded,
                            device: device.getSerial(),
                        });
                    }
                });
                this.setupDevice(device);
            });
        });
        this.clients.driver.on("station livestream start", (station, device, metadata, videostream, audiostream) => {
            const serialNumber = device.getSerial();
            this.clients.clients
                .filter((cl) => cl.receiveLivestream[serialNumber] === true && cl.isConnected)
                .forEach((client) => {
                if (client.schemaVersion >= 2) {
                    client.sendEvent({
                        source: "device",
                        event: DeviceEvent.livestreamStarted,
                        serialNumber: serialNumber,
                    });
                }
            });
            videostream.on("data", (chunk) => {
                this.clients.clients
                    .filter((cl) => cl.receiveLivestream[serialNumber] === true && cl.isConnected)
                    .forEach((client) => {
                    if (client.schemaVersion >= 2) {
                        client.sendEvent({
                            source: "device",
                            event: DeviceEvent.livestreamVideoData,
                            serialNumber: serialNumber,
                            buffer: chunk,
                            metadata: {
                                videoCodec: VideoCodec[metadata.videoCodec],
                                videoFPS: metadata.videoFPS,
                                videoHeight: metadata.videoHeight,
                                videoWidth: metadata.videoWidth,
                            },
                        });
                    }
                });
            });
            audiostream.on("data", (chunk) => {
                this.clients.clients
                    .filter((cl) => cl.receiveLivestream[serialNumber] === true && cl.isConnected)
                    .forEach((client) => {
                    if (client.schemaVersion >= 2) {
                        client.sendEvent({
                            source: "device",
                            event: DeviceEvent.livestreamAudioData,
                            serialNumber: serialNumber,
                            buffer: chunk,
                            metadata: {
                                audioCodec: AudioCodec[metadata.audioCodec],
                            },
                        });
                    }
                });
            });
        });
        this.clients.driver.on("station livestream stop", (station, device) => {
            const serialNumber = device.getSerial();
            this.clients.clients
                .filter((cl) => cl.receiveLivestream[serialNumber] === true && cl.isConnected)
                .forEach((client) => {
                if (client.schemaVersion >= 2) {
                    client.sendEvent({
                        source: "device",
                        event: DeviceEvent.livestreamStopped,
                        serialNumber: serialNumber,
                    });
                }
                client.receiveLivestream[serialNumber] = false;
                DeviceMessageHandler.removeStreamingDevice(station.getSerial(), client);
            });
        });
        this.clients.driver.on("station download start", (station, device, metadata, videostream, audiostream) => {
            const serialNumber = device.getSerial();
            this.clients.clients
                .filter((cl) => cl.receiveDownloadStream[serialNumber] === true && cl.isConnected)
                .forEach((client) => {
                if (client.schemaVersion >= 3) {
                    client.sendEvent({
                        source: "device",
                        event: DeviceEvent.downloadStarted,
                        serialNumber: serialNumber,
                    });
                }
            });
            videostream.on("data", (chunk) => {
                this.clients.clients
                    .filter((cl) => cl.receiveDownloadStream[serialNumber] === true &&
                    cl.isConnected)
                    .forEach((client) => {
                    if (client.schemaVersion >= 3) {
                        client.sendEvent({
                            source: "device",
                            event: DeviceEvent.downloadVideoData,
                            serialNumber: serialNumber,
                            buffer: chunk,
                            metadata: {
                                videoCodec: VideoCodec[metadata.videoCodec],
                                videoFPS: metadata.videoFPS,
                                videoHeight: metadata.videoHeight,
                                videoWidth: metadata.videoWidth,
                            },
                        });
                    }
                });
            });
            audiostream.on("data", (chunk) => {
                this.clients.clients
                    .filter((cl) => cl.receiveDownloadStream[serialNumber] === true &&
                    cl.isConnected)
                    .forEach((client) => {
                    if (client.schemaVersion >= 3) {
                        client.sendEvent({
                            source: "device",
                            event: DeviceEvent.downloadAudioData,
                            serialNumber: serialNumber,
                            buffer: chunk,
                            metadata: {
                                audioCodec: AudioCodec[metadata.audioCodec],
                            },
                        });
                    }
                });
            });
        });
        this.clients.driver.on("station download finish", (station, device) => {
            const serialNumber = device.getSerial();
            this.clients.clients
                .filter((cl) => cl.receiveDownloadStream[serialNumber] === true && cl.isConnected)
                .forEach((client) => {
                if (client.schemaVersion >= 3) {
                    client.sendEvent({
                        source: "device",
                        event: DeviceEvent.downloadFinished,
                        serialNumber: serialNumber,
                    });
                }
                client.receiveDownloadStream[serialNumber] = false;
                DeviceMessageHandler.removeDownloadingDevice(station.getSerial(), client);
            });
        });
        this.clients.driver.on("station rtsp livestream start", (station, device) => {
            const serialNumber = device.getSerial();
            this.clients.clients
                .filter((cl) => cl.isConnected)
                .forEach((client) => {
                if (client.schemaVersion >= 6) {
                    client.sendEvent({
                        source: "device",
                        event: DeviceEvent.rtspLivestreamStarted,
                        serialNumber: serialNumber,
                    });
                }
            });
        });
        this.clients.driver.on("station rtsp livestream stop", (station, device) => {
            const serialNumber = device.getSerial();
            this.clients.clients
                .filter((cl) => cl.isConnected)
                .forEach((client) => {
                if (client.schemaVersion >= 6) {
                    client.sendEvent({
                        source: "device",
                        event: DeviceEvent.rtspLivestreamStopped,
                        serialNumber: serialNumber,
                    });
                }
            });
        });
        this.clients.driver.on("user added", (device, username, schedule) => {
            this.forwardEvent({
                source: "device",
                event: DeviceEvent.userAdded,
                serialNumber: device.getSerial(),
                username: username,
                schedule: schedule,
            }, 13);
        });
        this.clients.driver.on("user deleted", (device, username) => {
            this.forwardEvent({
                source: "device",
                event: DeviceEvent.userDeleted,
                serialNumber: device.getSerial(),
                username: username,
            }, 13);
        });
        this.clients.driver.on("user error", (device, username, error) => {
            this.forwardEvent({
                source: "device",
                event: DeviceEvent.userError,
                serialNumber: device.getSerial(),
                username: username,
                error: error,
            }, 13);
        });
        this.clients.driver.on("user username updated", (device, username) => {
            this.forwardEvent({
                source: "device",
                event: DeviceEvent.userUsernameUpdated,
                serialNumber: device.getSerial(),
                username: username,
            }, 13);
        });
        this.clients.driver.on("user schedule updated", (device, username, schedule) => {
            this.forwardEvent({
                source: "device",
                event: DeviceEvent.userScheduleUpdated,
                serialNumber: device.getSerial(),
                username: username,
                schedule: schedule,
            }, 13);
        });
        this.clients.driver.on("user passcode updated", (device, username) => {
            this.forwardEvent({
                source: "device",
                event: DeviceEvent.userPasscodeUpdated,
                serialNumber: device.getSerial(),
                username: username,
            }, 13);
        });
        this.clients.driver.on("station talkback start", (station, device, talkbackStream) => {
            const serialNumber = device.getSerial();
            this.clients.clients
                .filter((cl) => cl.sendTalkbackStream[serialNumber] === true && cl.isConnected)
                .forEach((client) => {
                if (client.schemaVersion >= 13) {
                    client.sendEvent({
                        source: "device",
                        event: DeviceEvent.talkbackStarted,
                        serialNumber: serialNumber,
                    });
                }
            });
            DeviceMessageHandler.talkbackStream = talkbackStream;
        });
        this.clients.driver.on("station talkback stop", (station, device) => {
            const serialNumber = device.getSerial();
            this.clients.clients
                .filter((cl) => cl.sendTalkbackStream[serialNumber] === true && cl.isConnected)
                .forEach((client) => {
                if (client.schemaVersion >= 13) {
                    client.sendEvent({
                        source: "device",
                        event: DeviceEvent.talkbackStopped,
                        serialNumber: serialNumber,
                    });
                }
                client.sendTalkbackStream[serialNumber] = false;
                DeviceMessageHandler.removeTalkbackingDevice(station.getSerial(), client);
            });
        });
        this.clients.driver.on("station image download", (station, file, image) => {
            this.forwardEvent({
                source: "station",
                event: StationEvent.imageDownloaded,
                serialNumber: station.getSerial(),
                file: file,
                image: image,
            }, 17);
        });
    }
    forwardEvent(data, minSchemaVersion, maxSchemaVersion = internalSchemaVersion) {
        // Forward event to all connected clients
        this.clients.clients.forEach((client) => {
            if (client.schemaVersion >= minSchemaVersion &&
                client.schemaVersion <= maxSchemaVersion) {
                this.sendEvent(client, data);
            }
        });
    }
    sendEvent(client, data) {
        // Send event to connected client only
        if (client.receiveEvents && client.isConnected) {
            client.sendEvent(data);
        }
    }
    setupStation(station) {
        station.on("connect", () => {
            this.forwardEvent({
                source: "station",
                event: StationEvent.connected,
                serialNumber: station.getSerial(),
            }, 0);
        });
        station.on("close", () => {
            this.forwardEvent({
                source: "station",
                event: StationEvent.disconnected,
                serialNumber: station.getSerial(),
            }, 0);
        });
        station.on("connection error", () => {
            this.forwardEvent({
                source: "station",
                event: StationEvent.connectionError,
                serialNumber: station.getSerial(),
            }, 13);
        });
        station.on("guard mode", (station, guardMode) => {
            // Event for schemaVersion <= 2
            this.forwardEvent({
                source: "station",
                event: StationEvent.guardModeChanged,
                serialNumber: station.getSerial(),
                guardMode: guardMode,
                currentMode: station.getCurrentMode(),
            }, 0, 2);
            // Event for schemaVersion >= 3
            this.forwardEvent({
                source: "station",
                event: StationEvent.guardModeChanged,
                serialNumber: station.getSerial(),
                guardMode: guardMode,
            }, 3);
        });
        station.on("current mode", (station, currentMode) => {
            // Event for schemaVersion <= 2
            this.forwardEvent({
                source: "station",
                event: StationEvent.guardModeChanged,
                serialNumber: station.getSerial(),
                guardMode: station.getGuardMode(),
                currentMode: currentMode,
            }, 0, 2);
            //Event for schemaVersion >= 3
            this.forwardEvent({
                source: "station",
                event: StationEvent.currentModeChanged,
                serialNumber: station.getSerial(),
                currentMode: currentMode,
            }, 3);
        });
        station.on("alarm event", (station, alarmEvent) => {
            this.forwardEvent({
                source: "station",
                event: StationEvent.alarmEvent,
                serialNumber: station.getSerial(),
                alarmEvent: alarmEvent,
            }, 3);
        });
        station.on("rtsp url", (station, channel, value) => {
            this.clients.driver
                .getStationDevice(station.getSerial(), channel)
                .then((device) => {
                this.forwardEvent({
                    source: "device",
                    event: DeviceEvent.gotRtspUrl,
                    serialNumber: device.getSerial(),
                    rtspUrl: value,
                }, 0);
            })
                .catch();
        });
        station.on("command result", (station, result) => {
            if (result.channel === Station.CHANNEL ||
                result.channel === Station.CHANNEL_INDOOR) {
                //Station command result
                let command = undefined;
                switch (result.command_type) {
                    case CommandType.CMD_HUB_REBOOT:
                        command = StationCommand.reboot;
                        break;
                    case CommandType.CMD_SET_ARMING:
                        command = StationCommand.setGuardMode;
                        break;
                    case CommandType.CMD_SET_TONE_FILE:
                        command = StationCommand.triggerAlarm;
                        break;
                }
                if (command !== undefined) {
                    this.forwardEvent({
                        source: "station",
                        event: StationEvent.commandResult,
                        serialNumber: station.getSerial(),
                        command: command.split(".")[1],
                        returnCode: result.return_code,
                        returnCodeName: ErrorCode[result.return_code] !== undefined
                            ? ErrorCode[result.return_code]
                            : "UNKNOWN",
                    }, 0, 12);
                }
                if (result.customData !== undefined) {
                    if (result.customData.property !== undefined) {
                        this.forwardEvent({
                            source: "station",
                            event: StationEvent.commandResult,
                            serialNumber: station.getSerial(),
                            command: "set_property",
                            returnCode: result.return_code,
                            returnCodeName: ErrorCode[result.return_code] !== undefined
                                ? ErrorCode[result.return_code]
                                : "UNKNOWN",
                            customData: result.customData,
                        }, 13);
                    }
                    else if (result.customData.command !== undefined &&
                        result.customData.command.name.startsWith("station")) {
                        const command = result.customData.command.name;
                        this.forwardEvent({
                            source: "station",
                            event: StationEvent.commandResult,
                            serialNumber: station.getSerial(),
                            command: convertCamelCaseToSnakeCase(command.replace("station", "")),
                            returnCode: result.return_code,
                            returnCodeName: ErrorCode[result.return_code] !== undefined
                                ? ErrorCode[result.return_code]
                                : "UNKNOWN",
                            customData: result.customData,
                        }, 13);
                    }
                }
            }
            else {
                // Device command result
                let command = undefined;
                switch (result.command_type) {
                    case CommandType.CMD_DEVS_SWITCH:
                        command = DeviceCommand.enableDevice;
                        break;
                    case CommandType.CMD_DOORLOCK_DATA_PASS_THROUGH:
                        command = DeviceCommand.lockDevice;
                        break;
                    case CommandType.CMD_EAS_SWITCH:
                        command = DeviceCommand.setAntiTheftDetection;
                        break;
                    case CommandType.CMD_IRCUT_SWITCH:
                        command = DeviceCommand.setAutoNightVision;
                        break;
                    case CommandType.CMD_PIR_SWITCH:
                    case CommandType.CMD_INDOOR_DET_SET_MOTION_DETECT_ENABLE:
                    case ParamType.COMMAND_MOTION_DETECTION_PACKAGE:
                        command = DeviceCommand.setMotionDetection;
                        break;
                    case CommandType.CMD_INDOOR_DET_SET_PET_ENABLE:
                        command = DeviceCommand.setPetDetection;
                        break;
                    case CommandType.CMD_NAS_SWITCH:
                        command = DeviceCommand.setRTSPStream;
                        break;
                    case CommandType.CMD_INDOOR_DET_SET_SOUND_DETECT_ENABLE:
                        command = DeviceCommand.setSoundDetection;
                        break;
                    case CommandType.CMD_DEV_LED_SWITCH:
                    case CommandType.CMD_INDOOR_LED_SWITCH:
                    case CommandType.CMD_BAT_DOORBELL_SET_LED_ENABLE:
                    case ParamType.COMMAND_LED_NIGHT_OPEN:
                        command = DeviceCommand.setStatusLed;
                        break;
                    case CommandType.CMD_SET_DEVS_OSD:
                        command = DeviceCommand.setWatermark;
                        break;
                    case CommandType.CMD_INDOOR_ROTATE:
                        command = DeviceCommand.panAndTilt;
                        break;
                    case CommandType.CMD_INDOOR_PAN_CALIBRATION:
                        command = DeviceCommand.calibrate;
                        break;
                    case CommandType.CMD_SET_DEVS_TONE_FILE:
                        command = DeviceCommand.triggerAlarm;
                        break;
                    case CommandType.CMD_DOWNLOAD_VIDEO:
                        command = DeviceCommand.startDownload;
                        break;
                    case CommandType.CMD_DOWNLOAD_CANCEL:
                        command = DeviceCommand.cancelDownload;
                        break;
                    case CommandType.CMD_START_REALTIME_MEDIA:
                    case ParamType.COMMAND_START_LIVESTREAM:
                        command = DeviceCommand.startLivestream;
                        break;
                    case CommandType.CMD_STOP_REALTIME_MEDIA:
                        command = DeviceCommand.stopLivestream;
                        break;
                    case CommandType.CMD_BAT_DOORBELL_QUICK_RESPONSE:
                        //case 1004: //TODO: CMD_STOP_REALTIME_MEDIA has the same number
                        command = DeviceCommand.quickResponse;
                        break;
                }
                if (command !== undefined) {
                    this.clients.driver
                        .getStationDevice(station.getSerial(), result.channel)
                        .then((device) => {
                        this.forwardEvent({
                            source: "device",
                            event: DeviceEvent.commandResult,
                            serialNumber: device.getSerial(),
                            command: command.split(".")[1],
                            returnCode: result.return_code,
                            returnCodeName: ErrorCode[result.return_code] !== undefined
                                ? ErrorCode[result.return_code]
                                : "UNKNOWN",
                        }, 0, 12);
                    })
                        .catch();
                }
                if (result.customData !== undefined) {
                    if (result.customData.property !== undefined) {
                        this.clients.driver
                            .getStationDevice(station.getSerial(), result.channel)
                            .then((device) => {
                            this.forwardEvent({
                                source: "device",
                                event: DeviceEvent.commandResult,
                                serialNumber: device.getSerial(),
                                command: "set_property",
                                returnCode: result.return_code,
                                returnCodeName: ErrorCode[result.return_code] !== undefined
                                    ? ErrorCode[result.return_code]
                                    : "UNKNOWN",
                                customData: result.customData,
                            }, 13);
                        })
                            .catch();
                    }
                    else if (result.customData.command !== undefined &&
                        result.customData.command.name.startsWith("device")) {
                        const command = result.customData.command.name;
                        this.clients.driver
                            .getStationDevice(station.getSerial(), result.channel)
                            .then((device) => {
                            this.forwardEvent({
                                source: "device",
                                event: DeviceEvent.commandResult,
                                serialNumber: device.getSerial(),
                                command: convertCamelCaseToSnakeCase(command.replace("device", "")),
                                returnCode: result.return_code,
                                returnCodeName: ErrorCode[result.return_code] !== undefined
                                    ? ErrorCode[result.return_code]
                                    : "UNKNOWN",
                                customData: result.customData,
                            }, 13);
                        })
                            .catch();
                    }
                }
            }
        });
        station.on("property changed", (station, name, value, ready) => {
            if (ready && !name.startsWith("hidden-")) {
                this.forwardEvent({
                    source: "station",
                    event: StationEvent.propertyChanged,
                    serialNumber: station.getSerial(),
                    name: name,
                    value: value,
                    timestamp: +new Date(),
                }, 0, 9);
                this.forwardEvent({
                    source: "station",
                    event: StationEvent.propertyChanged,
                    serialNumber: station.getSerial(),
                    name: name,
                    value: value,
                }, 10);
            }
        });
        station.on("alarm delay event", (station, alarmDelayEvent, alarmDelay) => {
            this.forwardEvent({
                source: "station",
                event: StationEvent.alarmDelayEvent,
                serialNumber: station.getSerial(),
                alarmDelayEvent: alarmDelayEvent,
                alarmDelay: alarmDelay,
            }, 11);
        });
        station.on("alarm armed event", (station) => {
            this.forwardEvent({
                source: "station",
                event: StationEvent.alarmArmedEvent,
                serialNumber: station.getSerial(),
            }, 11);
        });
        station.on("alarm arm delay event", (station, armDelay) => {
            this.forwardEvent({
                source: "station",
                event: StationEvent.alarmArmDelayEvent,
                serialNumber: station.getSerial(),
                armDelay: armDelay,
            }, 12);
        });
        station.on("device pin verified", (deviceSN, successfull) => {
            this.forwardEvent({
                source: "device",
                event: DeviceEvent.pinVerified,
                serialNumber: deviceSN,
                successfull: successfull,
            }, 13);
        });
        station.on("database query latest", (station, returnCode, data) => {
            this.forwardEvent({
                source: "station",
                event: StationEvent.databaseQueryLatest,
                serialNumber: station.getSerial(),
                returnCode: returnCode,
                data: data,
            }, 18);
        });
        station.on("database query local", (station, returnCode, data) => {
            this.forwardEvent({
                source: "station",
                event: StationEvent.databaseQueryLocal,
                serialNumber: station.getSerial(),
                returnCode: returnCode,
                data: data,
            }, 18);
        });
        station.on("database query by date", (station, returnCode, data) => {
            this.forwardEvent({
                source: "station",
                event: StationEvent.databaseQueryByDate,
                serialNumber: station.getSerial(),
                returnCode: returnCode,
                data: data,
            }, 18);
        });
        station.on("database count by date", (station, returnCode, data) => {
            this.forwardEvent({
                source: "station",
                event: StationEvent.databaseCountByDate,
                serialNumber: station.getSerial(),
                returnCode: returnCode,
                data: data,
            }, 18);
        });
        station.on("database delete", (station, returnCode, failedIds) => {
            this.forwardEvent({
                source: "station",
                event: StationEvent.databaseDelete,
                serialNumber: station.getSerial(),
                returnCode: returnCode,
                failedIds: failedIds,
            }, 18);
        });
    }
    setupDevice(device) {
        device.on("motion detected", (device, state) => {
            this.forwardEvent({
                source: "device",
                event: DeviceEvent.motionDetected,
                serialNumber: device.getSerial(),
                state: state,
            }, 0);
        });
        device.on("person detected", (device, state, person) => {
            this.forwardEvent({
                source: "device",
                event: DeviceEvent.personDetected,
                serialNumber: device.getSerial(),
                state: state,
                person: person,
            }, 0);
        });
        device.on("crying detected", (device, state) => {
            this.forwardEvent({
                source: "device",
                event: DeviceEvent.cryingDetected,
                serialNumber: device.getSerial(),
                state: state,
            }, 0);
        });
        device.on("pet detected", (device, state) => {
            this.forwardEvent({
                source: "device",
                event: DeviceEvent.petDetected,
                serialNumber: device.getSerial(),
                state: state,
            }, 0);
        });
        device.on("vehicle detected", (device, state) => {
            this.forwardEvent({
                source: "device",
                event: DeviceEvent.vehicleDetected,
                serialNumber: device.getSerial(),
                state: state,
            }, 14);
        });
        device.on("sound detected", (device, state) => {
            this.forwardEvent({
                source: "device",
                event: DeviceEvent.soundDetected,
                serialNumber: device.getSerial(),
                state: state,
            }, 0);
        });
        device.on("rings", (device, state) => {
            this.forwardEvent({
                source: "device",
                event: DeviceEvent.rings,
                serialNumber: device.getSerial(),
                state: state,
            }, 0);
        });
        device.on("package delivered", (device, state) => {
            this.forwardEvent({
                source: "device",
                event: DeviceEvent.packageDelivered,
                serialNumber: device.getSerial(),
                state: state,
            }, 13);
        });
        device.on("package stranded", (device, state) => {
            this.forwardEvent({
                source: "device",
                event: DeviceEvent.packageStranded,
                serialNumber: device.getSerial(),
                state: state,
            }, 13);
        });
        device.on("package taken", (device, state) => {
            this.forwardEvent({
                source: "device",
                event: DeviceEvent.packageTaken,
                serialNumber: device.getSerial(),
                state: state,
            }, 13);
        });
        device.on("someone loitering", (device, state) => {
            this.forwardEvent({
                source: "device",
                event: DeviceEvent.someoneLoitering,
                serialNumber: device.getSerial(),
                state: state,
            }, 13);
        });
        device.on("radar motion detected", (device, state) => {
            this.forwardEvent({
                source: "device",
                event: DeviceEvent.radarMotionDetected,
                serialNumber: device.getSerial(),
                state: state,
            }, 13);
        });
        device.on("open", (device, state) => {
            this.forwardEvent({
                source: "device",
                event: DeviceEvent.sensorOpen,
                serialNumber: device.getSerial(),
                state: state,
            }, 0);
        });
        device.on("911 alarm", (device, state, detail) => {
            this.forwardEvent({
                source: "device",
                event: DeviceEvent.alarm911,
                serialNumber: device.getSerial(),
                state: state,
                detail: detail,
            }, 13);
        });
        device.on("shake alarm", (device, state, detail) => {
            this.forwardEvent({
                source: "device",
                event: DeviceEvent.shakeAlarm,
                serialNumber: device.getSerial(),
                state: state,
                detail: detail,
            }, 13);
        });
        device.on("wrong try-protect alarm", (device, state) => {
            this.forwardEvent({
                source: "device",
                event: DeviceEvent.wrongTryProtectAlarm,
                serialNumber: device.getSerial(),
                state: state,
            }, 13);
        });
        device.on("long time not close", (device, state) => {
            this.forwardEvent({
                source: "device",
                event: DeviceEvent.LongTimeNotClose,
                serialNumber: device.getSerial(),
                state: state,
            }, 13);
        });
        device.on("jammed", (device, state) => {
            this.forwardEvent({
                source: "device",
                event: DeviceEvent.jammed,
                serialNumber: device.getSerial(),
                state: state,
            }, 13);
        });
        device.on("low battery", (device, state) => {
            this.forwardEvent({
                source: "device",
                event: DeviceEvent.lowBattery,
                serialNumber: device.getSerial(),
                state: state,
            }, 13);
        });
        device.on("locked", (device, state) => {
            this.forwardEvent({
                source: "device",
                event: DeviceEvent.locked,
                serialNumber: device.getSerial(),
                state: state,
            }, 0);
        });
        device.on("stranger person detected", (device, state) => {
            this.forwardEvent({
                source: "device",
                event: DeviceEvent.strangerPersonDetected,
                serialNumber: device.getSerial(),
                state: state,
            }, 15);
        });
        device.on("dog detected", (device, state) => {
            this.forwardEvent({
                source: "device",
                event: DeviceEvent.dogDetected,
                serialNumber: device.getSerial(),
                state: state,
            }, 15);
        });
        device.on("dog lick detected", (device, state) => {
            this.forwardEvent({
                source: "device",
                event: DeviceEvent.dogLickDetected,
                serialNumber: device.getSerial(),
                state: state,
            }, 15);
        });
        device.on("dog poop detected", (device, state) => {
            this.forwardEvent({
                source: "device",
                event: DeviceEvent.dogPoopDetected,
                serialNumber: device.getSerial(),
                state: state,
            }, 15);
        });
        device.on("property changed", (device, name, value, ready) => {
            if (ready && !name.startsWith("hidden-")) {
                this.forwardEvent({
                    source: "device",
                    event: DeviceEvent.propertyChanged,
                    serialNumber: device.getSerial(),
                    name: name,
                    value: value,
                    timestamp: +new Date(),
                }, 0, 9);
                this.forwardEvent({
                    source: "device",
                    event: DeviceEvent.propertyChanged,
                    serialNumber: device.getSerial(),
                    name: name,
                    value: value,
                }, 10);
            }
        });
        device.on("open", (device, state) => {
            this.forwardEvent({
                source: "device",
                event: DeviceEvent.open,
                serialNumber: device.getSerial(),
                state: state,
            }, 21);
        });
        device.on("tampering", (device, state) => {
            this.forwardEvent({
                source: "device",
                event: DeviceEvent.tampering,
                serialNumber: device.getSerial(),
                state: state,
            }, 21);
        });
        device.on("low temperature", (device, state) => {
            this.forwardEvent({
                source: "device",
                event: DeviceEvent.lowTemperature,
                serialNumber: device.getSerial(),
                state: state,
            }, 21);
        });
        device.on("high temperature", (device, state) => {
            this.forwardEvent({
                source: "device",
                event: DeviceEvent.highTemperature,
                serialNumber: device.getSerial(),
                state: state,
            }, 21);
        });
        device.on("pin incorrect", (device, state) => {
            this.forwardEvent({
                source: "device",
                event: DeviceEvent.pinIncorrect,
                serialNumber: device.getSerial(),
                state: state,
            }, 21);
        });
        device.on("lid stuck", (device, state) => {
            this.forwardEvent({
                source: "device",
                event: DeviceEvent.lidStuck,
                serialNumber: device.getSerial(),
                state: state,
            }, 21);
        });
        device.on("battery fully charged", (device, state) => {
            this.forwardEvent({
                source: "device",
                event: DeviceEvent.batteryFullyCharged,
                serialNumber: device.getSerial(),
                state: state,
            }, 21);
        });
    }
}
//# sourceMappingURL=forward.js.map