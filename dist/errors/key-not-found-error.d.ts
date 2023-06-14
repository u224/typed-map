import { TypedMap } from '../typed-map';
import { TypedMapKey } from '../typed-map';
/**
 * Value not found error.
 */
export declare class KeyNotFoundError extends Error {
    /**
     * Constructor.
     *
     * @param map
     * @param key
     */
    constructor(map: TypedMap, key: TypedMapKey);
}
