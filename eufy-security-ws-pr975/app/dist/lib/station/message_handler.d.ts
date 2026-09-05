import { EufySecurity } from "eufy-security-client";
import { Client } from "../server.js";
import { StationCommand } from "./command.js";
import { IncomingMessageStation } from "./incoming_message.js";
import { StationResultTypes } from "./outgoing_message.js";
export declare class StationMessageHandler {
    static handle(message: IncomingMessageStation, driver: EufySecurity, client: Client): Promise<StationResultTypes[StationCommand]>;
}
//# sourceMappingURL=message_handler.d.ts.map