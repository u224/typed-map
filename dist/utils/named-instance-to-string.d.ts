/**
 * Instance.
 */
type Instance = {
    constructor: {
        name: string;
    };
    name?: string;
};
/**
 * Class instance to string.
 *
 * @param instance
 */
export declare function namedInstanceToString(instance: Instance): string;
export {};
