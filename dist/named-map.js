"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NamedMap = void 0;
const utils_1 = require("./utils");
/**
 * Named map.
 */
class NamedMap extends Map {
    /**
     * Constructor.
     *
     * @param name
     * @param entries
     */
    constructor(name, entries) {
        if (typeof name === 'object') {
            entries = name;
            name = undefined;
        }
        super(entries);
        this.name = name;
    }
    /**
     * To string.
     */
    toString() {
        return (0, utils_1.namedInstanceToString)(this);
    }
}
exports.NamedMap = NamedMap;
//# sourceMappingURL=named-map.js.map