import { WebSocket, RawData } from "ws";
import { ILogObj, Logger } from "tslog";
import { EventEmitter } from "events";
import { IncomingMessage as HttpIncomingMessage } from "http";
import { EufySecurity } from "eufy-security-client";
import type * as OutgoingMessages from "./outgoing_message.js";
export declare class Client {
    private socket;
    private driver;
    private logger;
    private clientsController;
    receiveEvents: boolean;
    receiveLogs: boolean;
    private _outstandingPing;
    schemaVersion: number;
    receiveLivestream: {
        [index: string]: boolean;
    };
    receiveDownloadStream: {
        [index: string]: boolean;
    };
    sendTalkbackStream: {
        [index: string]: boolean;
    };
    private instanceHandlers;
    constructor(socket: WebSocket, driver: EufySecurity, logger: Logger<ILogObj>, clientsController: ClientsController);
    private rawDataToString;
    get isConnected(): boolean;
    receiveMessage(data: RawData): Promise<void>;
    sendVersion(): void;
    sendResultSuccess(messageId: string, result: OutgoingMessages.OutgoingResultMessageSuccess["result"]): void;
    sendResultError(messageId: string, errorCode: string): void;
    sendEvent(event: OutgoingMessages.OutgoingEvent): void;
    sendData(data: OutgoingMessages.OutgoingMessage): void;
    checkAlive(): void;
    disconnect(): void;
}
export declare class ClientsController {
    driver: EufySecurity;
    private logger;
    clients: Array<Client>;
    private pingInterval?;
    private eventForwarder;
    private cleanupScheduled;
    private loggingEventForwarder?;
    private readonly closureReasons;
    constructor(driver: EufySecurity, logger: Logger<ILogObj>);
    addSocket(socket: WebSocket, request: HttpIncomingMessage): void;
    get loggingEventForwarderStarted(): boolean;
    restartLoggingEventForwarderIfNeeded(): void;
    startLoggingEventForwarder(): void;
    stopLoggingEventForwarder(): void;
    private scheduleClientCleanup;
    private cleanupClients;
    disconnect(): void;
}
interface EufySecurityServerOptions {
    host: string;
    port: number;
    logger?: Logger<ILogObj>;
}
export interface IEufySecurityServer {
    start(): void;
    destroy(): void;
    on(event: "listening", listener: () => void): this;
    on(event: "error", listener: (error: Error) => void): this;
}
export declare class EufySecurityServer extends EventEmitter implements IEufySecurityServer {
    private driver;
    private options;
    private server?;
    private wsServer?;
    private sockets?;
    private logger;
    constructor(driver: EufySecurity, options: EufySecurityServerOptions);
    start(): Promise<void>;
    private onError;
    destroy(): Promise<void>;
}
export {};
//# sourceMappingURL=server.d.ts.map