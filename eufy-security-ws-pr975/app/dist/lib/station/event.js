export var StationEvent;
(function (StationEvent) {
    StationEvent["stationAdded"] = "station added";
    StationEvent["stationRemoved"] = "station removed";
    StationEvent["guardModeChanged"] = "guard mode changed";
    StationEvent["currentModeChanged"] = "current mode changed";
    StationEvent["commandResult"] = "command result";
    StationEvent["connected"] = "connected";
    StationEvent["disconnected"] = "disconnected";
    StationEvent["connectionError"] = "connection error";
    StationEvent["propertyChanged"] = "property changed";
    StationEvent["alarmEvent"] = "alarm event";
    StationEvent["alarmDelayEvent"] = "alarm delay event";
    StationEvent["alarmArmedEvent"] = "alarm armed event";
    StationEvent["alarmArmDelayEvent"] = "alarm arm delay event";
    StationEvent["imageDownloaded"] = "image downloaded";
    StationEvent["databaseQueryLatest"] = "database query latest";
    StationEvent["databaseQueryLocal"] = "database query local";
    StationEvent["databaseQueryByDate"] = "database query by date";
    StationEvent["databaseCountByDate"] = "database count by date";
    StationEvent["databaseDelete"] = "database delete";
})(StationEvent || (StationEvent = {}));
//# sourceMappingURL=event.js.map