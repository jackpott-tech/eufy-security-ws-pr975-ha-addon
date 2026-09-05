import { DeviceType, Station } from "eufy-security-client";
import { Modify } from "../state.js";
export interface StationStateSchema0 {
    name: string;
    model: string;
    serialNumber: string;
    hardwareVersion: string;
    softwareVersion: string;
    lanIpAddress: string;
    macAddress: string;
    currentMode: number;
    guardMode: number;
    connected: boolean;
}
type StationStateSchema1 = Modify<StationStateSchema0, {
    type: DeviceType;
}>;
type StationStateSchema3 = Modify<StationStateSchema1, {
    timeFormat?: number;
    alarmVolume?: number;
    alarmTone?: number;
    promptVolume?: number;
    notificationSwitchModeSchedule?: boolean;
    notificationSwitchModeGeofence?: boolean;
    notificationSwitchModeApp?: boolean;
    notificationSwitchModeKeypad?: boolean;
    notificationStartAlarmDelay?: boolean;
}>;
type StationStateSchema5 = Modify<StationStateSchema3, {
    switchModeWithAccessCode?: boolean;
    autoEndAlarm?: boolean;
    turnOffAlarmWithButton?: boolean;
}>;
export type StationState = StationStateSchema0 | StationStateSchema1 | StationStateSchema3 | StationStateSchema5;
export declare const dumpStation: (station: Station, schemaVersion: number) => StationState;
export {};
//# sourceMappingURL=state.d.ts.map