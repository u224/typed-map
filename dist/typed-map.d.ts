import { Constructor } from './types';
import { TypedKey } from './typed-key';
import { NamedMap } from './named-map';
/**
 * Typed key or any.
 */
export type TypedMapKey<T = unknown> = TypedKey<T> | Constructor<T> | string | symbol | number | boolean | object;
/**
 * Typed map.
 */
export declare class TypedMap<K extends TypedMapKey<V> = TypedMapKey, V = unknown> extends NamedMap<unknown, unknown> {
    /**
     * Get.
     *
     * @param key
     */
    get<T extends V>(key: TypedMapKey<T> & K): T;
    /**
     * Has.
     *
     * @param key
     */
    has<T extends V>(key: TypedMapKey<T> & K): boolean;
    /**
     * Set.
     *
     * @param key
     * @param value
     */
    set<T extends V>(key: TypedMapKey<T> & K, value: T): this;
}
