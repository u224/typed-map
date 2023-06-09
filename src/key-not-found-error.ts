import {format} from 'util';
import {TypedMap} from './typed-map';
import {TypedMapKey} from './typed-map';

/**
 * Value not found error.
 */
export class KeyNotFoundError<T, V> extends Error {
  /**
   * Constructor.
   *
   * @param map
   * @param key
   */
  constructor(map: TypedMap<T, V>, key: TypedMapKey<V>) {
    super(format('The key %s is not found in %s.', String(key), String(map)));
  }
}
