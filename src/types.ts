/**
 * A callable type with "new" operator allows
 * class and constructor.
 */
export interface Constructor<T = unknown> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  new (...args: any[]): T;
}
