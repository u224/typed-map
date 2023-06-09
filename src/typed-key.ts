import {namedInstanceToString} from './utils';

/**
 * Typed key.
 */
export class TypedKey<T> {
  /**
   * Fix generic type validation.
   *
   * Example:
   *
   * ```ts
   * class Foo<T> {}
   * class Bar<T> {}
   *
   * class Baz {
   *     static method<T>(
   *         foo: Foo<T>,
   *         bar: Bar<T>,
   *     ) {}
   * }
   *
   * Baz.method(
   *     new Foo<string>(),
   *     new Bar<number>(), // No error because T is not used.
   * );
   * ```
   */
  protected _fixUnusedGeneric?: T;

  /**
   * Fix structural typing.
   *
   * @protected
   */
  protected _fixStructuralTyping = 'typed-key' as const;

  /**
   * Constructor.
   *
   * @param name
   */
  constructor(readonly name?: string) {}

  /**
   * To string.
   */
  toString(): string {
    return namedInstanceToString(this);
  }
}
