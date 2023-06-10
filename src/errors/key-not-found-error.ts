import {format} from 'util';
import {TypedMap} from '../typed-map';
import {TypedMapKey} from '../typed-map';
import {typedMapKeyToString} from '../utils';

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
    super(
      format('%s is not found in %s.', typedMapKeyToString(key), String(map)),
    );
  }
}
