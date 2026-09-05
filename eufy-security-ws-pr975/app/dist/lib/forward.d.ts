import { ILogObj, Logger } from "tslog";
import { ClientsController } from "./server.js";
export declare class EventForwarder {
    private clients;
    private logger;
    constructor(clients: ClientsController, logger: Logger<ILogObj>);
    start(): void;
    private forwardEvent;
    private sendEvent;
    private setupStation;
    private setupDevice;
}
//# sourceMappingURL=forward.d.ts.map