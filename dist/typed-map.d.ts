import { NamedMap } from './named-map';
import { TypedMapKey } from './typed-map-key';
/**
 * Typed map.
 */
export declare class TypedMap<K extends TypedMapKey<V> = TypedMapKey, V = unknown> extends NamedMap<unknown, unknown> {
    /**
     * Get.
     *
     * @param key
     */
    get<T>(key: TypedMapKey<T> extends K ? TypedMapKey<T> : K): T extends V ? T : never;
    /**
     * Has.
     *
     * @param key
     */
    has<T>(key: TypedMapKey<T> extends K ? TypedMapKey<T> : K): T extends V ? boolean : false;
    /**
     * Set.
     *
     * @param key
     * @param value
     */
    set<T>(key: TypedMapKey<T> extends K ? TypedMapKey<T> : K, value: T extends V ? T : V): this;
}
