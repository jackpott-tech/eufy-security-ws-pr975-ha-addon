import { ILogObj, Logger } from "tslog";
import { LogLevel as EufyLogLevel } from "eufy-security-client";
import { ClientsController } from "./server.js";
export declare enum LogLevel {
    silly = 0,
    trace = 1,
    debug = 2,
    info = 3,
    warn = 4,
    error = 5,
    fatal = 6
}
export type LogLevelName = keyof typeof LogLevel;
export declare const convertLogLevelToDriver: (level: LogLevelName) => EufyLogLevel;
export declare const convertLogLevelToServer: (level: EufyLogLevel) => LogLevel;
export interface LogMessageSchema0 {
    hostname: string;
    date: string;
    logLevel: string;
    logLevelId: number;
    filePath: string;
    fullFilePath: string;
    fileName: string;
    lineNumber: number;
    columnNumber: number;
    isConstructor: boolean;
    functionName: string;
    typeName: string;
    methodName: string;
    argumentsArray: Array<string>;
}
export interface LogMessageArguments {
    [name: string]: unknown;
}
export interface LogMessageSchema1 {
    message: string;
    arguments?: LogMessageArguments;
    meta: {
        runtime: string;
        runtimeVersion: string;
        hostname: string;
        date: string;
        logLevel: string;
        driverVersion: string;
    };
}
export type LogMessage = LogMessageSchema0 | LogMessageSchema1;
export declare class LoggingEventForwarder {
    private logger;
    private clients;
    private driverLogger?;
    constructor(clients: ClientsController, logger: Logger<ILogObj>);
    get started(): boolean;
    start(): void;
    stop(): void;
    restartIfNeeded(): void;
    private logToTransport;
    private getMessage;
}
//# sourceMappingURL=logging.d.ts.map