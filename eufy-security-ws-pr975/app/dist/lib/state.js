import { dumpDevice } from "./device/state.js";
import { dumpDriver } from "./driver/state.js";
import { dumpStation } from "./station/state.js";
export const dumpState = async (driver, schemaVersion) => {
    const base = {
        driver: dumpDriver(driver, schemaVersion),
        stations: driver.isConnected()
            ? Array.from(await driver.getStations(), (station) => dumpStation(station, schemaVersion))
            : [],
        devices: driver.isConnected()
            ? Array.from(await driver.getDevices(), (device) => dumpDevice(device, schemaVersion))
            : [],
    };
    if (schemaVersion < 13)
        return base;
    const base1 = base;
    base1.stations = driver.isConnected()
        ? Array.from(await driver.getStations(), (station) => station.getSerial())
        : [];
    base1.devices = driver.isConnected()
        ? Array.from(await driver.getDevices(), (device) => device.getSerial())
        : [];
    return base1;
};
//# sourceMappingURL=state.js.map