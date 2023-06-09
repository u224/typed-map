/**
 * A callable type with "new" operator allows
 * class and constructor.
 */
export interface Constructor<T = unknown> {
    new (...args: any[]): T;
}
/**
 * Map entries.
 */
export type MapEntries<K, V> = [K, V][];
