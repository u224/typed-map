import {Constructor} from './types';
import {TypedKey} from './typed-key';
import {isConstructor} from './utils';

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
 * Typed map key (utils).
 */
export const TypedMapKey = {
  /**
   * String from.
   *
   * @param key
   */
  stringFrom<T>(key: TypedMapKey<T>): string {
    if (key instanceof TypedKey) return String(key);
    if (isConstructor(key)) return key.name;
    if (typeof key === 'string') return `String(${key})`;
    if (typeof key === 'number') return `Number(${key})`;
    if (typeof key === 'boolean') return `Boolean(${key})`;
    if (typeof key === 'symbol') {
      return key.description ? `Symbol(${key.description})` : 'Symbol';
    }
    if (
      key != null &&
      typeof key === 'object' &&
      key.constructor &&
      key.constructor.name
    ) {
      return key.constructor.name;
    }
    return String(key);
  },
} as const;
