"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypedKey = void 0;
/**
 * Typed key.
 */
class TypedKey {
    /**
     * Constructor.
     *
     * @param name
     */
    constructor(name) {
        this.name = name;
    }
    /**
     * To string.
     */
    toString() {
        return this.name
            ? this.constructor.name + `(${this.name})`
            : this.constructor.name;
    }
}
exports.TypedKey = TypedKey;
//# sourceMappingURL=typed-key.js.map