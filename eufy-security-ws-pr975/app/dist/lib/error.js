export var ErrorCode;
(function (ErrorCode) {
    ErrorCode["unknownError"] = "unknown_error";
    ErrorCode["unknownCommand"] = "unknown_command";
    ErrorCode["invalidCountryCode"] = "invalid_country_code";
    ErrorCode["invalidLanguageCode"] = "invalid_language_code";
    ErrorCode["stationNotFound"] = "station_not_found";
    ErrorCode["stationNotConnected"] = "station_not_connected";
    ErrorCode["stationConnectionTimeout"] = "station_connection_timeout";
    ErrorCode["deviceNotFound"] = "device_not_found";
    ErrorCode["deviceWrongStation"] = "device_wrong_station";
    ErrorCode["deviceInvalidProperty"] = "device_invalid_property";
    ErrorCode["deviceInvalidPropertyValue"] = "device_invalid_property_value";
    ErrorCode["devicePropertyNotSupported"] = "device_property_not_supported";
    ErrorCode["deviceReadOnlyProperty"] = "device_property_readonly";
    ErrorCode["deviceNotSupported"] = "device_not_supported";
    ErrorCode["deviceInvalidCommandValue"] = "device_invalid_command_value";
    ErrorCode["deviceLivestreamAlreadyRunning"] = "device_livestream_already_running";
    ErrorCode["deviceLivestreamNotRunning"] = "device_livestream_not_running";
    ErrorCode["schemaIncompatible"] = "schema_incompatible";
    ErrorCode["deviceDownloadAlreadyRunning"] = "device_download_already_running";
    ErrorCode["deviceDownloadNotRunning"] = "device_download_not_running";
    ErrorCode["deviceOnlyOneDownloadAtATime"] = "device_only_one_download_at_a_time";
    ErrorCode["deviceTalkbackAlreadyRunning"] = "device_talkback_already_running";
    ErrorCode["deviceTalkbackNotRunning"] = "device_talkback_not_running";
    ErrorCode["deviceOnlyOneTalkbackAtATime"] = "device_only_one_talkback_at_a_time";
    ErrorCode["deviceRTSPPropertyNotEnabled"] = "device_rtsp_property_not_enabled";
})(ErrorCode || (ErrorCode = {}));
export class BaseError extends Error {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    errorCode;
}
export class UnknownError extends BaseError {
    error;
    errorCode = ErrorCode.unknownError;
    constructor(error) {
        super();
        this.error = error;
    }
}
export class UnknownCommandError extends BaseError {
    command;
    errorCode = ErrorCode.unknownCommand;
    constructor(command) {
        super();
        this.command = command;
    }
}
export class SchemaIncompatibleError extends BaseError {
    schemaId;
    errorCode = ErrorCode.schemaIncompatible;
    constructor(schemaId) {
        super();
        this.schemaId = schemaId;
    }
}
export class LivestreamAlreadyRunningError extends Error {
    constructor(message) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = LivestreamAlreadyRunningError.name;
    }
}
export class LivestreamNotRunningError extends Error {
    constructor(message) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = LivestreamNotRunningError.name;
    }
}
export class DownloadAlreadyRunningError extends Error {
    constructor(message) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = DownloadAlreadyRunningError.name;
    }
}
export class DownloadNotRunningError extends Error {
    constructor(message) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = DownloadNotRunningError.name;
    }
}
export class DownloadOnlyOneAtATimeError extends Error {
    constructor(message) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = DownloadOnlyOneAtATimeError.name;
    }
}
export class TalkbackAlreadyRunningError extends Error {
    constructor(message) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = TalkbackAlreadyRunningError.name;
    }
}
export class TalkbackNotRunningError extends Error {
    constructor(message) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = TalkbackNotRunningError.name;
    }
}
export class TalkbackOnlyOneAtATimeError extends Error {
    constructor(message) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = TalkbackOnlyOneAtATimeError.name;
    }
}
//# sourceMappingURL=error.js.map