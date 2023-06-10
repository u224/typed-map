import {NamedMap} from './named-map';
import {KeyNotFoundError} from './errors';
import {TypedMapKey} from './typed-map-key';

/**
 * Typed map.
 */
export class TypedMap<
  K extends TypedMapKey<V> = TypedMapKey,
  V = unknown,
> extends NamedMap<unknown, unknown> {
  /**
   * Get.
   *
   * @param key
   */
  get<T>(
    key: TypedMapKey<T> extends K ? TypedMapKey<T> : K,
  ): T extends V ? T : never {
    if (!super.has(key)) throw new KeyNotFoundError(this, key);
    return super.get(key) as T extends V ? T : never;
  }

  /**
   * Has.
   *
   * @param key
   */
  has<T>(
    key: TypedMapKey<T> extends K ? TypedMapKey<T> : K,
  ): T extends V ? boolean : false {
    return super.has(key) as T extends V ? boolean : false;
  }

  /**
   * Set.
   *
   * @param key
   * @param value
   */
  set<T>(
    key: TypedMapKey<T> extends K ? TypedMapKey<T> : K,
    value: T extends V ? T : V,
  ): this {
    super.set(key, value);
    return this;
  }
}
