export var DriverEvent;
(function (DriverEvent) {
    DriverEvent["verifyCode"] = "verify code";
    DriverEvent["captchaRequest"] = "captcha request";
    DriverEvent["connected"] = "connected";
    DriverEvent["connectionError"] = "connectionError";
    DriverEvent["disconnected"] = "disconnected";
    DriverEvent["pushConnected"] = "push connected";
    DriverEvent["pushDisconnected"] = "push disconnected";
    DriverEvent["mqttConnected"] = "mqtt connected";
    DriverEvent["mqttDisconnected"] = "mqtt disconnected";
    DriverEvent["logLevelChanged"] = "log level changed";
    DriverEvent["logging"] = "logging";
})(DriverEvent || (DriverEvent = {}));
//# sourceMappingURL=event.js.map