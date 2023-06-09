"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyNotFoundError = void 0;
const util_1 = require("util");
/**
 * Value not found error.
 */
class KeyNotFoundError extends Error {
    /**
     * Constructor.
     *
     * @param map
     * @param key
     */
    constructor(map, key) {
        super((0, util_1.format)('The key %s is not found in %s.', String(key), String(map)));
    }
}
exports.KeyNotFoundError = KeyNotFoundError;
//# sourceMappingURL=key-not-found-error.js.map