"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypedMap = void 0;
const named_map_1 = require("./named-map");
const errors_1 = require("./errors");
/**
 * Typed map.
 */
class TypedMap extends named_map_1.NamedMap {
    /**
     * Get.
     *
     * @param key
     */
    get(key) {
        if (!super.has(key))
            throw new errors_1.KeyNotFoundError(this, key);
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