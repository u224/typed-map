"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypedMap = void 0;
const key_not_found_error_1 = require("./key-not-found-error");
/**
 * Typed map.
 */
class TypedMap extends Map {
    /**
     * Get.
     *
     * @param key
     */
    get(key) {
        if (!super.has(key))
            throw new key_not_found_error_1.KeyNotFoundError(this, key);
        return super.get(key);
    }
    /**
     * Has.
     *
     * @param key
     */
    has(key) {
        return super.has(key);
    }
    /**
     * Set.
     *
     * @param key
     * @param value
     */
    set(key, value) {
        super.set(key, value);
        return this;
    }
}
exports.TypedMap = TypedMap;
//# sourceMappingURL=typed-map.js.map