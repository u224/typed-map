import {format} from 'util';
import {TypedMap} from '../typed-map';
import {TypedMapKey} from '../typed-map';
import {typedMapKeyToString} from '../utils';

/**
 * Value not found error.
 */
export class KeyNotFoundError extends Error {
  /**
   * Constructor.
   *
   * @param map
   * @param key
   */
  constructor(map: TypedMap, key: TypedMapKey) {
    super(
      format(
        '%s is not found in %s.',
        typedMapKeyToString(key),
        String(map),
      ),
    );
  }
}
