"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isConstructor = void 0;
/**
 * Check whether a value is a Constructor.
 *
 * @param value
 */
function isConstructor(value) {
    try {
        new value();
    }
    catch (error) {
        return false;
    }
    return true;
}
exports.isConstructor = isConstructor;
//# sourceMappingURL=is-constructor.js.map