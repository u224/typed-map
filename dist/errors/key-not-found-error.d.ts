import { TypedMap } from '../typed-map';
import { TypedMapKey } from '../typed-map-key';
/**
 * Value not found error.
 */
export declare class KeyNotFoundError<T, V> extends Error {
    /**
     * Constructor.
     *
     * @param map
     * @param key
     */
    constructor(map: TypedMap<T, V>, key: TypedMapKey<V>);
}
