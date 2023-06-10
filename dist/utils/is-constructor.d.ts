import { Constructor } from '../types';
/**
 * Check whether a value is a Constructor.
 *
 * @param value
 */
export declare function isConstructor<T>(value: unknown): value is Constructor<T>;
