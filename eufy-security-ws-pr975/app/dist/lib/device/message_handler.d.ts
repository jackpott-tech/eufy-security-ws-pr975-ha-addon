import { EufySecurity, TalkbackStream } from "eufy-security-client";
import { Client } from "../server.js";
import { DeviceCommand } from "./command.js";
import { IncomingMessageDevice } from "./incoming_message.js";
import { DeviceResultTypes } from "./outgoing_message.js";
export declare class DeviceMessageHandler {
    private static streamingDevices;
    private static downloadingDevices;
    private static talkbackingDevices;
    static talkbackStream?: TalkbackStream;
    static getStreamingDevices(stationSN: string): Array<Client>;
    static removeStreamingDevice(stationSN: string, client: Client): void;
    static addStreamingDevice(stationSN: string, client: Client): void;
    static getDownloadingDevices(stationSN: string): Array<Client>;
    static removeDownloadingDevice(stationSN: string, client: Client): void;
    static addDownloadingDevice(stationSN: string, client: Client): void;
    static getTalkbackingDevices(stationSN: string): Array<Client>;
    static removeTalkbackingDevice(stationSN: string, client: Client): void;
    static addTalkbackingDevice(stationSN: string, client: Client): void;
    static handle(message: IncomingMessageDevice, driver: EufySecurity, client: Client): Promise<DeviceResultTypes[DeviceCommand]>;
}
//# sourceMappingURL=message_handler.d.ts.map