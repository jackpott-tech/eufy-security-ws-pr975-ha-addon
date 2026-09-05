import { Station, IndexedProperty } from "eufy-security-client";
import { Modify } from "../state.js";
export interface StationPropertiesSchema0 {
    name: string;
    model: string;
    serialNumber: string;
    hardwareVersion: string;
    softwareVersion: string;
    type: number;
    lanIpAddress: string;
    macAddress: string;
    guardMode: number;
    currentMode: number;
    timeFormat: number;
    alarmVolume: number;
    alarmTone: number;
    promptVolume: number;
    notificationSwitchModeSchedule: boolean;
    notificationSwitchModeGeofence: boolean;
    notificationSwitchModeApp: boolean;
    notificationSwitchModeKeypad: boolean;
    notificationStartAlarmDelay: boolean;
    switchModeWithAccessCode: boolean;
    autoEndAlarm: boolean;
    turnOffAlarmWithButton: boolean;
    stationHomeSecuritySettings: string;
    stationAwaySecuritySettings: string;
    stationCustom1SecuritySettings: string;
    stationCustom2SecuritySettings: string;
    stationCustom3SecuritySettings: string;
    stationOffSecuritySettings: string;
}
type StationPropertiesSchema1 = Modify<StationPropertiesSchema0, {
    alarm?: boolean;
    alarmType?: number;
    alarmArmed?: boolean;
    alarmArmDelay?: number;
    alarmDelay?: number;
    alarmDelayType?: number;
}>;
type StationPropertiesSchema2 = Modify<StationPropertiesSchema1, {
    storageInfoEmmc: object;
    storageInfoHdd: object;
    crossCameraTracking: boolean;
    continuousTrackingTime: number;
    trackingAssistance: boolean;
    crossTrackingCameraList: object;
    crossTrackingGroupList: object;
}>;
export type StationProperties = StationPropertiesSchema0 | StationPropertiesSchema1 | StationPropertiesSchema2;
export declare const dumpStationProperties: (station: Station, schemaVersion: number) => StationProperties;
export declare const dumpStationPropertiesMetadata: (station: Station, schemaVersion: number) => IndexedProperty;
export {};
//# sourceMappingURL=properties.d.ts.map