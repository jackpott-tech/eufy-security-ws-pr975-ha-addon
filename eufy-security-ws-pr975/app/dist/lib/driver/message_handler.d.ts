import { EufySecurity } from "eufy-security-client";
import { ILogObj, Logger } from "tslog";
import { Client, ClientsController } from "../server.js";
import { DriverCommand } from "./command.js";
import { IncomingMessageDriver } from "./incoming_message.js";
import { DriverResultTypes } from "./outgoing_message.js";
export declare class DriverMessageHandler {
    static captchaId: string | null;
    static captcha: string | null;
    static tfa: boolean;
    static handle(message: IncomingMessageDriver, driver: EufySecurity, client: Client, clientsController: ClientsController, logger: Logger<ILogObj>): Promise<DriverResultTypes[DriverCommand]>;
}
//# sourceMappingURL=message_handler.d.ts.map