import { OutgoingBaseEvent } from "./outgoing_message.js";
export declare enum ServerEvent {
    shutdown = "shutdown"
}
export interface OutgoingEventServerBase extends OutgoingBaseEvent {
    source: "server";
    event: ServerEvent;
}
export type OutgoingEventServer = OutgoingEventServerBase;
//# sourceMappingURL=event.d.ts.map