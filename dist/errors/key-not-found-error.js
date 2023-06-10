"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyNotFoundError = void 0;
const util_1 = require("util");
const utils_1 = require("../utils");
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
        super((0, util_1.format)('%s is not found in %s.', (0, utils_1.typedMapKeyToString)(key), String(map)));
    }
}
exports.KeyNotFoundError = KeyNotFoundError;
//# sourceMappingURL=key-not-found-error.js.map