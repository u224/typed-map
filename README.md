# @u224/typed-map

A typed wrapper of the TypeScript Map.

## Overview

This library provides `TypedMap` and `TypedKey` classes:
- `TypedMap<K, V>` extends builtin `Map<K, V>` with special behaviour;
- `get` method throws `KeyNotFoundError` if a given key doesn't exist;
- `get` method returns `T` instead of `T | undefined`;
- `set` method expects `T` if a given key is `TypedKey<T>` or `Constructor<T>`;
- `get` method returns `T` if a given key is `TypedKey<T>` or `Constructor<T>`;

## Installation

```bash
npm install @u224/typed-map
```

## Usage

Value binding by the `TypedKey<T>`
```ts
import {TypedMap} from '@u224/typed-map';
import {TypedKey} from '@u224/typed-map';

// Create the map and typed key of a string value.
const map = new TypedMap();
const key = new TypedKey<string>('debugName');

// Bind the typed key to a string value.
// `set` method checks value type by the given key.
map.set(key, 'myValue');

// TypeError: Argument of type 'number' is not
// assignable to parameter of type 'string'.
map.set(key, 10);

// Return type of the `get` method will be
// inferred automatically by the given key.
const value = map.get(key);
```

Instance binding by its constructor.
```ts
class MyService {/* ... */}

// Same as before the `set` method checks
// value type by the given key.
map.set(MyService, new MyService());

// TypeError: Argument of type 'string' is not
// assignable to parameter of type 'MyService'.
map.set(MyService, 'aString');

// Return value will be inferred as MyService.
const value = map.get(MyService);
```

## Testing

```bash
npm run test
```

## License

MIT
