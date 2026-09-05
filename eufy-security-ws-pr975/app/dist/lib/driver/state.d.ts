import { EufySecurity } from "eufy-security-client";
import { Modify } from "../state.js";
export interface DriverStateSchema0 {
    version: string;
    connected: boolean;
    pushConnected: boolean;
}
type DriverStateSchema1 = Modify<DriverStateSchema0, {
    mqttConnected: boolean;
}>;
export type DriverState = DriverStateSchema0 | DriverStateSchema1;
export declare const dumpDriver: (driver: EufySecurity, schemaVersion: number) => DriverState;
export {};
//# sourceMappingURL=state.d.ts.map