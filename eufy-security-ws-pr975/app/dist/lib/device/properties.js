import { PropertyName, } from "eufy-security-client";
export const dumpDeviceProperties = (device, schemaVersion) => {
    const base = {
        name: device.getPropertyValue(PropertyName.Name),
        model: device.getPropertyValue(PropertyName.Model),
        serialNumber: device.getPropertyValue(PropertyName.SerialNumber),
        hardwareVersion: device.getPropertyValue(PropertyName.HardwareVersion),
        softwareVersion: device.getPropertyValue(PropertyName.SoftwareVersion),
        type: device.getPropertyValue(PropertyName.Type),
        stationSerialNumber: device.getPropertyValue(PropertyName.DeviceStationSN),
        battery: device.getPropertyValue(PropertyName.DeviceBattery),
        batteryTemperature: device.getPropertyValue(PropertyName.DeviceBatteryTemp),
        batteryLow: device.getPropertyValue(PropertyName.DeviceBatteryLow),
        batteryIsCharging: device.getPropertyValue(PropertyName.DeviceBatteryIsCharging),
        lastChargingDays: device.getPropertyValue(PropertyName.DeviceLastChargingDays),
        lastChargingTotalEvents: device.getPropertyValue(PropertyName.DeviceLastChargingTotalEvents),
        lastChargingRecordedEvents: device.getPropertyValue(PropertyName.DeviceLastChargingRecordedEvents),
        lastChargingFalseEvents: device.getPropertyValue(PropertyName.DeviceLastChargingFalseEvents),
        batteryUsageLastWeek: device.getPropertyValue(PropertyName.DeviceBatteryUsageLastWeek),
        wifiRssi: device.getPropertyValue(PropertyName.DeviceWifiRSSI),
        wifiSignalLevel: device.getPropertyValue(PropertyName.DeviceWifiSignalLevel),
        enabled: device.getPropertyValue(PropertyName.DeviceEnabled),
        antitheftDetection: device.getPropertyValue(PropertyName.DeviceAntitheftDetection),
        autoNightvision: device.getPropertyValue(PropertyName.DeviceAutoNightvision),
        nightvision: device.getPropertyValue(PropertyName.DeviceNightvision),
        statusLed: device.getPropertyValue(PropertyName.DeviceStatusLed),
        motionDetection: device.getPropertyValue(PropertyName.DeviceMotionDetection),
        motionDetectionType: device.getPropertyValue(PropertyName.DeviceMotionDetectionType),
        motionDetectionSensitivity: device.getPropertyValue(PropertyName.DeviceMotionDetectionSensitivity),
        motionDetectionTypeHuman: device.getPropertyValue(PropertyName.DeviceMotionDetectionTypeHuman),
        motionDetectionTypeHumanRecognition: device.getPropertyValue(PropertyName.DeviceMotionDetectionTypeHumanRecognition),
        motionDetectionTypePet: device.getPropertyValue(PropertyName.DeviceMotionDetectionTypePet),
        motionDetectionTypeVehicle: device.getPropertyValue(PropertyName.DeviceMotionDetectionTypeVehicle),
        motionDetectionTypeAllOtherMotions: device.getPropertyValue(PropertyName.DeviceMotionDetectionTypeAllOtherMotions),
        motionZone: device.getPropertyValue(PropertyName.DeviceMotionZone),
        motionDetectionRange: device.getPropertyValue(PropertyName.DeviceMotionDetectionRange),
        motionDetectionRangeStandardSensitivity: device.getPropertyValue(PropertyName.DeviceMotionDetectionRangeStandardSensitivity),
        motionDetectionRangeAdvancedLeftSensitivity: device.getPropertyValue(PropertyName.DeviceMotionDetectionRangeAdvancedLeftSensitivity),
        motionDetectionRangeAdvancedMiddleSensitivity: device.getPropertyValue(PropertyName.DeviceMotionDetectionRangeAdvancedMiddleSensitivity),
        motionDetectionRangeAdvancedRightSensitivity: device.getPropertyValue(PropertyName.DeviceMotionDetectionRangeAdvancedRightSensitivity),
        motionDetectionTestMode: device.getPropertyValue(PropertyName.DeviceMotionDetectionTestMode),
        motionDetected: device.getPropertyValue(PropertyName.DeviceMotionDetected),
        motionTracking: device.getPropertyValue(PropertyName.DeviceMotionTracking),
        motionTrackingSensitivity: device.getPropertyValue(PropertyName.DeviceMotionTrackingSensitivity),
        motionAutoCruise: device.getPropertyValue(PropertyName.DeviceMotionAutoCruise),
        motionOutOfViewDetection: device.getPropertyValue(PropertyName.DeviceMotionOutOfViewDetection),
        personDetected: device.getPropertyValue(PropertyName.DevicePersonDetected),
        personName: device.getPropertyValue(PropertyName.DevicePersonName),
        rtspStream: device.getPropertyValue(PropertyName.DeviceRTSPStream),
        rtspStreamUrl: device.getPropertyValue(PropertyName.DeviceRTSPStreamUrl),
        watermark: device.getPropertyValue(PropertyName.DeviceWatermark),
        pictureUrl: device.hasProperty(PropertyName.DevicePictureUrl)
            ? device.getPropertyValue(PropertyName.DevicePictureUrl)
            : "",
        state: device.getPropertyValue(PropertyName.DeviceState),
        petDetection: device.getPropertyValue(PropertyName.DevicePetDetection),
        petDetected: device.getPropertyValue(PropertyName.DevicePetDetected),
        soundDetection: device.getPropertyValue(PropertyName.DeviceSoundDetection),
        soundDetectionType: device.getPropertyValue(PropertyName.DeviceSoundDetectionType),
        soundDetectionSensitivity: device.getPropertyValue(PropertyName.DeviceSoundDetectionSensitivity),
        soundDetected: device.getPropertyValue(PropertyName.DeviceSoundDetected),
        cryingDetected: device.getPropertyValue(PropertyName.DeviceCryingDetected),
        sensorOpen: device.getPropertyValue(PropertyName.DeviceSensorOpen),
        sensorChangeTime: device.getPropertyValue(PropertyName.DeviceSensorChangeTime),
        motionSensorPirEvent: device.getPropertyValue(PropertyName.DeviceMotionSensorPIREvent),
        locked: device.getPropertyValue(PropertyName.DeviceLocked),
        ringing: device.getPropertyValue(PropertyName.DeviceRinging),
        lockStatus: device.getPropertyValue(PropertyName.DeviceLockStatus),
        light: device.getPropertyValue(PropertyName.DeviceLight),
        microphone: device.getPropertyValue(PropertyName.DeviceMicrophone),
        speaker: device.getPropertyValue(PropertyName.DeviceSpeaker),
        speakerVolume: device.getPropertyValue(PropertyName.DeviceSpeakerVolume),
        ringtoneVolume: device.getPropertyValue(PropertyName.DeviceRingtoneVolume),
        audioRecording: device.getPropertyValue(PropertyName.DeviceAudioRecording),
        powerSource: device.getPropertyValue(PropertyName.DevicePowerSource),
        powerWorkingMode: device.getPropertyValue(PropertyName.DevicePowerWorkingMode),
        chargingStatus: device.getPropertyValue(PropertyName.DeviceChargingStatus),
        recordingEndClipMotionStops: device.getPropertyValue(PropertyName.DeviceRecordingEndClipMotionStops),
        recordingClipLength: device.getPropertyValue(PropertyName.DeviceRecordingClipLength),
        recordingRetriggerInterval: device.getPropertyValue(PropertyName.DeviceRecordingRetriggerInterval),
        videoStreamingQuality: device.getPropertyValue(PropertyName.DeviceVideoStreamingQuality),
        videoRecordingQuality: device.getPropertyValue(PropertyName.DeviceVideoRecordingQuality),
        videoWdr: device.getPropertyValue(PropertyName.DeviceVideoWDR),
        lightSettingsEnable: device.getPropertyValue(PropertyName.DeviceLightSettingsEnable),
        lightSettingsBrightnessManual: device.getPropertyValue(PropertyName.DeviceLightSettingsBrightnessManual),
        lightSettingsColorTemperatureManual: device.getPropertyValue(PropertyName.DeviceLightSettingsColorTemperatureManual),
        lightSettingsBrightnessMotion: device.getPropertyValue(PropertyName.DeviceLightSettingsBrightnessMotion),
        lightSettingsColorTemperatureMotion: device.getPropertyValue(PropertyName.DeviceLightSettingsColorTemperatureMotion),
        lightSettingsBrightnessSchedule: device.getPropertyValue(PropertyName.DeviceLightSettingsBrightnessSchedule),
        lightSettingsColorTemperatureSchedule: device.getPropertyValue(PropertyName.DeviceLightSettingsColorTemperatureSchedule),
        lightSettingsMotionTriggered: device.getPropertyValue(PropertyName.DeviceLightSettingsMotionTriggered),
        lightSettingsMotionActivationMode: device.getPropertyValue(PropertyName.DeviceLightSettingsMotionActivationMode),
        lightSettingsMotionTriggeredDistance: device.getPropertyValue(PropertyName.DeviceLightSettingsMotionTriggeredDistance),
        lightSettingsMotionTriggeredTimer: device.getPropertyValue(PropertyName.DeviceLightSettingsMotionTriggeredTimer),
        chimeIndoor: device.getPropertyValue(PropertyName.DeviceChimeIndoor),
        chimeHomebase: device.getPropertyValue(PropertyName.DeviceChimeHomebase),
        chimeHomebaseRingtoneVolume: device.getPropertyValue(PropertyName.DeviceChimeHomebaseRingtoneVolume),
        chimeHomebaseRingtoneType: device.getPropertyValue(PropertyName.DeviceChimeHomebaseRingtoneType),
        notificationType: device.getPropertyValue(PropertyName.DeviceNotificationType),
        rotationSpeed: device.getPropertyValue(PropertyName.DeviceRotationSpeed),
        imageMirrored: device.getPropertyValue(PropertyName.DeviceImageMirrored),
        notificationPerson: device.getPropertyValue(PropertyName.DeviceNotificationPerson),
        notificationPet: device.getPropertyValue(PropertyName.DeviceNotificationPet),
        notificationAllOtherMotion: device.getPropertyValue(PropertyName.DeviceNotificationAllOtherMotion),
        notificationCrying: device.getPropertyValue(PropertyName.DeviceNotificationCrying),
        notificationAllSound: device.getPropertyValue(PropertyName.DeviceNotificationAllSound),
        notificationIntervalTime: device.getPropertyValue(PropertyName.DeviceNotificationIntervalTime),
        notificationRing: device.getPropertyValue(PropertyName.DeviceNotificationRing),
        notificationMotion: device.getPropertyValue(PropertyName.DeviceNotificationMotion),
        notificationRadarDetector: device.getPropertyValue(PropertyName.DeviceNotificationRadarDetector),
        continuousRecording: device.getPropertyValue(PropertyName.DeviceContinuousRecording),
        continuousRecordingType: device.getPropertyValue(PropertyName.DeviceContinuousRecordingType),
        chirpVolume: device.getPropertyValue(PropertyName.DeviceChirpVolume),
        chirpTone: device.getPropertyValue(PropertyName.DeviceChirpTone),
        videoHdr: device.getPropertyValue(PropertyName.DeviceVideoHDR),
        videoDistortionCorrection: device.getPropertyValue(PropertyName.DeviceVideoDistortionCorrection),
        videoRingRecord: device.getPropertyValue(PropertyName.DeviceVideoRingRecord),
        videoNightvisionImageAdjustment: device.getPropertyValue(PropertyName.DeviceVideoNightvisionImageAdjustment),
        videoColorNightvision: device.getPropertyValue(PropertyName.DeviceVideoColorNightvision),
        autoCalibration: device.getPropertyValue(PropertyName.DeviceAutoCalibration),
        autoLock: device.getPropertyValue(PropertyName.DeviceAutoLock),
        autoLockTimer: device.getPropertyValue(PropertyName.DeviceAutoLockTimer),
        autoLockSchedule: device.getPropertyValue(PropertyName.DeviceAutoLockSchedule),
        autoLockScheduleStartTime: device.getPropertyValue(PropertyName.DeviceAutoLockScheduleStartTime),
        autoLockScheduleEndTime: device.getPropertyValue(PropertyName.DeviceAutoLockScheduleEndTime),
        oneTouchLocking: device.getPropertyValue(PropertyName.DeviceOneTouchLocking),
        wrongTryProtection: device.getPropertyValue(PropertyName.DeviceWrongTryProtection),
        wrongTryAttempts: device.getPropertyValue(PropertyName.DeviceWrongTryAttempts),
        wrongTryLockdownTime: device.getPropertyValue(PropertyName.DeviceWrongTryLockdownTime),
        scramblePasscode: device.getPropertyValue(PropertyName.DeviceScramblePasscode),
        sound: device.getPropertyValue(PropertyName.DeviceSound),
        notification: device.getPropertyValue(PropertyName.DeviceNotification),
        notificationUnlocked: device.getPropertyValue(PropertyName.DeviceNotificationUnlocked),
        notificationLocked: device.getPropertyValue(PropertyName.DeviceNotificationLocked),
        loiteringDetection: device.getPropertyValue(PropertyName.DeviceLoiteringDetection),
        loiteringDetectionRange: device.getPropertyValue(PropertyName.DeviceLoiteringDetectionRange),
        loiteringDetectionLength: device.getPropertyValue(PropertyName.DeviceLoiteringDetectionLength),
        motionDetectionSensitivityMode: device.getPropertyValue(PropertyName.DeviceMotionDetectionSensitivityMode),
        motionDetectionSensitivityStandard: device.getPropertyValue(PropertyName.DeviceMotionDetectionSensitivityStandard),
        motionDetectionSensitivityAdvancedA: device.getPropertyValue(PropertyName.DeviceMotionDetectionSensitivityAdvancedA),
        motionDetectionSensitivityAdvancedB: device.getPropertyValue(PropertyName.DeviceMotionDetectionSensitivityAdvancedB),
        motionDetectionSensitivityAdvancedC: device.getPropertyValue(PropertyName.DeviceMotionDetectionSensitivityAdvancedC),
        motionDetectionSensitivityAdvancedD: device.getPropertyValue(PropertyName.DeviceMotionDetectionSensitivityAdvancedD),
        motionDetectionSensitivityAdvancedE: device.getPropertyValue(PropertyName.DeviceMotionDetectionSensitivityAdvancedE),
        motionDetectionSensitivityAdvancedF: device.getPropertyValue(PropertyName.DeviceMotionDetectionSensitivityAdvancedF),
        motionDetectionSensitivityAdvancedG: device.getPropertyValue(PropertyName.DeviceMotionDetectionSensitivityAdvancedG),
        motionDetectionSensitivityAdvancedH: device.getPropertyValue(PropertyName.DeviceMotionDetectionSensitivityAdvancedH),
        loiteringCustomResponsePhoneNotification: device.getPropertyValue(PropertyName.DeviceLoiteringCustomResponsePhoneNotification),
        loiteringCustomResponseAutoVoiceResponse: device.getPropertyValue(PropertyName.DeviceLoiteringCustomResponseAutoVoiceResponse),
        loiteringCustomResponseAutoVoiceResponseVoice: device.getPropertyValue(PropertyName.DeviceLoiteringCustomResponseAutoVoiceResponseVoice),
        loiteringCustomResponseHomeBaseNotification: device.getPropertyValue(PropertyName.DeviceLoiteringCustomResponseHomeBaseNotification),
        loiteringCustomResponseTimeFrom: device.getPropertyValue(PropertyName.DeviceLoiteringCustomResponseTimeFrom),
        loiteringCustomResponseTimeTo: device.getPropertyValue(PropertyName.DeviceLoiteringCustomResponseTimeTo),
        deliveryGuard: device.getPropertyValue(PropertyName.DeviceDeliveryGuard),
        deliveryGuardPackageGuarding: device.getPropertyValue(PropertyName.DeviceDeliveryGuardPackageGuarding),
        deliveryGuardPackageGuardingVoiceResponseVoice: device.getPropertyValue(PropertyName.DeviceDeliveryGuardPackageGuardingVoiceResponseVoice),
        deliveryGuardPackageGuardingActivatedTimeFrom: device.getPropertyValue(PropertyName.DeviceDeliveryGuardPackageGuardingActivatedTimeFrom),
        deliveryGuardPackageGuardingActivatedTimeTo: device.getPropertyValue(PropertyName.DeviceDeliveryGuardPackageGuardingActivatedTimeTo),
        deliveryGuardUncollectedPackageAlert: device.getPropertyValue(PropertyName.DeviceDeliveryGuardUncollectedPackageAlert),
        deliveryGuardUncollectedPackageAlertTimeToCheck: device.getPropertyValue(PropertyName.DeviceDeliveryGuardUncollectedPackageAlertTimeToCheck),
        deliveryGuardPackageLiveCheckAssistance: device.getPropertyValue(PropertyName.DeviceDeliveryGuardPackageLiveCheckAssistance),
        dualCamWatchViewMode: device.getPropertyValue(PropertyName.DeviceDualCamWatchViewMode),
        ringAutoResponse: device.getPropertyValue(PropertyName.DeviceRingAutoResponse),
        ringAutoResponseVoiceResponse: device.getPropertyValue(PropertyName.DeviceRingAutoResponseVoiceResponse),
        ringAutoResponseVoiceResponseVoice: device.getPropertyValue(PropertyName.DeviceRingAutoResponseVoiceResponseVoice),
        ringAutoResponseTimeFrom: device.getPropertyValue(PropertyName.DeviceRingAutoResponseTimeFrom),
        ringAutoResponseTimeTo: device.getPropertyValue(PropertyName.DeviceRingAutoResponseTimeTo),
        defaultAngle: device.getPropertyValue(PropertyName.DeviceDefaultAngle),
        defaultAngleIdleTime: device.getPropertyValue(PropertyName.DeviceDefaultAngleIdleTime),
        soundDetectionRoundLook: device.getPropertyValue(PropertyName.DeviceSoundDetectionRoundLook),
        packageDelivered: device.getPropertyValue(PropertyName.DevicePackageDelivered),
        packageStranded: device.getPropertyValue(PropertyName.DevicePackageStranded),
        packageTaken: device.getPropertyValue(PropertyName.DevicePackageTaken),
        someoneLoitering: device.getPropertyValue(PropertyName.DeviceSomeoneLoitering),
        radarMotionDetected: device.getPropertyValue(PropertyName.DeviceRadarMotionDetected),
        leftOpenAlarm: device.getPropertyValue(PropertyName.DeviceLeftOpenAlarm),
        leftOpenAlarmDuration: device.getPropertyValue(PropertyName.DeviceLeftOpenAlarmDuration),
        dualUnlock: device.getPropertyValue(PropertyName.DeviceDualUnlock),
        powerSave: device.getPropertyValue(PropertyName.DevicePowerSave),
        interiorBrightness: device.getPropertyValue(PropertyName.DeviceInteriorBrightness),
        interiorBrightnessDuration: device.getPropertyValue(PropertyName.DeviceInteriorBrightnessDuration),
        tamperAlarm: device.getPropertyValue(PropertyName.DeviceTamperAlarm),
        remoteUnlock: device.getPropertyValue(PropertyName.DeviceRemoteUnlock),
        remoteUnlockMasterPIN: device.getPropertyValue(PropertyName.DeviceRemoteUnlockMasterPIN),
        alarmVolume: device.getPropertyValue(PropertyName.DeviceAlarmVolume),
        promptVolume: device.getPropertyValue(PropertyName.DevicePromptVolume),
        notificationUnlockByKey: device.getPropertyValue(PropertyName.DeviceNotificationUnlockByKey),
        notificationUnlockByPIN: device.getPropertyValue(PropertyName.DeviceNotificationUnlockByPIN),
        notificationUnlockByFingerprint: device.getPropertyValue(PropertyName.DeviceNotificationUnlockByFingerprint),
        notificationUnlockByApp: device.getPropertyValue(PropertyName.DeviceNotificationUnlockByApp),
        notificationDualUnlock: device.getPropertyValue(PropertyName.DeviceNotificationDualUnlock),
        notificationDualLock: device.getPropertyValue(PropertyName.DeviceNotificationDualLock),
        notificationWrongTryProtect: device.getPropertyValue(PropertyName.DeviceNotificationWrongTryProtect),
        notificationJammed: device.getPropertyValue(PropertyName.DeviceNotificationJammed),
        jammedAlert: device.getPropertyValue(PropertyName.DeviceJammedAlert),
        "911Alert": device.getPropertyValue(PropertyName.Device911Alert),
        "911AlertEvent": device.getPropertyValue(PropertyName.Device911AlertEvent),
        shakeAlert: device.getPropertyValue(PropertyName.DeviceShakeAlert),
        shakeAlertEvent: device.getPropertyValue(PropertyName.DeviceShakeAlertEvent),
        lowBatteryAlert: device.getPropertyValue(PropertyName.DeviceLowBatteryAlert),
        longTimeNotCloseAlert: device.getPropertyValue(PropertyName.DeviceLongTimeNotCloseAlert),
        wrongTryProtectAlert: device.getPropertyValue(PropertyName.DeviceWrongTryProtectAlert),
        videoTypeStoreToNAS: device.getPropertyValue(PropertyName.DeviceVideoTypeStoreToNAS),
        snooze: device.getPropertyValue(PropertyName.DeviceSnooze),
        snoozeTime: device.getPropertyValue(PropertyName.DeviceSnoozeTime),
        identityPersonDetected: device.getPropertyValue(PropertyName.DeviceIdentityPersonDetected),
        strangerPersonDetected: device.getPropertyValue(PropertyName.DeviceStrangerPersonDetected),
        vehicleDetected: device.getPropertyValue(PropertyName.DeviceVehicleDetected),
        dogDetected: device.getPropertyValue(PropertyName.DeviceDogDetected),
        dogLickDetected: device.getPropertyValue(PropertyName.DeviceDogLickDetected),
        dogPoopDetected: device.getPropertyValue(PropertyName.DeviceDogPoopDetected),
        detectionStatisticsWorkingDays: device.getPropertyValue(PropertyName.DeviceDetectionStatisticsWorkingDays),
        detectionStatisticsDetectedEvents: device.getPropertyValue(PropertyName.DeviceDetectionStatisticsDetectedEvents),
        detectionStatisticsRecordedEvents: device.getPropertyValue(PropertyName.DeviceDetectionStatisticsRecordedEvents),
    };
    if (schemaVersion <= 14) {
        return base;
    }
    const device1 = base;
    device1.snoozeStartTime = device.getPropertyValue(PropertyName.DeviceSnoozeStartTime);
    device1.snoozeHomebase = device.getPropertyValue(PropertyName.DeviceSnoozeHomebase);
    device1.snoozeMotion = device.getPropertyValue(PropertyName.DeviceSnoozeMotion);
    device1.snoozeChime = device.getPropertyValue(PropertyName.DeviceSnoozeChime);
    if (schemaVersion <= 15) {
        return device1;
    }
    const device2 = device1;
    device2.cellularRSSI = device.getPropertyValue(PropertyName.DeviceCellularRSSI);
    device2.cellularSignalLevel = device.getPropertyValue(PropertyName.DeviceCellularSignalLevel);
    device2.cellularSignal = device.getPropertyValue(PropertyName.DeviceCellularSignal);
    device2.cellularBand = device.getPropertyValue(PropertyName.DeviceCellularBand);
    device2.cellularIMEI = device.getPropertyValue(PropertyName.DeviceCellularIMEI);
    device2.cellularICCID = device.getPropertyValue(PropertyName.DeviceCellularICCID);
    if (schemaVersion <= 16) {
        return device2;
    }
    delete device2["pictureUrl"];
    const device3 = device2;
    device3.picture = device.getPropertyValue(PropertyName.DevicePicture);
    if (schemaVersion <= 18) {
        return device3;
    }
    const device4 = device3;
    device4.lightSettingsManualLightingActiveMode = device.getPropertyValue(PropertyName.DeviceLightSettingsManualLightingActiveMode);
    device4.lightSettingsManualDailyLighting = device.getPropertyValue(PropertyName.DeviceLightSettingsManualDailyLighting);
    device4.lightSettingsManualColoredLighting = device.getPropertyValue(PropertyName.DeviceLightSettingsManualColoredLighting);
    device4.lightSettingsManualDynamicLighting = device.getPropertyValue(PropertyName.DeviceLightSettingsManualDynamicLighting);
    device4.lightSettingsMotionLightingActiveMode = device.getPropertyValue(PropertyName.DeviceLightSettingsMotionLightingActiveMode);
    device4.lightSettingsMotionDailyLighting = device.getPropertyValue(PropertyName.DeviceLightSettingsMotionDailyLighting);
    device4.lightSettingsMotionColoredLighting = device.getPropertyValue(PropertyName.DeviceLightSettingsMotionColoredLighting);
    device4.lightSettingsMotionDynamicLighting = device.getPropertyValue(PropertyName.DeviceLightSettingsMotionDynamicLighting);
    device4.lightSettingsScheduleLightingActiveMode = device.getPropertyValue(PropertyName.DeviceLightSettingsScheduleLightingActiveMode);
    device4.lightSettingsScheduleDailyLighting = device.getPropertyValue(PropertyName.DeviceLightSettingsScheduleDailyLighting);
    device4.lightSettingsScheduleColoredLighting = device.getPropertyValue(PropertyName.DeviceLightSettingsScheduleColoredLighting);
    device4.lightSettingsScheduleDynamicLighting = device.getPropertyValue(PropertyName.DeviceLightSettingsScheduleDynamicLighting);
    device4.lightSettingsColoredLightingColors = device.getPropertyValue(PropertyName.DeviceLightSettingsColoredLightingColors);
    device4.lightSettingsDynamicLightingThemes = device.getPropertyValue(PropertyName.DeviceLightSettingsDynamicLightingThemes);
    device4.doorControlWarning = device.getPropertyValue(PropertyName.DeviceDoorControlWarning);
    device4.door1Open = device.getPropertyValue(PropertyName.DeviceDoor1Open);
    device4.door2Open = device.getPropertyValue(PropertyName.DeviceDoor2Open);
    device4.doorSensor1Status = device.getPropertyValue(PropertyName.DeviceDoorSensor1Status);
    device4.doorSensor2Status = device.getPropertyValue(PropertyName.DeviceDoorSensor2Status);
    device4.doorSensor1MacAddress = device.getPropertyValue(PropertyName.DeviceDoorSensor1MacAddress);
    device4.doorSensor2MacAddress = device.getPropertyValue(PropertyName.DeviceDoorSensor2MacAddress);
    device4.doorSensor1Name = device.getPropertyValue(PropertyName.DeviceDoorSensor1Name);
    device4.doorSensor2Name = device.getPropertyValue(PropertyName.DeviceDoorSensor2Name);
    device4.doorSensor1SerialNumber = device.getPropertyValue(PropertyName.DeviceDoorSensor1SerialNumber);
    device4.doorSensor2SerialNumber = device.getPropertyValue(PropertyName.DeviceDoorSensor2SerialNumber);
    device4.doorSensor1Version = device.getPropertyValue(PropertyName.DeviceDoorSensor1Version);
    device4.doorSensor2Version = device.getPropertyValue(PropertyName.DeviceDoorSensor2Version);
    device4.doorSensor1LowBattery = device.getPropertyValue(PropertyName.DeviceDoorSensor1LowBattery);
    device4.doorSensor2LowBattery = device.getPropertyValue(PropertyName.DeviceDoorSensor2LowBattery);
    device4.doorSensor1BatteryLevel = device.getPropertyValue(PropertyName.DeviceDoorSensor1BatteryLevel);
    device4.doorSensor2BatteryLevel = device.getPropertyValue(PropertyName.DeviceDoorSensor2BatteryLevel);
    if (schemaVersion <= 19) {
        return device4;
    }
    // All schemas <= 20
    const device5 = device4;
    device5.locationCoordinates = device.getPropertyValue(PropertyName.DeviceLocationCoordinates);
    device5.locationAddress = device.getPropertyValue(PropertyName.DeviceLocationAddress);
    device5.locationLastUpdate = device.getPropertyValue(PropertyName.DeviceLocationLastUpdate);
    device5.trackerType = device.getPropertyValue(PropertyName.DeviceTrackerType);
    device5.leftBehindAlarm = device.getPropertyValue(PropertyName.DeviceLeftBehindAlarm);
    device5.findPhone = device.getPropertyValue(PropertyName.DeviceFindPhone);
    if (schemaVersion <= 20) {
        return device5;
    }
    // All schemas >= 21
    const device6 = device5;
    device6.notificationVehicle = device.getPropertyValue(PropertyName.DeviceNotificationVehicle);
    device6.flickerAdjustment = device.getPropertyValue(PropertyName.DeviceFlickerAdjustment);
    device6.leavingDetection = device.getPropertyValue(PropertyName.DeviceLeavingDetection);
    device6.leavingReactionNotification = device.getPropertyValue(PropertyName.DeviceLeavingReactionNotification);
    device6.leavingReactionStartTime = device.getPropertyValue(PropertyName.DeviceLeavingReactionStartTime);
    device6.leavingReactionEndTime = device.getPropertyValue(PropertyName.DeviceLeavingReactionEndTime);
    device6.someoneGoing = device.getPropertyValue(PropertyName.DeviceSomeoneGoing);
    device6.lockEventOrigin = device.getPropertyValue(PropertyName.DeviceLockEventOrigin);
    device6.beepVolume = device.getPropertyValue(PropertyName.DeviceBeepVolume);
    device6.nightvisionOptimization = device.getPropertyValue(PropertyName.DeviceNightvisionOptimization);
    device6.nightvisionOptimizationSide = device.getPropertyValue(PropertyName.DeviceNightvisionOptimizationSide);
    device6.deliveries = device.getPropertyValue(PropertyName.DeviceDeliveries);
    device6.openMethod = device.getPropertyValue(PropertyName.DeviceOpenMethod);
    device6.motionActivatedPrompt = device.getPropertyValue(PropertyName.DeviceMotionActivatedPrompt);
    device6.open = device.getPropertyValue(PropertyName.DeviceOpen);
    device6.openedByType = device.getPropertyValue(PropertyName.DeviceOpenedByType);
    device6.openedByName = device.getPropertyValue(PropertyName.DeviceOpenedByName);
    device6.tamperingAlert = device.getPropertyValue(PropertyName.DeviceTamperingAlert);
    device6.lowTemperatureAlert = device.getPropertyValue(PropertyName.DeviceLowTemperatureAlert);
    device6.highTemperatureAlert = device.getPropertyValue(PropertyName.DeviceHighTemperatureAlert);
    device6.lidStuckAlert = device.getPropertyValue(PropertyName.DeviceLidStuckAlert);
    device6.pinIncorrectAlert = device.getPropertyValue(PropertyName.DevicePinIncorrectAlert);
    device6.batteryFullyChargedAlert = device.getPropertyValue(PropertyName.DeviceBatteryFullyChargedAlert);
    device6.isDeliveryDenied = device.getPropertyValue(PropertyName.DeviceIsDeliveryDenied);
    device6.hasMasterPin = device.getPropertyValue(PropertyName.DeviceHasMasterPin);
    return device6;
};
export const dumpDevicePropertiesMetadata = (device, schemaVersion) => {
    const metadata = device.getPropertiesMetadata(true);
    const result = {
        name: metadata[PropertyName.Name],
        model: metadata[PropertyName.Model],
        serialNumber: metadata[PropertyName.SerialNumber],
        hardwareVersion: metadata[PropertyName.HardwareVersion],
        softwareVersion: metadata[PropertyName.SoftwareVersion],
        type: metadata[PropertyName.Type],
        stationSerialNumber: metadata[PropertyName.DeviceStationSN],
        battery: metadata[PropertyName.DeviceBattery],
        batteryTemperature: metadata[PropertyName.DeviceBatteryTemp],
        batteryLow: metadata[PropertyName.DeviceBatteryLow],
        batteryIsCharging: metadata[PropertyName.DeviceBatteryIsCharging],
        lastChargingDays: metadata[PropertyName.DeviceLastChargingDays],
        lastChargingTotalEvents: metadata[PropertyName.DeviceLastChargingTotalEvents],
        lastChargingRecordedEvents: metadata[PropertyName.DeviceLastChargingRecordedEvents],
        lastChargingFalseEvents: metadata[PropertyName.DeviceLastChargingFalseEvents],
        batteryUsageLastWeek: metadata[PropertyName.DeviceBatteryUsageLastWeek],
        wifiRssi: metadata[PropertyName.DeviceWifiRSSI],
        wifiSignalLevel: metadata[PropertyName.DeviceWifiSignalLevel],
        enabled: metadata[PropertyName.DeviceEnabled],
        antitheftDetection: metadata[PropertyName.DeviceAntitheftDetection],
        autoNightvision: metadata[PropertyName.DeviceAutoNightvision],
        nightvision: metadata[PropertyName.DeviceNightvision],
        statusLed: metadata[PropertyName.DeviceStatusLed],
        motionDetection: metadata[PropertyName.DeviceMotionDetection],
        motionDetectionType: metadata[PropertyName.DeviceMotionDetectionType],
        motionDetectionSensitivity: metadata[PropertyName.DeviceMotionDetectionSensitivity],
        motionDetectionTypeHuman: metadata[PropertyName.DeviceMotionDetectionTypeHuman],
        motionDetectionTypeHumanRecognition: metadata[PropertyName.DeviceMotionDetectionTypeHumanRecognition],
        motionDetectionTypePet: metadata[PropertyName.DeviceMotionDetectionTypePet],
        motionDetectionTypeVehicle: metadata[PropertyName.DeviceMotionDetectionTypeVehicle],
        motionDetectionTypeAllOtherMotions: metadata[PropertyName.DeviceMotionDetectionTypeAllOtherMotions],
        motionZone: metadata[PropertyName.DeviceMotionZone],
        motionDetectionRange: metadata[PropertyName.DeviceMotionDetectionRange],
        motionDetectionRangeStandardSensitivity: metadata[PropertyName.DeviceMotionDetectionRangeStandardSensitivity],
        motionDetectionRangeAdvancedLeftSensitivity: metadata[PropertyName.DeviceMotionDetectionRangeAdvancedLeftSensitivity],
        motionDetectionRangeAdvancedMiddleSensitivity: metadata[PropertyName.DeviceMotionDetectionRangeAdvancedMiddleSensitivity],
        motionDetectionRangeAdvancedRightSensitivity: metadata[PropertyName.DeviceMotionDetectionRangeAdvancedRightSensitivity],
        motionDetectionTestMode: metadata[PropertyName.DeviceMotionDetectionTestMode],
        motionDetected: metadata[PropertyName.DeviceMotionDetected],
        motionTracking: metadata[PropertyName.DeviceMotionTracking],
        motionTrackingSensitivity: metadata[PropertyName.DeviceMotionTrackingSensitivity],
        motionAutoCruise: metadata[PropertyName.DeviceMotionAutoCruise],
        motionOutOfViewDetection: metadata[PropertyName.DeviceMotionOutOfViewDetection],
        personDetected: metadata[PropertyName.DevicePersonDetected],
        personName: metadata[PropertyName.DevicePersonName],
        rtspStream: metadata[PropertyName.DeviceRTSPStream],
        rtspStreamUrl: metadata[PropertyName.DeviceRTSPStreamUrl],
        watermark: metadata[PropertyName.DeviceWatermark],
        pictureUrl: metadata[PropertyName.DevicePictureUrl],
        state: metadata[PropertyName.DeviceState],
        petDetection: metadata[PropertyName.DevicePetDetection],
        petDetected: metadata[PropertyName.DevicePetDetected],
        soundDetection: metadata[PropertyName.DeviceSoundDetection],
        soundDetectionType: metadata[PropertyName.DeviceSoundDetectionType],
        soundDetectionSensitivity: metadata[PropertyName.DeviceSoundDetectionSensitivity],
        soundDetected: metadata[PropertyName.DeviceSoundDetected],
        cryingDetected: metadata[PropertyName.DeviceCryingDetected],
        sensorOpen: metadata[PropertyName.DeviceSensorOpen],
        sensorChangeTime: metadata[PropertyName.DeviceSensorChangeTime],
        motionSensorPirEvent: metadata[PropertyName.DeviceMotionSensorPIREvent],
        locked: metadata[PropertyName.DeviceLocked],
        ringing: metadata[PropertyName.DeviceRinging],
        lockStatus: metadata[PropertyName.DeviceLockStatus],
        light: metadata[PropertyName.DeviceLight],
        microphone: metadata[PropertyName.DeviceMicrophone],
        speaker: metadata[PropertyName.DeviceSpeaker],
        speakerVolume: metadata[PropertyName.DeviceSpeakerVolume],
        ringtoneVolume: metadata[PropertyName.DeviceRingtoneVolume],
        audioRecording: metadata[PropertyName.DeviceAudioRecording],
        powerSource: metadata[PropertyName.DevicePowerSource],
        powerWorkingMode: metadata[PropertyName.DevicePowerWorkingMode],
        chargingStatus: metadata[PropertyName.DeviceChargingStatus],
        recordingEndClipMotionStops: metadata[PropertyName.DeviceRecordingEndClipMotionStops],
        recordingClipLength: metadata[PropertyName.DeviceRecordingClipLength],
        recordingRetriggerInterval: metadata[PropertyName.DeviceRecordingRetriggerInterval],
        videoStreamingQuality: metadata[PropertyName.DeviceVideoStreamingQuality],
        videoRecordingQuality: metadata[PropertyName.DeviceVideoRecordingQuality],
        videoWdr: metadata[PropertyName.DeviceVideoWDR],
        lightSettingsEnable: metadata[PropertyName.DeviceLightSettingsEnable],
        lightSettingsBrightnessManual: metadata[PropertyName.DeviceLightSettingsBrightnessManual],
        lightSettingsColorTemperatureManual: metadata[PropertyName.DeviceLightSettingsColorTemperatureManual],
        lightSettingsBrightnessMotion: metadata[PropertyName.DeviceLightSettingsBrightnessMotion],
        lightSettingsColorTemperatureMotion: metadata[PropertyName.DeviceLightSettingsColorTemperatureMotion],
        lightSettingsBrightnessSchedule: metadata[PropertyName.DeviceLightSettingsBrightnessSchedule],
        lightSettingsColorTemperatureSchedule: metadata[PropertyName.DeviceLightSettingsColorTemperatureSchedule],
        lightSettingsMotionTriggered: metadata[PropertyName.DeviceLightSettingsMotionTriggered],
        lightSettingsMotionActivationMode: metadata[PropertyName.DeviceLightSettingsMotionActivationMode],
        lightSettingsMotionTriggeredDistance: metadata[PropertyName.DeviceLightSettingsMotionTriggeredDistance],
        lightSettingsMotionTriggeredTimer: metadata[PropertyName.DeviceLightSettingsMotionTriggeredTimer],
        chimeIndoor: metadata[PropertyName.DeviceChimeIndoor],
        chimeHomebase: metadata[PropertyName.DeviceChimeHomebase],
        chimeHomebaseRingtoneVolume: metadata[PropertyName.DeviceChimeHomebaseRingtoneVolume],
        chimeHomebaseRingtoneType: metadata[PropertyName.DeviceChimeHomebaseRingtoneType],
        notificationType: metadata[PropertyName.DeviceNotificationType],
        rotationSpeed: metadata[PropertyName.DeviceRotationSpeed],
        imageMirrored: metadata[PropertyName.DeviceImageMirrored],
        notificationPerson: metadata[PropertyName.DeviceNotificationPerson],
        notificationPet: metadata[PropertyName.DeviceNotificationPet],
        notificationAllOtherMotion: metadata[PropertyName.DeviceNotificationAllOtherMotion],
        notificationCrying: metadata[PropertyName.DeviceNotificationCrying],
        notificationAllSound: metadata[PropertyName.DeviceNotificationAllSound],
        notificationIntervalTime: metadata[PropertyName.DeviceNotificationIntervalTime],
        notificationRing: metadata[PropertyName.DeviceNotificationRing],
        notificationMotion: metadata[PropertyName.DeviceNotificationMotion],
        notificationRadarDetector: metadata[PropertyName.DeviceNotificationRadarDetector],
        continuousRecording: metadata[PropertyName.DeviceContinuousRecording],
        continuousRecordingType: metadata[PropertyName.DeviceContinuousRecordingType],
        chirpVolume: metadata[PropertyName.DeviceChirpVolume],
        chirpTone: metadata[PropertyName.DeviceChirpTone],
        videoHdr: metadata[PropertyName.DeviceVideoHDR],
        videoDistortionCorrection: metadata[PropertyName.DeviceVideoDistortionCorrection],
        videoRingRecord: metadata[PropertyName.DeviceVideoRingRecord],
        videoNightvisionImageAdjustment: metadata[PropertyName.DeviceVideoNightvisionImageAdjustment],
        videoColorNightvision: metadata[PropertyName.DeviceVideoColorNightvision],
        autoCalibration: metadata[PropertyName.DeviceAutoCalibration],
        autoLock: metadata[PropertyName.DeviceAutoLock],
        autoLockTimer: metadata[PropertyName.DeviceAutoLockTimer],
        autoLockSchedule: metadata[PropertyName.DeviceAutoLockSchedule],
        autoLockScheduleStartTime: metadata[PropertyName.DeviceAutoLockScheduleStartTime],
        autoLockScheduleEndTime: metadata[PropertyName.DeviceAutoLockScheduleEndTime],
        oneTouchLocking: metadata[PropertyName.DeviceOneTouchLocking],
        wrongTryProtection: metadata[PropertyName.DeviceWrongTryProtection],
        wrongTryAttempts: metadata[PropertyName.DeviceWrongTryAttempts],
        wrongTryLockdownTime: metadata[PropertyName.DeviceWrongTryLockdownTime],
        scramblePasscode: metadata[PropertyName.DeviceScramblePasscode],
        sound: metadata[PropertyName.DeviceSound],
        notification: metadata[PropertyName.DeviceNotification],
        notificationUnlocked: metadata[PropertyName.DeviceNotificationUnlocked],
        notificationLocked: metadata[PropertyName.DeviceNotificationLocked],
        loiteringDetection: metadata[PropertyName.DeviceLoiteringDetection],
        loiteringDetectionRange: metadata[PropertyName.DeviceLoiteringDetectionRange],
        loiteringDetectionLength: metadata[PropertyName.DeviceLoiteringDetectionLength],
        motionDetectionSensitivityMode: metadata[PropertyName.DeviceMotionDetectionSensitivityMode],
        motionDetectionSensitivityStandard: metadata[PropertyName.DeviceMotionDetectionSensitivityStandard],
        motionDetectionSensitivityAdvancedA: metadata[PropertyName.DeviceMotionDetectionSensitivityAdvancedA],
        motionDetectionSensitivityAdvancedB: metadata[PropertyName.DeviceMotionDetectionSensitivityAdvancedB],
        motionDetectionSensitivityAdvancedC: metadata[PropertyName.DeviceMotionDetectionSensitivityAdvancedC],
        motionDetectionSensitivityAdvancedD: metadata[PropertyName.DeviceMotionDetectionSensitivityAdvancedD],
        motionDetectionSensitivityAdvancedE: metadata[PropertyName.DeviceMotionDetectionSensitivityAdvancedE],
        motionDetectionSensitivityAdvancedF: metadata[PropertyName.DeviceMotionDetectionSensitivityAdvancedF],
        motionDetectionSensitivityAdvancedG: metadata[PropertyName.DeviceMotionDetectionSensitivityAdvancedG],
        motionDetectionSensitivityAdvancedH: metadata[PropertyName.DeviceMotionDetectionSensitivityAdvancedH],
        loiteringCustomResponsePhoneNotification: metadata[PropertyName.DeviceLoiteringCustomResponsePhoneNotification],
        loiteringCustomResponseAutoVoiceResponse: metadata[PropertyName.DeviceLoiteringCustomResponseAutoVoiceResponse],
        loiteringCustomResponseAutoVoiceResponseVoice: metadata[PropertyName.DeviceLoiteringCustomResponseAutoVoiceResponseVoice],
        loiteringCustomResponseHomeBaseNotification: metadata[PropertyName.DeviceLoiteringCustomResponseHomeBaseNotification],
        loiteringCustomResponseTimeFrom: metadata[PropertyName.DeviceLoiteringCustomResponseTimeFrom],
        loiteringCustomResponseTimeTo: metadata[PropertyName.DeviceLoiteringCustomResponseTimeTo],
        deliveryGuard: metadata[PropertyName.DeviceDeliveryGuard],
        deliveryGuardPackageGuarding: metadata[PropertyName.DeviceDeliveryGuardPackageGuarding],
        deliveryGuardPackageGuardingVoiceResponseVoice: metadata[PropertyName.DeviceDeliveryGuardPackageGuardingVoiceResponseVoice],
        deliveryGuardPackageGuardingActivatedTimeFrom: metadata[PropertyName.DeviceDeliveryGuardPackageGuardingActivatedTimeFrom],
        deliveryGuardPackageGuardingActivatedTimeTo: metadata[PropertyName.DeviceDeliveryGuardPackageGuardingActivatedTimeTo],
        deliveryGuardUncollectedPackageAlert: metadata[PropertyName.DeviceDeliveryGuardUncollectedPackageAlert],
        deliveryGuardUncollectedPackageAlertTimeToCheck: metadata[PropertyName.DeviceDeliveryGuardUncollectedPackageAlertTimeToCheck],
        deliveryGuardPackageLiveCheckAssistance: metadata[PropertyName.DeviceDeliveryGuardPackageLiveCheckAssistance],
        dualCamWatchViewMode: metadata[PropertyName.DeviceDualCamWatchViewMode],
        ringAutoResponse: metadata[PropertyName.DeviceRingAutoResponse],
        ringAutoResponseVoiceResponse: metadata[PropertyName.DeviceRingAutoResponseVoiceResponse],
        ringAutoResponseVoiceResponseVoice: metadata[PropertyName.DeviceRingAutoResponseVoiceResponseVoice],
        ringAutoResponseTimeFrom: metadata[PropertyName.DeviceRingAutoResponseTimeFrom],
        ringAutoResponseTimeTo: metadata[PropertyName.DeviceRingAutoResponseTimeTo],
        defaultAngle: metadata[PropertyName.DeviceDefaultAngle],
        defaultAngleIdleTime: metadata[PropertyName.DeviceDefaultAngleIdleTime],
        soundDetectionRoundLook: metadata[PropertyName.DeviceSoundDetectionRoundLook],
        packageDelivered: metadata[PropertyName.DevicePackageDelivered],
        packageStranded: metadata[PropertyName.DevicePackageStranded],
        packageTaken: metadata[PropertyName.DevicePackageTaken],
        someoneLoitering: metadata[PropertyName.DeviceSomeoneLoitering],
        radarMotionDetected: metadata[PropertyName.DeviceRadarMotionDetected],
        leftOpenAlarm: metadata[PropertyName.DeviceLeftOpenAlarm],
        leftOpenAlarmDuration: metadata[PropertyName.DeviceLeftOpenAlarmDuration],
        dualUnlock: metadata[PropertyName.DeviceDualUnlock],
        powerSave: metadata[PropertyName.DevicePowerSave],
        interiorBrightness: metadata[PropertyName.DeviceInteriorBrightness],
        interiorBrightnessDuration: metadata[PropertyName.DeviceInteriorBrightnessDuration],
        tamperAlarm: metadata[PropertyName.DeviceTamperAlarm],
        remoteUnlock: metadata[PropertyName.DeviceRemoteUnlock],
        remoteUnlockMasterPIN: metadata[PropertyName.DeviceRemoteUnlockMasterPIN],
        alarmVolume: metadata[PropertyName.DeviceAlarmVolume],
        promptVolume: metadata[PropertyName.DevicePromptVolume],
        notificationUnlockByKey: metadata[PropertyName.DeviceNotificationUnlockByKey],
        notificationUnlockByPIN: metadata[PropertyName.DeviceNotificationUnlockByPIN],
        notificationUnlockByFingerprint: metadata[PropertyName.DeviceNotificationUnlockByFingerprint],
        notificationUnlockByApp: metadata[PropertyName.DeviceNotificationUnlockByApp],
        notificationDualUnlock: metadata[PropertyName.DeviceNotificationDualUnlock],
        notificationDualLock: metadata[PropertyName.DeviceNotificationDualLock],
        notificationWrongTryProtect: metadata[PropertyName.DeviceNotificationWrongTryProtect],
        notificationJammed: metadata[PropertyName.DeviceNotificationJammed],
        jammedAlert: metadata[PropertyName.DeviceJammedAlert],
        "911Alert": metadata[PropertyName.Device911Alert],
        "911AlertEvent": metadata[PropertyName.Device911AlertEvent],
        shakeAlert: metadata[PropertyName.DeviceShakeAlert],
        shakeAlertEvent: metadata[PropertyName.DeviceShakeAlertEvent],
        lowBatteryAlert: metadata[PropertyName.DeviceLowBatteryAlert],
        longTimeNotCloseAlert: metadata[PropertyName.DeviceLongTimeNotCloseAlert],
        wrongTryProtectAlert: metadata[PropertyName.DeviceWrongTryProtectAlert],
        videoTypeStoreToNAS: metadata[PropertyName.DeviceVideoTypeStoreToNAS],
        snooze: metadata[PropertyName.DeviceSnooze],
        snoozeTime: metadata[PropertyName.DeviceSnoozeTime],
        identityPersonDetected: metadata[PropertyName.DeviceIdentityPersonDetected],
        strangerPersonDetected: metadata[PropertyName.DeviceStrangerPersonDetected],
        vehicleDetected: metadata[PropertyName.DeviceVehicleDetected],
        dogDetected: metadata[PropertyName.DeviceDogDetected],
        dogLickDetected: metadata[PropertyName.DeviceDogLickDetected],
        dogPoopDetected: metadata[PropertyName.DeviceDogPoopDetected],
        detectionStatisticsWorkingDays: metadata[PropertyName.DeviceDetectionStatisticsWorkingDays],
        detectionStatisticsDetectedEvents: metadata[PropertyName.DeviceDetectionStatisticsDetectedEvents],
        detectionStatisticsRecordedEvents: metadata[PropertyName.DeviceDetectionStatisticsRecordedEvents],
    };
    if (schemaVersion <= 14) {
        return result;
    }
    result["snoozeStartTime"] = metadata[PropertyName.DeviceSnoozeStartTime];
    result["snoozeHomebase"] = metadata[PropertyName.DeviceSnoozeHomebase];
    result["snoozeMotion"] = metadata[PropertyName.DeviceSnoozeMotion];
    result["snoozeChime"] = metadata[PropertyName.DeviceSnoozeChime];
    if (schemaVersion <= 15) {
        return result;
    }
    result["cellularRSSI"] = metadata[PropertyName.DeviceCellularRSSI];
    result["cellularSignalLevel"] =
        metadata[PropertyName.DeviceCellularSignalLevel];
    result["cellularSignal"] = metadata[PropertyName.DeviceCellularSignal];
    result["cellularBand"] = metadata[PropertyName.DeviceCellularBand];
    result["cellularIMEI"] = metadata[PropertyName.DeviceCellularIMEI];
    result["cellularICCID"] = metadata[PropertyName.DeviceCellularICCID];
    if (schemaVersion <= 16) {
        return result;
    }
    delete result["pictureUrl"];
    result["picture"] = metadata[PropertyName.DevicePicture];
    if (schemaVersion <= 18) {
        return result;
    }
    result["lightSettingsManualLightingActiveMode"] =
        metadata[PropertyName.DeviceLightSettingsManualLightingActiveMode];
    result["lightSettingsManualDailyLighting"] =
        metadata[PropertyName.DeviceLightSettingsManualDailyLighting];
    result["lightSettingsManualColoredLighting"] =
        metadata[PropertyName.DeviceLightSettingsManualColoredLighting];
    result["lightSettingsManualDynamicLighting"] =
        metadata[PropertyName.DeviceLightSettingsManualDynamicLighting];
    result["lightSettingsMotionLightingActiveMode"] =
        metadata[PropertyName.DeviceLightSettingsMotionLightingActiveMode];
    result["lightSettingsMotionDailyLighting"] =
        metadata[PropertyName.DeviceLightSettingsMotionDailyLighting];
    result["lightSettingsMotionColoredLighting"] =
        metadata[PropertyName.DeviceLightSettingsMotionColoredLighting];
    result["lightSettingsMotionDynamicLighting"] =
        metadata[PropertyName.DeviceLightSettingsMotionDynamicLighting];
    result["lightSettingsScheduleLightingActiveMode"] =
        metadata[PropertyName.DeviceLightSettingsScheduleLightingActiveMode];
    result["lightSettingsScheduleDailyLighting"] =
        metadata[PropertyName.DeviceLightSettingsScheduleDailyLighting];
    result["lightSettingsScheduleColoredLighting"] =
        metadata[PropertyName.DeviceLightSettingsScheduleColoredLighting];
    result["lightSettingsScheduleDynamicLighting"] =
        metadata[PropertyName.DeviceLightSettingsScheduleDynamicLighting];
    result["lightSettingsColoredLightingColors"] =
        metadata[PropertyName.DeviceLightSettingsColoredLightingColors];
    result["lightSettingsDynamicLightingThemes"] =
        metadata[PropertyName.DeviceLightSettingsDynamicLightingThemes];
    result["doorControlWarning"] =
        metadata[PropertyName.DeviceDoorControlWarning];
    result["door1Open"] = metadata[PropertyName.DeviceDoor1Open];
    result["door2Open"] = metadata[PropertyName.DeviceDoor2Open];
    result["doorSensor1Status"] = metadata[PropertyName.DeviceDoorSensor1Status];
    result["doorSensor2Status"] = metadata[PropertyName.DeviceDoorSensor2Status];
    result["doorSensor1MacAddress"] =
        metadata[PropertyName.DeviceDoorSensor1MacAddress];
    result["doorSensor2MacAddress"] =
        metadata[PropertyName.DeviceDoorSensor2MacAddress];
    result["doorSensor1Name"] = metadata[PropertyName.DeviceDoorSensor1Name];
    result["doorSensor2Name"] = metadata[PropertyName.DeviceDoorSensor2Name];
    result["doorSensor1SerialNumber"] =
        metadata[PropertyName.DeviceDoorSensor1SerialNumber];
    result["doorSensor2SerialNumber"] =
        metadata[PropertyName.DeviceDoorSensor2SerialNumber];
    result["doorSensor1Version"] =
        metadata[PropertyName.DeviceDoorSensor1Version];
    result["doorSensor2Version"] =
        metadata[PropertyName.DeviceDoorSensor2Version];
    result["doorSensor1LowBattery"] =
        metadata[PropertyName.DeviceDoorSensor1LowBattery];
    result["doorSensor2LowBattery"] =
        metadata[PropertyName.DeviceDoorSensor2LowBattery];
    result["doorSensor1BatteryLevel"] =
        metadata[PropertyName.DeviceDoorSensor1BatteryLevel];
    result["doorSensor2BatteryLevel"] =
        metadata[PropertyName.DeviceDoorSensor2BatteryLevel];
    if (schemaVersion <= 19) {
        return result;
    }
    result["locationCoordinates"] =
        metadata[PropertyName.DeviceLocationCoordinates];
    result["locationAddress"] = metadata[PropertyName.DeviceLocationAddress];
    result["locationLastUpdate"] =
        metadata[PropertyName.DeviceLocationLastUpdate];
    result["trackerType"] = metadata[PropertyName.DeviceTrackerType];
    result["leftBehindAlarm"] = metadata[PropertyName.DeviceLeftBehindAlarm];
    result["findPhone"] = metadata[PropertyName.DeviceFindPhone];
    if (schemaVersion <= 20) {
        return result;
    }
    // All schemas >= 21
    result["notificationVehicle"] =
        metadata[PropertyName.DeviceNotificationVehicle];
    result["flickerAdjustment"] = metadata[PropertyName.DeviceFlickerAdjustment];
    result["leavingDetection"] = metadata[PropertyName.DeviceLeavingDetection];
    result["leavingReactionNotification"] =
        metadata[PropertyName.DeviceLeavingReactionNotification];
    result["leavingReactionStartTime"] =
        metadata[PropertyName.DeviceLeavingReactionStartTime];
    result["leavingReactionEndTime"] =
        metadata[PropertyName.DeviceLeavingReactionEndTime];
    result["someoneGoing"] = metadata[PropertyName.DeviceSomeoneGoing];
    result["lockEventOrigin"] = metadata[PropertyName.DeviceLockEventOrigin];
    result["beepVolume"] = metadata[PropertyName.DeviceBeepVolume];
    result["nightvisionOptimization"] =
        metadata[PropertyName.DeviceNightvisionOptimization];
    result["nightvisionOptimizationSide"] =
        metadata[PropertyName.DeviceNightvisionOptimizationSide];
    result["deliveries"] = metadata[PropertyName.DeviceDeliveries];
    result["openMethod"] = metadata[PropertyName.DeviceOpenMethod];
    result["motionActivatedPrompt"] =
        metadata[PropertyName.DeviceMotionActivatedPrompt];
    result["open"] = metadata[PropertyName.DeviceOpen];
    result["openedByType"] = metadata[PropertyName.DeviceOpenedByType];
    result["openedByName"] = metadata[PropertyName.DeviceOpenedByName];
    result["tamperingAlert"] = metadata[PropertyName.DeviceTamperingAlert];
    result["lowTemperatureAlert"] =
        metadata[PropertyName.DeviceLowTemperatureAlert];
    result["highTemperatureAlert"] =
        metadata[PropertyName.DeviceHighTemperatureAlert];
    result["lidStuckAlert"] = metadata[PropertyName.DeviceLidStuckAlert];
    result["pinIncorrectAlert"] = metadata[PropertyName.DevicePinIncorrectAlert];
    result["batteryFullyChargedAlert"] =
        metadata[PropertyName.DeviceBatteryFullyChargedAlert];
    result["isDeliveryDenied"] = metadata[PropertyName.DeviceIsDeliveryDenied];
    result["hasMasterPin"] = metadata[PropertyName.DeviceHasMasterPin];
    return result;
};
//# sourceMappingURL=properties.js.map