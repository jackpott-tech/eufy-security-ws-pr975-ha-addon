import { PropertyName } from "eufy-security-client";
export const dumpStation = (station, schemaVersion) => {
    const base = {
        name: station.getPropertyValue(PropertyName.Name),
        model: station.getPropertyValue(PropertyName.Model),
        serialNumber: station.getPropertyValue(PropertyName.SerialNumber),
        hardwareVersion: station.getPropertyValue(PropertyName.HardwareVersion),
        softwareVersion: station.getPropertyValue(PropertyName.SoftwareVersion),
        lanIpAddress: station.getPropertyValue(PropertyName.StationLANIpAddress),
        macAddress: station.getPropertyValue(PropertyName.StationMacAddress),
        currentMode: station.getPropertyValue(PropertyName.StationCurrentMode),
        guardMode: station.getPropertyValue(PropertyName.StationGuardMode),
        connected: station.isConnected(),
    };
    if (schemaVersion == 0) {
        return base;
    }
    const station1 = base;
    station1.type = station.getPropertyValue(PropertyName.Type);
    if (schemaVersion <= 2) {
        return station1;
    }
    const station3 = station1;
    station3.timeFormat = station.getPropertyValue(PropertyName.StationTimeFormat);
    station3.alarmVolume = station.getPropertyValue(PropertyName.StationAlarmVolume);
    station3.alarmTone = station.getPropertyValue(PropertyName.StationAlarmTone);
    station3.promptVolume = station.getPropertyValue(PropertyName.StationPromptVolume);
    station3.notificationSwitchModeSchedule = station.getPropertyValue(PropertyName.StationNotificationSwitchModeSchedule);
    station3.notificationSwitchModeGeofence = station.getPropertyValue(PropertyName.StationNotificationSwitchModeGeofence);
    station3.notificationSwitchModeApp = station.getPropertyValue(PropertyName.StationNotificationSwitchModeApp);
    station3.notificationSwitchModeKeypad = station.getPropertyValue(PropertyName.StationNotificationSwitchModeKeypad);
    station3.notificationStartAlarmDelay = station.getPropertyValue(PropertyName.StationNotificationStartAlarmDelay);
    if (schemaVersion <= 4) {
        return station3;
    }
    // All schemas >= 5
    const station5 = station3;
    station5.switchModeWithAccessCode = station.getPropertyValue(PropertyName.StationSwitchModeWithAccessCode);
    station5.autoEndAlarm = station.getPropertyValue(PropertyName.StationAutoEndAlarm);
    station5.turnOffAlarmWithButton = station.getPropertyValue(PropertyName.StationTurnOffAlarmWithButton);
    return station5;
};
//# sourceMappingURL=state.js.map