export declare enum ErrorCode {
    unknownError = "unknown_error",
    unknownCommand = "unknown_command",
    invalidCountryCode = "invalid_country_code",
    invalidLanguageCode = "invalid_language_code",
    stationNotFound = "station_not_found",
    stationNotConnected = "station_not_connected",
    stationConnectionTimeout = "station_connection_timeout",
    deviceNotFound = "device_not_found",
    deviceWrongStation = "device_wrong_station",
    deviceInvalidProperty = "device_invalid_property",
    deviceInvalidPropertyValue = "device_invalid_property_value",
    devicePropertyNotSupported = "device_property_not_supported",
    deviceReadOnlyProperty = "device_property_readonly",
    deviceNotSupported = "device_not_supported",
    deviceInvalidCommandValue = "device_invalid_command_value",
    deviceLivestreamAlreadyRunning = "device_livestream_already_running",
    deviceLivestreamNotRunning = "device_livestream_not_running",
    schemaIncompatible = "schema_incompatible",
    deviceDownloadAlreadyRunning = "device_download_already_running",
    deviceDownloadNotRunning = "device_download_not_running",
    deviceOnlyOneDownloadAtATime = "device_only_one_download_at_a_time",
    deviceTalkbackAlreadyRunning = "device_talkback_already_running",
    deviceTalkbackNotRunning = "device_talkback_not_running",
    deviceOnlyOneTalkbackAtATime = "device_only_one_talkback_at_a_time",
    deviceRTSPPropertyNotEnabled = "device_rtsp_property_not_enabled"
}
export declare class BaseError extends Error {
    errorCode: ErrorCode;
}
export declare class UnknownError extends BaseError {
    error: Error;
    errorCode: ErrorCode;
    constructor(error: Error);
}
export declare class UnknownCommandError extends BaseError {
    command: string;
    errorCode: ErrorCode;
    constructor(command: string);
}
export declare class SchemaIncompatibleError extends BaseError {
    schemaId: number;
    errorCode: ErrorCode;
    constructor(schemaId: number);
}
export declare class LivestreamAlreadyRunningError extends Error {
    constructor(message?: string);
}
export declare class LivestreamNotRunningError extends Error {
    constructor(message?: string);
}
export declare class DownloadAlreadyRunningError extends Error {
    constructor(message?: string);
}
export declare class DownloadNotRunningError extends Error {
    constructor(message?: string);
}
export declare class DownloadOnlyOneAtATimeError extends Error {
    constructor(message?: string);
}
export declare class TalkbackAlreadyRunningError extends Error {
    constructor(message?: string);
}
export declare class TalkbackNotRunningError extends Error {
    constructor(message?: string);
}
export declare class TalkbackOnlyOneAtATimeError extends Error {
    constructor(message?: string);
}
//# sourceMappingURL=error.d.ts.map