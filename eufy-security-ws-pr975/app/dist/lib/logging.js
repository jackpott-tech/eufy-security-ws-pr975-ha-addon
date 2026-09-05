import { LogLevel as EufyLogLevel } from "eufy-security-client";
import { DriverEvent } from "./driver/event.js";
export var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["silly"] = 0] = "silly";
    LogLevel[LogLevel["trace"] = 1] = "trace";
    LogLevel[LogLevel["debug"] = 2] = "debug";
    LogLevel[LogLevel["info"] = 3] = "info";
    LogLevel[LogLevel["warn"] = 4] = "warn";
    LogLevel[LogLevel["error"] = 5] = "error";
    LogLevel[LogLevel["fatal"] = 6] = "fatal";
})(LogLevel || (LogLevel = {}));
export const convertLogLevelToDriver = function (level) {
    switch (LogLevel[level]) {
        case LogLevel.silly:
        case LogLevel.trace:
            return EufyLogLevel.Trace;
        case LogLevel.debug:
            return EufyLogLevel.Debug;
        case LogLevel.info:
            return EufyLogLevel.Info;
        case LogLevel.warn:
            return EufyLogLevel.Warn;
        case LogLevel.error:
            return EufyLogLevel.Error;
        case LogLevel.fatal:
            return EufyLogLevel.Fatal;
    }
};
export const convertLogLevelToServer = function (level) {
    switch (level) {
        case EufyLogLevel.Trace:
            return LogLevel.silly;
        case EufyLogLevel.Debug:
            return LogLevel.debug;
        case EufyLogLevel.Info:
            return LogLevel.info;
        case EufyLogLevel.Warn:
            return LogLevel.warn;
        case EufyLogLevel.Error:
            return LogLevel.error;
        case EufyLogLevel.Fatal:
            return LogLevel.fatal;
        default:
            return LogLevel.fatal;
    }
};
export class LoggingEventForwarder {
    logger;
    clients;
    driverLogger;
    constructor(clients, logger) {
        this.logger = logger;
        this.clients = clients;
    }
    get started() {
        if (this.driverLogger)
            return this.driverLogger.settings.attachedTransports.length !== 0;
        return false;
    }
    start() {
        this.logger.info("Starting logging event forwarder");
        this.driverLogger = this.logger.getSubLogger({
            name: "eufy-security-client",
            minLevel: convertLogLevelToServer(this.clients.driver.getLoggingLevel("all")),
        });
        this.driverLogger.attachTransport((logObj) => {
            this.logToTransport(this.clients.clients, logObj);
        });
        this.clients.driver.setInternalLogger(this.driverLogger);
    }
    stop() {
        this.logger.info("Stopping logging event forwarder");
        if (this.driverLogger)
            this.driverLogger.settings.attachedTransports = [];
    }
    restartIfNeeded() {
        const level = convertLogLevelToServer(this.clients.driver.getLoggingLevel("all"));
        if (this.started &&
            this.driverLogger &&
            this.driverLogger.settings.minLevel != level) {
            this.stop();
            this.start();
        }
    }
    logToTransport(clients, logObject) {
        // Forwarding logs to clients that are currently
        // receiving logs
        clients
            .filter((cl) => cl.receiveLogs && cl.isConnected)
            .forEach((client) => client.sendEvent({
            source: "driver",
            event: DriverEvent.logging,
            message: this.getMessage(logObject, client.schemaVersion),
        }));
    }
    getMessage(logObject, schemaVersion) {
        const meta = logObject["_meta"];
        if (schemaVersion <= 20) {
            const matches = logObject["0"]?.match(/\[([0-9a-zA-Z]+)\] \[([0-9a-zA-Z.]+)\]/);
            let functionName = "";
            let typeName = "";
            if (matches !== null && matches !== undefined && matches.length >= 3) {
                const helper = matches[2]?.split(".");
                if (helper[0] !== undefined)
                    typeName = helper[0];
                if (helper[1] !== undefined)
                    functionName = helper[1];
            }
            return {
                hostname: meta["hostname"],
                date: meta["date"],
                logLevel: meta["logLevelName"]?.toLocaleLowerCase(),
                logLevelId: meta["logLevelId"],
                filePath: "",
                fullFilePath: "",
                fileName: "",
                lineNumber: -1,
                columnNumber: -1,
                isConstructor: false,
                functionName: functionName,
                typeName: typeName,
                methodName: functionName,
                argumentsArray: [logObject["0"]],
            };
        }
        return {
            message: logObject["0"],
            arguments: logObject["1"],
            meta: {
                hostname: meta["hostname"],
                date: meta["date"],
                logLevel: meta["logLevelName"],
                runtime: meta["runtime"],
                runtimeVersion: meta["runtimeVersion"],
                driverVersion: this.clients.driver.getVersion(),
            },
        };
    }
}
//# sourceMappingURL=logging.js.map