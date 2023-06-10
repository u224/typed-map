import { Constructor } from './types';
import { TypedKey } from './typed-key';
/**
 * Typed key or any.
 */
export declare type TypedMapKey<T = unknown> = TypedKey<T> | Constructor<T> | string | symbol | number | boolean | object;
/**
 * Typed map key (utils).
 */
export declare const TypedMapKey: {
    /**
     * String from.
     *
     * @param key
     */
    readonly stringFrom: <T>(key: TypedMapKey<T>) => string;
};
