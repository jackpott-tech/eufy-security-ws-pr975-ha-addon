import { PropertyName } from "eufy-security-client";
export const dumpStationProperties = (station, schemaVersion) => {
    const base = {
        name: station.getPropertyValue(PropertyName.Name),
        model: station.getPropertyValue(PropertyName.Model),
        serialNumber: station.getPropertyValue(PropertyName.SerialNumber),
        hardwareVersion: station.getPropertyValue(PropertyName.HardwareVersion),
        softwareVersion: station.getPropertyValue(PropertyName.SoftwareVersion),
        type: station.getPropertyValue(PropertyName.Type),
        lanIpAddress: station.getPropertyValue(PropertyName.StationLANIpAddress),
        macAddress: station.getPropertyValue(PropertyName.StationMacAddress),
        guardMode: station.getPropertyValue(PropertyName.StationGuardMode),
        currentMode: station.getPropertyValue(PropertyName.StationCurrentMode),
        timeFormat: station.getPropertyValue(PropertyName.StationTimeFormat),
        alarmVolume: station.getPropertyValue(PropertyName.StationAlarmVolume),
        alarmTone: station.getPropertyValue(PropertyName.StationAlarmTone),
        promptVolume: station.getPropertyValue(PropertyName.StationPromptVolume),
        notificationSwitchModeSchedule: station.getPropertyValue(PropertyName.StationNotificationSwitchModeSchedule),
        notificationSwitchModeGeofence: station.getPropertyValue(PropertyName.StationNotificationSwitchModeGeofence),
        notificationSwitchModeApp: station.getPropertyValue(PropertyName.StationNotificationSwitchModeApp),
        notificationSwitchModeKeypad: station.getPropertyValue(PropertyName.StationNotificationSwitchModeKeypad),
        notificationStartAlarmDelay: station.getPropertyValue(PropertyName.StationNotificationStartAlarmDelay),
        switchModeWithAccessCode: station.getPropertyValue(PropertyName.StationSwitchModeWithAccessCode),
        autoEndAlarm: station.getPropertyValue(PropertyName.StationAutoEndAlarm),
        turnOffAlarmWithButton: station.getPropertyValue(PropertyName.StationTurnOffAlarmWithButton),
        stationHomeSecuritySettings: station.getPropertyValue(PropertyName.StationHomeSecuritySettings),
        stationAwaySecuritySettings: station.getPropertyValue(PropertyName.StationAwaySecuritySettings),
        stationCustom1SecuritySettings: station.getPropertyValue(PropertyName.StationCustom1SecuritySettings),
        stationCustom2SecuritySettings: station.getPropertyValue(PropertyName.StationCustom2SecuritySettings),
        stationCustom3SecuritySettings: station.getPropertyValue(PropertyName.StationCustom3SecuritySettings),
        stationOffSecuritySettings: station.getPropertyValue(PropertyName.StationOffSecuritySettings),
    };
    if (schemaVersion <= 13) {
        return base;
    }
    const stationProperties1 = base;
    stationProperties1.alarm = station.getPropertyValue(PropertyName.StationAlarm);
    stationProperties1.alarmType = station.getPropertyValue(PropertyName.StationAlarmType);
    stationProperties1.alarmArmed = station.getPropertyValue(PropertyName.StationAlarmArmed);
    stationProperties1.alarmArmDelay = station.getPropertyValue(PropertyName.StationAlarmArmDelay);
    stationProperties1.alarmDelay = station.getPropertyValue(PropertyName.StationAlarmDelay);
    stationProperties1.alarmDelayType = station.getPropertyValue(PropertyName.StationAlarmDelayType);
    if (schemaVersion <= 20) {
        return stationProperties1;
    }
    // All schemas >= 21
    const stationProperties2 = base;
    stationProperties2.storageInfoEmmc = station.getPropertyValue(PropertyName.StationStorageInfoEmmc);
    stationProperties2.storageInfoHdd = station.getPropertyValue(PropertyName.StationStorageInfoHdd);
    stationProperties2.crossCameraTracking = station.getPropertyValue(PropertyName.StationCrossCameraTracking);
    stationProperties2.continuousTrackingTime = station.getPropertyValue(PropertyName.StationContinuousTrackingTime);
    stationProperties2.trackingAssistance = station.getPropertyValue(PropertyName.StationTrackingAssistance);
    stationProperties2.crossTrackingCameraList = station.getPropertyValue(PropertyName.StationCrossTrackingCameraList);
    stationProperties2.crossTrackingGroupList = station.getPropertyValue(PropertyName.StationCrossTrackingGroupList);
    return stationProperties2;
};
export const dumpStationPropertiesMetadata = (station, schemaVersion) => {
    const metadata = station.getPropertiesMetadata(true);
    const result = {
        name: metadata[PropertyName.Name],
        model: metadata[PropertyName.Model],
        serialNumber: metadata[PropertyName.SerialNumber],
        hardwareVersion: metadata[PropertyName.HardwareVersion],
        softwareVersion: metadata[PropertyName.SoftwareVersion],
        type: metadata[PropertyName.Type],
        lanIpAddress: metadata[PropertyName.StationLANIpAddress],
        macAddress: metadata[PropertyName.StationMacAddress],
        guardMode: metadata[PropertyName.StationGuardMode],
        currentMode: metadata[PropertyName.StationCurrentMode],
        timeFormat: metadata[PropertyName.StationTimeFormat],
        alarmVolume: metadata[PropertyName.StationAlarmVolume],
        alarmTone: metadata[PropertyName.StationAlarmTone],
        promptVolume: metadata[PropertyName.StationPromptVolume],
        notificationSwitchModeSchedule: metadata[PropertyName.StationNotificationSwitchModeSchedule],
        notificationSwitchModeGeofence: metadata[PropertyName.StationNotificationSwitchModeGeofence],
        notificationSwitchModeApp: metadata[PropertyName.StationNotificationSwitchModeApp],
        notificationSwitchModeKeypad: metadata[PropertyName.StationNotificationSwitchModeKeypad],
        notificationStartAlarmDelay: metadata[PropertyName.StationNotificationStartAlarmDelay],
        switchModeWithAccessCode: metadata[PropertyName.StationSwitchModeWithAccessCode],
        autoEndAlarm: metadata[PropertyName.StationAutoEndAlarm],
        turnOffAlarmWithButton: metadata[PropertyName.StationTurnOffAlarmWithButton],
        homeSecuritySettings: metadata[PropertyName.StationHomeSecuritySettings],
        awaySecuritySettings: metadata[PropertyName.StationAwaySecuritySettings],
        custom1SecuritySettings: metadata[PropertyName.StationCustom1SecuritySettings],
        custom2SecuritySettings: metadata[PropertyName.StationCustom2SecuritySettings],
        custom3SecuritySettings: metadata[PropertyName.StationCustom3SecuritySettings],
        offSecuritySettings: metadata[PropertyName.StationOffSecuritySettings],
    };
    if (schemaVersion <= 13) {
        return result;
    }
    result["alarm"] = metadata[PropertyName.StationAlarm];
    result["alarmType"] = metadata[PropertyName.StationAlarmType];
    result["alarmArmed"] = metadata[PropertyName.StationAlarmArmed];
    result["alarmArmDelay"] = metadata[PropertyName.StationAlarmArmDelay];
    result["alarmDelay"] = metadata[PropertyName.StationAlarmDelay];
    result["alarmDelayType"] = metadata[PropertyName.StationAlarmDelayType];
    if (schemaVersion <= 20) {
        return result;
    }
    // All schemas >= 21
    result["storageInfoEmmc"] = metadata[PropertyName.StationStorageInfoEmmc];
    result["storageInfoHdd"] = metadata[PropertyName.StationStorageInfoHdd];
    result["crossCameraTracking"] =
        metadata[PropertyName.StationCrossCameraTracking];
    result["continuousTrackingTime"] =
        metadata[PropertyName.StationContinuousTrackingTime];
    result["trackingAssistance"] =
        metadata[PropertyName.StationTrackingAssistance];
    result["crossTrackingCameraList"] =
        metadata[PropertyName.StationCrossTrackingCameraList];
    result["crossTrackingGroupList"] =
        metadata[PropertyName.StationCrossTrackingGroupList];
    return result;
};
//# sourceMappingURL=properties.js.map