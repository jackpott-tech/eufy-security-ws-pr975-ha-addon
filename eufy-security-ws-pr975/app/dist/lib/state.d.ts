import { EufySecurity } from "eufy-security-client";
import { DeviceState } from "./device/state.js";
import { DriverState } from "./driver/state.js";
import { StationState } from "./station/state.js";
export type Modify<T, R> = Omit<T, keyof R> & R;
export interface EufySecurityStateSchema0 {
    driver: DriverState;
    stations: Array<StationState>;
    devices: Array<DeviceState>;
}
type EufySecurityStateSchema1 = Modify<Omit<EufySecurityStateSchema0, "stations" | "devices">, {
    stations: Array<string>;
    devices: Array<string>;
}>;
export type EufySecurityState = EufySecurityStateSchema0 | EufySecurityStateSchema1;
export declare const dumpState: (driver: EufySecurity, schemaVersion: number) => Promise<EufySecurityState>;
export {};
//# sourceMappingURL=state.d.ts.map