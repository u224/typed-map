import { MapEntries } from './types';
/**
 * Named map.
 */
export declare class NamedMap<T, V> extends Map<T, V> {
    /**
     * Name.
     */
    readonly name?: string;
    /**
     * Constructor.
     *
     * @param name
     * @param entries
     */
    constructor(name?: string | MapEntries<T, V>, entries?: MapEntries<T, V>);
    /**
     * To string.
     */
    toString(): string;
}
