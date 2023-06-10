"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.namedInstanceToString = void 0;
/**
 * Class instance to string.
 *
 * @param instance
 */
function namedInstanceToString(instance) {
    return instance.name
        ? instance.constructor.name + `(${instance.name})`
        : instance.constructor.name;
}
exports.namedInstanceToString = namedInstanceToString;
//# sourceMappingURL=named-instance-to-string.js.map