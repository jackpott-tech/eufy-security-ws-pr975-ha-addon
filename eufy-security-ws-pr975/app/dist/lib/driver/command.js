export var DriverCommand;
(function (DriverCommand) {
    DriverCommand["setVerifyCode"] = "driver.set_verify_code";
    DriverCommand["setCaptcha"] = "driver.set_captcha";
    DriverCommand["pollRefresh"] = "driver.poll_refresh";
    DriverCommand["isConnected"] = "driver.is_connected";
    DriverCommand["isPushConnected"] = "driver.is_push_connected";
    DriverCommand["connect"] = "driver.connect";
    DriverCommand["disconnect"] = "driver.disconnect";
    DriverCommand["getAlarmEvents"] = "driver.get_alarm_events";
    DriverCommand["getVideoEvents"] = "driver.get_video_events";
    DriverCommand["getHistoryEvents"] = "driver.get_history_events";
    DriverCommand["setLogLevel"] = "driver.set_log_level";
    DriverCommand["getLogLevel"] = "driver.get_log_level";
    DriverCommand["startListeningLogs"] = "driver.start_listening_logs";
    DriverCommand["stopListeningLogs"] = "driver.stop_listening_logs";
    DriverCommand["isListeningLogs"] = "driver.is_listening_logs";
    DriverCommand["isMqttConnected"] = "driver.is_mqtt_connected";
    //Legacy commands
    DriverCommand["isConnectedLegacy"] = "driver.isConnected";
    DriverCommand["isPushConnectedLegacy"] = "driver.isPushConnected";
})(DriverCommand || (DriverCommand = {}));
//# sourceMappingURL=command.js.map