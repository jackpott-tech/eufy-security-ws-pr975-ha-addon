import { PropertyName } from "eufy-security-client";
export const dumpDevice = (device, schemaVersion) => {
    const base = {
        name: device.getPropertyValue(PropertyName.Name),
        model: device.getPropertyValue(PropertyName.Model),
        serialNumber: device.getPropertyValue(PropertyName.SerialNumber),
        hardwareVersion: device.getPropertyValue(PropertyName.HardwareVersion),
        softwareVersion: device.getPropertyValue(PropertyName.SoftwareVersion),
        stationSerialNumber: device.getPropertyValue(PropertyName.DeviceStationSN),
        enabled: device.getPropertyValue(PropertyName.DeviceEnabled),
        state: device.getPropertyValue(PropertyName.DeviceState),
        battery: device.getPropertyValue(PropertyName.DeviceBattery),
        batteryTemperature: device.getPropertyValue(PropertyName.DeviceBatteryTemp),
        batteryLow: device.getPropertyValue(PropertyName.DeviceBatteryLow),
        lastChargingDays: device.getPropertyValue(PropertyName.DeviceLastChargingDays),
        lastChargingTotalEvents: device.getPropertyValue(PropertyName.DeviceLastChargingTotalEvents),
        lastChargingRecordedEvents: device.getPropertyValue(PropertyName.DeviceLastChargingRecordedEvents),
        lastChargingFalseEvents: device.getPropertyValue(PropertyName.DeviceLastChargingFalseEvents),
        batteryUsageLastWeek: device.getPropertyValue(PropertyName.DeviceBatteryUsageLastWeek),
        motionDetected: device.getPropertyValue(PropertyName.DeviceMotionDetected),
        personDetected: device.getPropertyValue(PropertyName.DevicePersonDetected),
        personName: device.getPropertyValue(PropertyName.DevicePersonName),
        soundDetected: device.getPropertyValue(PropertyName.DeviceSoundDetected),
        petDetected: device.getPropertyValue(PropertyName.DevicePetDetected),
        cryingDetected: device.getPropertyValue(PropertyName.DeviceCryingDetected),
        ringing: device.getPropertyValue(PropertyName.DeviceRinging),
        locked: device.getPropertyValue(PropertyName.DeviceLocked),
        antitheftDetection: device.getPropertyValue(PropertyName.DeviceAntitheftDetection),
        autoNightvision: device.getPropertyValue(PropertyName.DeviceAutoNightvision),
        motionDetection: device.getPropertyValue(PropertyName.DeviceMotionDetection),
        soundDetection: device.getPropertyValue(PropertyName.DeviceSoundDetection),
        petDetection: device.getPropertyValue(PropertyName.DevicePetDetection),
        rtspStream: device.getPropertyValue(PropertyName.DeviceRTSPStream),
        watermark: device.getPropertyValue(PropertyName.DeviceWatermark),
        lockStatus: device.getPropertyValue(PropertyName.DeviceLockStatus),
        motionSensorPIREvent: device.getPropertyValue(PropertyName.DeviceMotionSensorPIREvent),
        wifiRSSI: device.getPropertyValue(PropertyName.DeviceWifiRSSI),
        pictureUrl: device.getPropertyValue(PropertyName.DevicePictureUrl),
        sensorOpen: device.getPropertyValue(PropertyName.DeviceSensorOpen),
        sensorChangeTime: device.getPropertyValue(PropertyName.DeviceSensorChangeTime),
    };
    if (schemaVersion == 0) {
        base.ledStatus = device.getPropertyValue(PropertyName.DeviceStatusLed);
        return base;
    }
    const device1 = base;
    device1.type = device.getPropertyValue(PropertyName.Type);
    if (schemaVersion <= 2) {
        return device1;
    }
    const device3 = device1;
    device3.motionDetectionType = device.getPropertyValue(PropertyName.DeviceMotionDetectionType);
    device3.motionTracking = device.getPropertyValue(PropertyName.DeviceMotionTracking);
    device3.soundDetectionType = device.getPropertyValue(PropertyName.DeviceSoundDetectionType);
    device3.light = device.getPropertyValue(PropertyName.DeviceLight);
    device3.microphone = device.getPropertyValue(PropertyName.DeviceMicrophone);
    device3.speaker = device.getPropertyValue(PropertyName.DeviceSpeaker);
    device3.speakerVolume = device.getPropertyValue(PropertyName.DeviceSpeakerVolume);
    device3.ringtoneVolume = device.getPropertyValue(PropertyName.DeviceRingtoneVolume);
    device3.audioRecording = device.getPropertyValue(PropertyName.DeviceAudioRecording);
    device3.powerSource = device.getPropertyValue(PropertyName.DevicePowerSource);
    device3.powerWorkingMode = device.getPropertyValue(PropertyName.DevicePowerWorkingMode);
    device3.recordingEndClipMotionStops = device.getPropertyValue(PropertyName.DeviceRecordingEndClipMotionStops);
    device3.recordingClipLength = device.getPropertyValue(PropertyName.DeviceRecordingClipLength);
    device3.recordingRetriggerInterval = device.getPropertyValue(PropertyName.DeviceRecordingRetriggerInterval);
    device3.videoStreamingQuality = device.getPropertyValue(PropertyName.DeviceVideoStreamingQuality);
    device3.videoRecordingQuality = device.getPropertyValue(PropertyName.DeviceVideoRecordingQuality);
    device3.videoWDR = device.getPropertyValue(PropertyName.DeviceVideoWDR);
    device3.lightSettingsEnable = device.getPropertyValue(PropertyName.DeviceLightSettingsEnable);
    device3.lightSettingsBrightnessManual = device.getPropertyValue(PropertyName.DeviceLightSettingsBrightnessManual);
    device3.lightSettingsBrightnessMotion = device.getPropertyValue(PropertyName.DeviceLightSettingsBrightnessMotion);
    device3.lightSettingsBrightnessSchedule = device.getPropertyValue(PropertyName.DeviceLightSettingsBrightnessSchedule);
    device3.lightSettingsMotionTriggered = device.getPropertyValue(PropertyName.DeviceLightSettingsMotionTriggered);
    device3.lightSettingsMotionTriggeredDistance = device.getPropertyValue(PropertyName.DeviceLightSettingsMotionTriggeredDistance);
    device3.lightSettingsMotionTriggeredTimer = device.getPropertyValue(PropertyName.DeviceLightSettingsMotionTriggeredTimer);
    device3.chimeIndoor = device.getPropertyValue(PropertyName.DeviceChimeIndoor);
    device3.chimeHomebase = device.getPropertyValue(PropertyName.DeviceChimeHomebase);
    device3.chimeHomebaseRingtoneVolume = device.getPropertyValue(PropertyName.DeviceChimeHomebaseRingtoneVolume);
    device3.chimeHomebaseRingtoneType = device.getPropertyValue(PropertyName.DeviceChimeHomebaseRingtoneType);
    device3.notificationType = device.getPropertyValue(PropertyName.DeviceNotificationType);
    device3.rotationSpeed = device.getPropertyValue(PropertyName.DeviceRotationSpeed);
    device3.notificationPerson = device.getPropertyValue(PropertyName.DeviceNotificationPerson);
    device3.notificationPet = device.getPropertyValue(PropertyName.DeviceNotificationPet);
    device3.notificationAllOtherMotion = device.getPropertyValue(PropertyName.DeviceNotificationAllOtherMotion);
    device3.notificationCrying = device.getPropertyValue(PropertyName.DeviceNotificationCrying);
    device3.notificationAllSound = device.getPropertyValue(PropertyName.DeviceNotificationAllSound);
    device3.notificationIntervalTime = device.getPropertyValue(PropertyName.DeviceNotificationIntervalTime);
    device3.notificationRing = device.getPropertyValue(PropertyName.DeviceNotificationRing);
    device3.notificationMotion = device.getPropertyValue(PropertyName.DeviceNotificationMotion);
    if (schemaVersion === 3) {
        device3.motionDetectionSensivity = device.getPropertyValue(PropertyName.DeviceMotionDetectionSensitivity);
        device3.soundDetectionSensivity = device.getPropertyValue(PropertyName.DeviceSoundDetectionSensitivity);
        return device3;
    }
    const device4 = device3;
    device4.chirpVolume = device.getPropertyValue(PropertyName.DeviceChirpVolume);
    device4.chirpTone = device.getPropertyValue(PropertyName.DeviceChirpTone);
    device4.motionDetectionSensitivity = device.getPropertyValue(PropertyName.DeviceMotionDetectionSensitivity);
    device4.soundDetectionSensitivity = device.getPropertyValue(PropertyName.DeviceSoundDetectionSensitivity);
    device4.videoHdr = device.getPropertyValue(PropertyName.DeviceVideoHDR);
    device4.videoDistortionCorrection = device.getPropertyValue(PropertyName.DeviceVideoDistortionCorrection);
    device4.videoRingRecord = device.getPropertyValue(PropertyName.DeviceVideoRingRecord);
    device4.statusLed = device.getPropertyValue(PropertyName.DeviceStatusLed);
    device4.rtspStreamUrl = device.getPropertyValue(PropertyName.DeviceRTSPStreamUrl);
    device4.chargingStatus = device.getPropertyValue(PropertyName.DeviceChargingStatus);
    device4.wifiSignalLevel = device.getPropertyValue(PropertyName.DeviceWifiSignalLevel);
    if (schemaVersion <= 4) {
        return device4;
    }
    const device5 = device4;
    device5.nightvision = device.getPropertyValue(PropertyName.DeviceNightvision);
    device5.batteryIsCharging = device.getPropertyValue(PropertyName.DeviceBatteryIsCharging);
    if (schemaVersion <= 5) {
        return device5;
    }
    const device6 = device5;
    device6.motionDetectionRange = device.getPropertyValue(PropertyName.DeviceMotionDetectionRange);
    device6.motionDetectionRangeStandardSensitivity = device.getPropertyValue(PropertyName.DeviceMotionDetectionRangeStandardSensitivity);
    device6.motionDetectionRangeAdvancedLeftSensitivity = device.getPropertyValue(PropertyName.DeviceMotionDetectionRangeAdvancedLeftSensitivity);
    device6.motionDetectionRangeAdvancedMiddleSensitivity =
        device.getPropertyValue(PropertyName.DeviceMotionDetectionRangeAdvancedMiddleSensitivity);
    device6.motionDetectionRangeAdvancedRightSensitivity =
        device.getPropertyValue(PropertyName.DeviceMotionDetectionRangeAdvancedRightSensitivity);
    device6.motionDetectionTestMode = device.getPropertyValue(PropertyName.DeviceMotionDetectionTestMode);
    device6.motionTrackingSensitivity = device.getPropertyValue(PropertyName.DeviceMotionTrackingSensitivity);
    device6.motionAutoCruise = device.getPropertyValue(PropertyName.DeviceMotionAutoCruise);
    device6.motionOutOfViewDetection = device.getPropertyValue(PropertyName.DeviceMotionOutOfViewDetection);
    device6.lightSettingsColorTemperatureManual = device.getPropertyValue(PropertyName.DeviceLightSettingsColorTemperatureManual);
    device6.lightSettingsColorTemperatureMotion = device.getPropertyValue(PropertyName.DeviceLightSettingsColorTemperatureMotion);
    device6.lightSettingsColorTemperatureSchedule = device.getPropertyValue(PropertyName.DeviceLightSettingsColorTemperatureSchedule);
    device6.lightSettingsMotionActivationMode = device.getPropertyValue(PropertyName.DeviceLightSettingsMotionActivationMode);
    device6.videoNightvisionImageAdjustment = device.getPropertyValue(PropertyName.DeviceVideoNightvisionImageAdjustment);
    device6.videoColorNightvision = device.getPropertyValue(PropertyName.DeviceVideoColorNightvision);
    device6.autoCalibration = device.getPropertyValue(PropertyName.DeviceAutoCalibration);
    if (schemaVersion <= 8) {
        return device6;
    }
    const device7 = device6;
    device7.lockSettingsAutoLock = device.getPropertyValue(PropertyName.DeviceAutoLock);
    device7.lockSettingsAutoLockTimer = device.getPropertyValue(PropertyName.DeviceAutoLockTimer);
    device7.lockSettingsAutoLockSchedule = device.getPropertyValue(PropertyName.DeviceAutoLockSchedule);
    device7.lockSettingsAutoLockScheduleStartTime = device.getPropertyValue(PropertyName.DeviceAutoLockScheduleStartTime);
    device7.lockSettingsAutoLockScheduleEndTime = device.getPropertyValue(PropertyName.DeviceAutoLockScheduleEndTime);
    device7.lockSettingsOneTouchLocking = device.getPropertyValue(PropertyName.DeviceOneTouchLocking);
    device7.lockSettingsWrongTryProtection = device.getPropertyValue(PropertyName.DeviceWrongTryProtection);
    device7.lockSettingsWrongTryAttempts = device.getPropertyValue(PropertyName.DeviceWrongTryAttempts);
    device7.lockSettingsWrongTryLockdownTime = device.getPropertyValue(PropertyName.DeviceWrongTryLockdownTime);
    device7.lockSettingsScramblePasscode = device.getPropertyValue(PropertyName.DeviceScramblePasscode);
    device7.lockSettingsSound = device.getPropertyValue(PropertyName.DeviceSound);
    device7.lockSettingsNotification = device.getPropertyValue(PropertyName.DeviceNotification);
    device7.lockSettingsNotificationUnlocked = device.getPropertyValue(PropertyName.DeviceNotificationUnlocked);
    device7.lockSettingsNotificationLocked = device.getPropertyValue(PropertyName.DeviceNotificationLocked);
    if (schemaVersion <= 9) {
        return device7;
    }
    const device8 = device7;
    device8.notificationRadarDetector = device.getPropertyValue(PropertyName.DeviceNotificationRadarDetector);
    device8.continuousRecording = device.getPropertyValue(PropertyName.DeviceContinuousRecording);
    device8.continuousRecordingType = device.getPropertyValue(PropertyName.DeviceContinuousRecordingType);
    device8.loiteringDetection = device.getPropertyValue(PropertyName.DeviceLoiteringDetection);
    device8.loiteringDetectionRange = device.getPropertyValue(PropertyName.DeviceLoiteringDetectionRange);
    device8.loiteringDetectionLength = device.getPropertyValue(PropertyName.DeviceLoiteringDetectionLength);
    device8.motionDetectionSensitivityMode = device.getPropertyValue(PropertyName.DeviceMotionDetectionSensitivityMode);
    device8.motionDetectionSensitivityStandard = device.getPropertyValue(PropertyName.DeviceMotionDetectionSensitivityStandard);
    device8.motionDetectionSensitivityAdvancedA = device.getPropertyValue(PropertyName.DeviceMotionDetectionSensitivityAdvancedA);
    device8.motionDetectionSensitivityAdvancedB = device.getPropertyValue(PropertyName.DeviceMotionDetectionSensitivityAdvancedB);
    device8.motionDetectionSensitivityAdvancedC = device.getPropertyValue(PropertyName.DeviceMotionDetectionSensitivityAdvancedC);
    device8.motionDetectionSensitivityAdvancedD = device.getPropertyValue(PropertyName.DeviceMotionDetectionSensitivityAdvancedD);
    device8.motionDetectionSensitivityAdvancedE = device.getPropertyValue(PropertyName.DeviceMotionDetectionSensitivityAdvancedE);
    device8.motionDetectionSensitivityAdvancedF = device.getPropertyValue(PropertyName.DeviceMotionDetectionSensitivityAdvancedF);
    device8.motionDetectionSensitivityAdvancedG = device.getPropertyValue(PropertyName.DeviceMotionDetectionSensitivityAdvancedG);
    device8.motionDetectionSensitivityAdvancedH = device.getPropertyValue(PropertyName.DeviceMotionDetectionSensitivityAdvancedH);
    device8.loiteringCustomResponsePhoneNotification = device.getPropertyValue(PropertyName.DeviceLoiteringCustomResponsePhoneNotification);
    device8.loiteringCustomResponseAutoVoiceResponse = device.getPropertyValue(PropertyName.DeviceLoiteringCustomResponseAutoVoiceResponse);
    device8.loiteringCustomResponseAutoVoiceResponseVoice =
        device.getPropertyValue(PropertyName.DeviceLoiteringCustomResponseAutoVoiceResponseVoice);
    device8.loiteringCustomResponseHomeBaseNotification = device.getPropertyValue(PropertyName.DeviceLoiteringCustomResponseHomeBaseNotification);
    device8.loiteringCustomResponseTimeFrom = device.getPropertyValue(PropertyName.DeviceLoiteringCustomResponseTimeFrom);
    device8.loiteringCustomResponseTimeTo = device.getPropertyValue(PropertyName.DeviceLoiteringCustomResponseTimeTo);
    device8.deliveryGuard = device.getPropertyValue(PropertyName.DeviceDeliveryGuard);
    device8.deliveryGuardPackageGuarding = device.getPropertyValue(PropertyName.DeviceDeliveryGuardPackageGuarding);
    device8.deliveryGuardPackageGuardingVoiceResponseVoice =
        device.getPropertyValue(PropertyName.DeviceDeliveryGuardPackageGuardingVoiceResponseVoice);
    device8.deliveryGuardPackageGuardingActivatedTimeFrom =
        device.getPropertyValue(PropertyName.DeviceDeliveryGuardPackageGuardingActivatedTimeFrom);
    device8.deliveryGuardPackageGuardingActivatedTimeTo = device.getPropertyValue(PropertyName.DeviceDeliveryGuardPackageGuardingActivatedTimeTo);
    device8.deliveryGuardUncollectedPackageAlert = device.getPropertyValue(PropertyName.DeviceDeliveryGuardUncollectedPackageAlert);
    device8.deliveryGuardUncollectedPackageAlertTimeToCheck =
        device.getPropertyValue(PropertyName.DeviceDeliveryGuardUncollectedPackageAlertTimeToCheck);
    device8.deliveryGuardPackageLiveCheckAssistance = device.getPropertyValue(PropertyName.DeviceDeliveryGuardPackageLiveCheckAssistance);
    device8.dualCamWatchViewMode = device.getPropertyValue(PropertyName.DeviceDualCamWatchViewMode);
    device8.ringAutoResponse = device.getPropertyValue(PropertyName.DeviceRingAutoResponse);
    device8.ringAutoResponseVoiceResponse = device.getPropertyValue(PropertyName.DeviceRingAutoResponseVoiceResponse);
    device8.ringAutoResponseVoiceResponseVoice = device.getPropertyValue(PropertyName.DeviceRingAutoResponseVoiceResponseVoice);
    device8.ringAutoResponseTimeFrom = device.getPropertyValue(PropertyName.DeviceRingAutoResponseTimeFrom);
    device8.ringAutoResponseTimeTo = device.getPropertyValue(PropertyName.DeviceRingAutoResponseTimeTo);
    device8.defaultAngle = device.getPropertyValue(PropertyName.DeviceDefaultAngle);
    device8.defaultAngleIdleTime = device.getPropertyValue(PropertyName.DeviceDefaultAngleIdleTime);
    device8.soundDetectionRoundLook = device.getPropertyValue(PropertyName.DeviceSoundDetectionRoundLook);
    if (schemaVersion <= 10) {
        return device8;
    }
    // All schemas >= 11
    const device9 = device8;
    device9.imageMirrored = device.getPropertyValue(PropertyName.DeviceImageMirrored);
    return device9;
};
//# sourceMappingURL=state.js.map