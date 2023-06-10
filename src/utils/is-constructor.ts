import {Constructor} from '../types';

/**
 * Check whether a value is a Constructor.
 *
 * @param value
 */
export function isConstructor<T>(value: unknown): value is Constructor<T> {
  try {
    new (value as Constructor)();
  } catch (error) {
    return false;
  }
  return true;
}
