import {MapEntries} from './types';
import {namedInstanceToString} from './utils';

/**
 * Named map.
 */
export class NamedMap<T, V> extends Map<T, V> {
  /**
   * Name.
   */
  readonly name?: string;

  /**
   * Constructor.
   *
   * @param name
   * @param entries
   */
  constructor(
    name?: string | MapEntries<T, V>,
    entries?: MapEntries<T, V>,
  ) {
    if (typeof name === 'object') {
      entries = name;
      name = undefined;
    }
    super(entries);
    this.name = name;
  }

  /**
   * To string.
   */
  toString(): string {
    return namedInstanceToString(this);
  }
}
