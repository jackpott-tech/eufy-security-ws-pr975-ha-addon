export const dumpDriver = (driver, schemaVersion) => {
    const base = {
        version: driver.getVersion(),
        connected: driver.isConnected(),
        pushConnected: driver.isPushConnected(),
    };
    if (schemaVersion <= 8) {
        return base;
    }
    // All schemas >= 9
    const driver1 = base;
    driver1.mqttConnected = driver.isMQTTConnected();
    return driver1;
};
//# sourceMappingURL=state.js.map