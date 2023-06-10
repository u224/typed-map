"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typedMapKeyToString = void 0;
const typed_key_1 = require("../typed-key");
const is_constructor_1 = require("./is-constructor");
/**
 * Typed map key to string.
 *
 * @param key
 */
function typedMapKeyToString(key) {
    if (key instanceof typed_key_1.TypedKey)
        return String(key);
    if ((0, is_constructor_1.isConstructor)(key))
        return key.name;
    if (typeof key === 'string')
        return `String(${key})`;
    if (typeof key === 'number')
        return `Number(${key})`;
    if (typeof key === 'boolean')
        return `Boolean(${key})`;
    if (typeof key === 'symbol') {
        return key.description ? `Symbol(${key.description})` : 'Symbol';
    }
    if (key != null &&
        typeof key === 'object' &&
        key.constructor &&
        key.constructor.name) {
        return key.constructor.name;
    }
    return String(key);
}
exports.typedMapKeyToString = typedMapKeyToString;
//# sourceMappingURL=typed-map-key-to-string.js.map