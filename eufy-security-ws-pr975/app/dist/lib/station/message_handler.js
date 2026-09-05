import { parse } from "date-and-time";
import { UnknownCommandError } from "../error.js";
import { StationCommand } from "./command.js";
import { dumpStationProperties, dumpStationPropertiesMetadata, } from "./properties.js";
export class StationMessageHandler {
    static async handle(message, driver, client) {
        const { serialNumber, command } = message;
        const station = await driver.getStation(serialNumber);
        switch (command) {
            case StationCommand.reboot:
                station.rebootHUB();
                return client.schemaVersion >= 13 ? { async: true } : {};
            case StationCommand.setGuardMode:
                if (client.schemaVersion <= 12) {
                    station.setGuardMode(message.mode);
                    return {};
                }
                else {
                    throw new UnknownCommandError(command);
                }
            case StationCommand.isConnected: {
                const result = station.isConnected();
                if (client.schemaVersion <= 3) {
                    return { connected: result };
                }
                else if (client.schemaVersion >= 4) {
                    return {
                        serialNumber: station.getSerial(),
                        connected: result,
                    };
                }
                else {
                    throw new UnknownCommandError(command);
                }
            }
            case StationCommand.isConnectedLegacy: {
                if (client.schemaVersion <= 12) {
                    const result = station.isConnected();
                    return { connected: result };
                }
                else {
                    throw new UnknownCommandError(command);
                }
            }
            case StationCommand.getCameraInfo:
                await station.getCameraInfo();
                return client.schemaVersion >= 13 ? { async: true } : {};
            case StationCommand.getStorageInfo:
                await station.getStorageInfoEx();
                return client.schemaVersion >= 13 ? { async: true } : {};
            case StationCommand.connect:
                await station.connect().catch((error) => {
                    throw error;
                });
                return {};
            case StationCommand.disconnect:
                station.close();
                return {};
            case StationCommand.getPropertiesMetadata: {
                const properties = station.getPropertiesMetadata();
                if (client.schemaVersion <= 3) {
                    return { properties: properties };
                }
                else if (client.schemaVersion >= 4) {
                    return {
                        serialNumber: station.getSerial(),
                        properties: properties,
                    };
                }
                else {
                    return {
                        serialNumber: station.getSerial(),
                        properties: dumpStationPropertiesMetadata(station, client.schemaVersion),
                    };
                }
            }
            case StationCommand.getProperties: {
                const properties = station.getProperties();
                if (client.schemaVersion <= 3) {
                    return { properties: properties };
                }
                else if (client.schemaVersion >= 4) {
                    return {
                        serialNumber: station.getSerial(),
                        properties: properties,
                    };
                }
                else {
                    return {
                        serialNumber: station.getSerial(),
                        properties: dumpStationProperties(station, client.schemaVersion),
                    };
                }
            }
            case StationCommand.setProperty:
                await driver
                    .setStationProperty(serialNumber, message.name, message.value)
                    .catch((error) => {
                    throw error;
                });
                return client.schemaVersion >= 13 ? { async: true } : {};
            case StationCommand.triggerAlarm:
                if (client.schemaVersion >= 3) {
                    station.triggerStationAlarmSound(message.seconds);
                    return client.schemaVersion >= 13 ? { async: true } : {};
                }
                else {
                    throw new UnknownCommandError(command);
                }
            case StationCommand.resetAlarm:
                if (client.schemaVersion >= 3) {
                    station.resetStationAlarmSound();
                    return client.schemaVersion >= 13 ? { async: true } : {};
                }
                else {
                    throw new UnknownCommandError(command);
                }
            case StationCommand.hasProperty: {
                if (client.schemaVersion >= 3) {
                    const result = station.hasProperty(message.propertyName);
                    if (client.schemaVersion === 3) {
                        return { exists: result };
                    }
                    else if (client.schemaVersion >= 4) {
                        return {
                            serialNumber: station.getSerial(),
                            exists: result,
                        };
                    }
                    else {
                        throw new UnknownCommandError(command);
                    }
                }
                else {
                    throw new UnknownCommandError(command);
                }
            }
            case StationCommand.hasCommand: {
                if (client.schemaVersion >= 3) {
                    const result = station.hasCommand(message.commandName);
                    if (client.schemaVersion === 3) {
                        return { exists: result };
                    }
                    else if (client.schemaVersion >= 4) {
                        return {
                            serialNumber: station.getSerial(),
                            exists: result,
                        };
                    }
                    else {
                        throw new UnknownCommandError(command);
                    }
                }
                else {
                    throw new UnknownCommandError(command);
                }
            }
            case StationCommand.getCommands: {
                if (client.schemaVersion >= 3) {
                    const result = station.getCommands();
                    if (client.schemaVersion === 3) {
                        return { commands: result };
                    }
                    else if (client.schemaVersion >= 4) {
                        return {
                            serialNumber: station.getSerial(),
                            commands: result,
                        };
                    }
                    else {
                        throw new UnknownCommandError(command);
                    }
                }
                else {
                    throw new UnknownCommandError(command);
                }
            }
            case StationCommand.chime:
                if (client.schemaVersion >= 15) {
                    const ringtone = message.ringtone;
                    station.chimeHomebase(ringtone !== undefined ? ringtone : 0);
                    return { async: true };
                }
                else {
                    throw new UnknownCommandError(command);
                }
            case StationCommand.downloadImage:
                if (client.schemaVersion >= 17) {
                    const file = message.file;
                    station.downloadImage(file);
                    return { async: true };
                }
                else {
                    throw new UnknownCommandError(command);
                }
            case StationCommand.databaseQueryLatestInfo:
                if (client.schemaVersion >= 18) {
                    station.databaseQueryLatestInfo();
                    return { async: true };
                }
                else {
                    throw new UnknownCommandError(command);
                }
            case StationCommand.databaseQueryLocal:
                if (client.schemaVersion >= 18) {
                    const serialNumbers = message
                        .serialNumbers;
                    const startDate = parse(message.startDate, "YYYYMMDD");
                    const endDate = parse(message.endDate, "YYYYMMDD");
                    const eventType = message
                        .eventType;
                    const detectionType = message
                        .detectionType;
                    const storageType = message
                        .storageType;
                    station.databaseQueryLocal(serialNumbers, startDate, endDate, eventType, detectionType, storageType);
                    return { async: true };
                }
                else {
                    throw new UnknownCommandError(command);
                }
            case StationCommand.databaseQueryByDate:
                if (client.schemaVersion >= 18) {
                    const serialNumbers = message
                        .serialNumbers;
                    const startDate = parse(message.startDate, "YYYYMMDD");
                    const endDate = parse(message.endDate, "YYYYMMDD");
                    const eventType = message
                        .eventType;
                    const detectionType = message
                        .detectionType;
                    const storageType = message
                        .storageType;
                    station.databaseQueryByDate(serialNumbers, startDate, endDate, eventType, detectionType, storageType);
                    return { async: true };
                }
                else {
                    throw new UnknownCommandError(command);
                }
            case StationCommand.databaseCountByDate:
                if (client.schemaVersion >= 18) {
                    const startDate = parse(message.startDate, "YYYYMMDD");
                    const endDate = parse(message.endDate, "YYYYMMDD");
                    station.databaseCountByDate(startDate, endDate);
                    return { async: true };
                }
                else {
                    throw new UnknownCommandError(command);
                }
            case StationCommand.databaseDelete:
                if (client.schemaVersion >= 18) {
                    const ids = message.ids;
                    station.databaseDelete(ids);
                    return { async: true };
                }
                else {
                    throw new UnknownCommandError(command);
                }
            default:
                throw new UnknownCommandError(command);
        }
    }
}
//# sourceMappingURL=message_handler.js.map