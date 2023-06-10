import {TypedKey} from '../typed-key';
import {TypedMapKey} from '../typed-map';
import {isConstructor} from './is-constructor';

/**
 * Typed map key to string.
 *
 * @param key
 */
export function typedMapKeyToString<T>(key: TypedMapKey<T>): string {
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
}
