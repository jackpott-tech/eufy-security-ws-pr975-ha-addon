import { inspect } from "util";
export const convertCamelCaseToSnakeCase = function (value) {
    return value !== undefined
        ? value.replace(/[A-Z]/g, (letter, index) => {
            return index == 0 ? letter.toLowerCase() : "_" + letter.toLowerCase();
        })
        : "";
};
export const waitForEvent = function (emitter, event, timeout) {
    return new Promise((resolve, reject) => {
        let internalTimeout = undefined;
        const success = (val) => {
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            emitter.off("error", fail);
            resolve(val);
        };
        const fail = (err) => {
            emitter.off(event, success);
            reject(err);
        };
        emitter.once(event, success);
        emitter.once("error", fail);
        if (internalTimeout)
            clearTimeout(internalTimeout);
        if (timeout) {
            internalTimeout = setTimeout(() => {
                emitter.off(event, success);
                emitter.off("error", fail);
                reject(new Error("Timeout reached"));
            }, timeout);
        }
    });
};
export const initializeInspectStyles = function () {
    inspect.styles.special = "cyan";
    inspect.styles.number = "green";
    inspect.styles.bigint = "green";
    inspect.styles.boolean = "yellow";
    inspect.styles.undefined = "grey";
    inspect.styles.null = "bold";
    inspect.styles.string = "red";
    inspect.styles.symbol = "green";
    inspect.styles.date = "magenta";
    inspect.styles.regexp = "red";
    inspect.styles.module = "underline";
};
//# sourceMappingURL=utils.js.map