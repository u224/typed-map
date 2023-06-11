"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypedKey = void 0;
const utils_1 = require("./utils");
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
        /**
         * Fix structural typing.
         *
         * @protected
         */
        this._fixStructuralTyping = 'typed-key';
    }
    /**
     * To string.
     */
    toString() {
        return (0, utils_1.namedInstanceToString)(this);
    }
}
exports.TypedKey = TypedKey;
//# sourceMappingURL=typed-key.js.map