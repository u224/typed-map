import {Constructor} from './types';
import {TypedKey} from './typed-key';
import {NamedMap} from './named-map';
import {KeyNotFoundError} from './errors';

/**
 * Typed key or any.
 */
export type TypedMapKey<T = unknown> =
  | TypedKey<T>
  | Constructor<T>
  | string
  | symbol
  | number
  | boolean
  | object;

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
  get<T extends V>(key: TypedMapKey<T> & K): T {
    if (!super.has(key))
      throw new KeyNotFoundError(this, key);
    return super.get(key) as T extends V ? T : never;
  }

  /**
   * Has.
   *
   * @param key
   */
  has<T extends V>(key: TypedMapKey<T> & K): boolean {
    return super.has(key) as T extends V ? boolean : false;
  }

  /**
   * Set.
   *
   * @param key
   * @param value
   */
  set<T extends V>(
    key: TypedMapKey<T> & K,
    value: T,
  ): this {
    super.set(key, value);
    return this;
  }
}
