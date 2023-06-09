/**
 * Typed key.
 */
export declare class TypedKey<T> {
    readonly name?: string | undefined;
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
    protected _?: T;
    /**
     * Constructor.
     *
     * @param name
     */
    constructor(name?: string | undefined);
    /**
     * To string.
     */
    toString(): string;
}
