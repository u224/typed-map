/**
 * Instance.
 */
type Instance = {
  constructor: {name: string};
  name?: string;
};

/**
 * Class instance to string.
 *
 * @param instance
 */
export function namedInstanceToString(instance: Instance): string {
  return instance.name
    ? instance.constructor.name + `(${instance.name})`
    : instance.constructor.name;
}
