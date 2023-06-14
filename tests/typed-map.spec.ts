/* eslint @typescript-eslint/no-unused-vars: 0 */
import {expect} from 'chai';
import {describe} from 'mocha';
import {TypedMap} from '../src';
import {TypedKey} from '../src';
import {KeyNotFoundError} from '../src';

class DummyClass {
  protected prop = 'DummyClass' as const;
}

const STRING_VAL = 'string';
const NUMBER_VAL = 10;
const SYMBOL_VAL = Symbol();
const BOOLEAN_VAL = true;
const LITERAL_VAL = 'literal';
const OBJECT_VAL = {key: 'val'};
const FUNCTION_VAL = (param: string) => param;
const INSTANCE_VAL = new DummyClass();
const UNDEFINED_VAL = undefined;

const STRING_KEY = 'stringKey';
const SYMBOL_KEY = Symbol('symbolKey');
const NUMBER_KEY = 10;
const BOOLEAN_KEY = true;
const OBJECT_KEY = {key: 'objectKey', expire: 10};

const TYPED_UNKNOWN_KEY = new TypedKey<unknown>('unknownString');
const TYPED_STRING_KEY = new TypedKey<string>('string');
const TYPED_NUMBER_KEY = new TypedKey<number>('number');
const TYPED_BOOLEAN_KEY = new TypedKey<boolean>('boolean');
const TYPED_OBJECT_KEY = new TypedKey<typeof OBJECT_VAL>('dummyObject');
const TYPED_LITERAL_KEY = new TypedKey<'literal'>('stringLiteral');
const TYPED_INSTANCE_KEY = new TypedKey<DummyClass>('dummyClass');
const TYPED_FUNCTION_KEY = new TypedKey<typeof FUNCTION_VAL>('dummyFunction');
const TYPED_STR_OR_UNDEF_KEY = new TypedKey<string | undefined>('strOrUndef');

describe('TypedMap', () => {
  describe('get', () => {
    it('returns a value as unknown by a given non-typed key', () => {
      const typedMap = new TypedMap([
        [STRING_KEY, STRING_VAL],
        [SYMBOL_KEY, SYMBOL_VAL],
        [NUMBER_KEY, NUMBER_VAL],
        [BOOLEAN_KEY, BOOLEAN_VAL],
        [OBJECT_KEY, OBJECT_VAL],
      ]);
      const val1: unknown = typedMap.get(STRING_KEY);
      const val2: unknown = typedMap.get(SYMBOL_KEY);
      const val3: unknown = typedMap.get(NUMBER_KEY);
      const val4: unknown = typedMap.get(BOOLEAN_KEY);
      const val5: unknown = typedMap.get(OBJECT_KEY);
      expect(val1).to.be.eq(STRING_VAL);
      expect(val2).to.be.eq(SYMBOL_VAL);
      expect(val3).to.be.eq(NUMBER_VAL);
      expect(val4).to.be.eq(BOOLEAN_VAL);
      expect(val5).to.be.eq(OBJECT_VAL);
    });

    it('returns a value with inferred type by a given typed key', () => {
      const typedMap = new TypedMap([
        [TYPED_UNKNOWN_KEY, STRING_KEY],
        [TYPED_STRING_KEY, STRING_KEY],
        [TYPED_NUMBER_KEY, NUMBER_KEY],
        [TYPED_BOOLEAN_KEY, BOOLEAN_VAL],
        [TYPED_OBJECT_KEY, OBJECT_VAL],
        [TYPED_LITERAL_KEY, LITERAL_VAL],
        [TYPED_INSTANCE_KEY, INSTANCE_VAL],
        [TYPED_FUNCTION_KEY, FUNCTION_VAL],
        [TYPED_STR_OR_UNDEF_KEY, UNDEFINED_VAL],
      ]);
      const val1: unknown = typedMap.get(TYPED_UNKNOWN_KEY);
      const val2: string = typedMap.get(TYPED_STRING_KEY);
      const val3: number = typedMap.get(TYPED_NUMBER_KEY);
      const val4: boolean = typedMap.get(TYPED_BOOLEAN_KEY);
      const val5: typeof OBJECT_VAL = typedMap.get(TYPED_OBJECT_KEY);
      const val6: typeof LITERAL_VAL = typedMap.get(TYPED_LITERAL_KEY);
      const val7: DummyClass = typedMap.get(TYPED_INSTANCE_KEY);
      const val8: typeof FUNCTION_VAL = typedMap.get(TYPED_FUNCTION_KEY);
      const val9: string | undefined = typedMap.get(TYPED_STR_OR_UNDEF_KEY);
      expect(val1).to.be.eq(STRING_KEY);
      expect(val2).to.be.eq(STRING_KEY);
      expect(val3).to.be.eq(NUMBER_KEY);
      expect(val4).to.be.eq(BOOLEAN_VAL);
      expect(val5).to.be.eq(OBJECT_VAL);
      expect(val6).to.be.eq(LITERAL_VAL);
      expect(val7).to.be.eq(INSTANCE_VAL);
      expect(val8).to.be.eq(FUNCTION_VAL);
      expect(val9).to.be.eq(UNDEFINED_VAL);
    });

    it('returns an instance with inferred type by a given class key', () => {
      const typedMap = new TypedMap([[DummyClass, INSTANCE_VAL]]);
      const val: DummyClass = typedMap.get(DummyClass);
      expect(val).to.be.eq(INSTANCE_VAL);
    });

    it('throws an error if a given key is not bound', () => {
      const typedMap = new TypedMap();
      const throwable = () => typedMap.get('key');
      expect(throwable).to.throw(KeyNotFoundError);
    });
  });

  describe('has', () => {
    it('returns true as a boolean if a non-typed key is specified', () => {
      const typedMap = new TypedMap([
        [STRING_KEY, STRING_VAL],
        [SYMBOL_KEY, SYMBOL_VAL],
        [NUMBER_KEY, NUMBER_VAL],
        [BOOLEAN_KEY, BOOLEAN_VAL],
        [OBJECT_KEY, OBJECT_VAL],
      ]);
      const val1: boolean = typedMap.has(STRING_KEY);
      const val2: boolean = typedMap.has(SYMBOL_KEY);
      const val3: boolean = typedMap.has(NUMBER_KEY);
      const val4: boolean = typedMap.has(BOOLEAN_KEY);
      const val5: boolean = typedMap.has(OBJECT_KEY);
      expect(val1).to.be.true;
      expect(val2).to.be.true;
      expect(val3).to.be.true;
      expect(val4).to.be.true;
      expect(val5).to.be.true;
    });

    it('returns false as a boolean if a non-typed key is not specified', () => {
      const typedMap = new TypedMap();
      const val1: boolean = typedMap.has(STRING_KEY);
      const val2: boolean = typedMap.has(SYMBOL_KEY);
      const val3: boolean = typedMap.has(NUMBER_KEY);
      const val4: boolean = typedMap.has(BOOLEAN_KEY);
      const val5: boolean = typedMap.has(OBJECT_KEY);
      expect(val1).to.be.false;
      expect(val2).to.be.false;
      expect(val3).to.be.false;
      expect(val4).to.be.false;
      expect(val5).to.be.false;
    });

    it('returns true as a boolean if a typed key is specified', () => {
      const typedMap = new TypedMap([
        [TYPED_UNKNOWN_KEY, STRING_KEY],
        [TYPED_STRING_KEY, STRING_KEY],
        [TYPED_NUMBER_KEY, NUMBER_KEY],
        [TYPED_BOOLEAN_KEY, BOOLEAN_VAL],
        [TYPED_OBJECT_KEY, OBJECT_VAL],
        [TYPED_LITERAL_KEY, LITERAL_VAL],
        [TYPED_INSTANCE_KEY, INSTANCE_VAL],
        [TYPED_FUNCTION_KEY, FUNCTION_VAL],
        [TYPED_STR_OR_UNDEF_KEY, UNDEFINED_VAL],
      ]);
      const val1: boolean = typedMap.has(TYPED_UNKNOWN_KEY);
      const val2: boolean = typedMap.has(TYPED_STRING_KEY);
      const val3: boolean = typedMap.has(TYPED_NUMBER_KEY);
      const val4: boolean = typedMap.has(TYPED_BOOLEAN_KEY);
      const val5: boolean = typedMap.has(TYPED_OBJECT_KEY);
      const val6: boolean = typedMap.has(TYPED_LITERAL_KEY);
      const val7: boolean = typedMap.has(TYPED_INSTANCE_KEY);
      const val8: boolean = typedMap.has(TYPED_FUNCTION_KEY);
      const val9: boolean = typedMap.has(TYPED_STR_OR_UNDEF_KEY);
      expect(val1).to.be.true;
      expect(val2).to.be.true;
      expect(val3).to.be.true;
      expect(val4).to.be.true;
      expect(val5).to.be.true;
      expect(val6).to.be.true;
      expect(val7).to.be.true;
      expect(val8).to.be.true;
      expect(val9).to.be.true;
    });

    it('returns false as a boolean if a typed key is not specified', () => {
      const typedMap = new TypedMap();
      const val1: boolean = typedMap.has(TYPED_UNKNOWN_KEY);
      const val2: boolean = typedMap.has(TYPED_STRING_KEY);
      const val3: boolean = typedMap.has(TYPED_NUMBER_KEY);
      const val4: boolean = typedMap.has(TYPED_BOOLEAN_KEY);
      const val5: boolean = typedMap.has(TYPED_OBJECT_KEY);
      const val6: boolean = typedMap.has(TYPED_LITERAL_KEY);
      const val7: boolean = typedMap.has(TYPED_INSTANCE_KEY);
      const val8: boolean = typedMap.has(TYPED_FUNCTION_KEY);
      const val9: boolean = typedMap.has(TYPED_STR_OR_UNDEF_KEY);
      expect(val1).to.be.false;
      expect(val2).to.be.false;
      expect(val3).to.be.false;
      expect(val4).to.be.false;
      expect(val5).to.be.false;
      expect(val6).to.be.false;
      expect(val7).to.be.false;
      expect(val8).to.be.false;
      expect(val9).to.be.false;
    });

    it('returns true as a boolean if a class key is specified', () => {
      const typedMap = new TypedMap([[DummyClass, INSTANCE_VAL]]);
      const val: boolean = typedMap.has(DummyClass);
      expect(val).to.be.true;
    });

    it('returns false as a boolean if a class key is not specified', () => {
      const typedMap = new TypedMap();
      const val: boolean = typedMap.has(DummyClass);
      expect(val).to.be.false;
    });
  });

  describe('set', () => {
    it('binds a given non-typed key to a value and return itself', () => {
      const typedMap = new TypedMap();
      const val1: TypedMap = typedMap.set(STRING_KEY, STRING_VAL);
      const val2: TypedMap = typedMap.set(SYMBOL_KEY, SYMBOL_VAL);
      const val3: TypedMap = typedMap.set(NUMBER_KEY, NUMBER_VAL);
      const val4: TypedMap = typedMap.set(BOOLEAN_KEY, BOOLEAN_VAL);
      const val5: TypedMap = typedMap.set(OBJECT_KEY, OBJECT_VAL);
      expect(val1).to.be.eq(typedMap);
      expect(val2).to.be.eq(typedMap);
      expect(val3).to.be.eq(typedMap);
      expect(val4).to.be.eq(typedMap);
      expect(val5).to.be.eq(typedMap);
    });

    it('binds a given typed key to a value and return itself', () => {
      const typedMap = new TypedMap();
      const val1: TypedMap = typedMap.set(TYPED_UNKNOWN_KEY, STRING_KEY);
      const val2: TypedMap = typedMap.set(TYPED_STRING_KEY, STRING_KEY);
      const val3: TypedMap = typedMap.set(TYPED_NUMBER_KEY, NUMBER_KEY);
      const val4: TypedMap = typedMap.set(TYPED_BOOLEAN_KEY, BOOLEAN_VAL);
      const val5: TypedMap = typedMap.set(TYPED_OBJECT_KEY, OBJECT_VAL);
      const val6: TypedMap = typedMap.set(TYPED_LITERAL_KEY, LITERAL_VAL);
      const val7: TypedMap = typedMap.set(TYPED_INSTANCE_KEY, INSTANCE_VAL);
      const val8: TypedMap = typedMap.set(TYPED_FUNCTION_KEY, FUNCTION_VAL);
      const val9: TypedMap = typedMap.set(TYPED_STR_OR_UNDEF_KEY, UNDEFINED_VAL);
      expect(val1).to.be.eq(typedMap);
      expect(val2).to.be.eq(typedMap);
      expect(val3).to.be.eq(typedMap);
      expect(val4).to.be.eq(typedMap);
      expect(val5).to.be.eq(typedMap);
      expect(val6).to.be.eq(typedMap);
      expect(val7).to.be.eq(typedMap);
      expect(val8).to.be.eq(typedMap);
      expect(val9).to.be.eq(typedMap);
    });

    it('binds a given class key to an instance and return itself', () => {
      const typedMap = new TypedMap();
      const val: TypedMap = typedMap.set(DummyClass, INSTANCE_VAL);
      expect(val).to.be.eq(typedMap);
    });

    describe('constructor', () => {
      it('allows to specify type of TypedMap<unknown, unknown>', () => {
        const map = new TypedMap();
        map.set(STRING_KEY, STRING_VAL);
        map.set(SYMBOL_KEY, STRING_VAL);
        map.set(NUMBER_KEY, STRING_VAL);
        map.set(BOOLEAN_KEY, STRING_VAL);
        map.set(OBJECT_KEY, STRING_VAL);
        map.set(TYPED_UNKNOWN_KEY, STRING_VAL);
        map.set(TYPED_STRING_KEY, STRING_VAL);
        map.set(TYPED_NUMBER_KEY, NUMBER_VAL);
        map.set(TYPED_BOOLEAN_KEY, BOOLEAN_VAL);
        map.set(TYPED_OBJECT_KEY, OBJECT_VAL);
        map.set(TYPED_LITERAL_KEY, LITERAL_VAL);
        map.set(TYPED_INSTANCE_KEY, INSTANCE_VAL);
        map.set(TYPED_FUNCTION_KEY, FUNCTION_VAL);
        map.set(TYPED_STR_OR_UNDEF_KEY, UNDEFINED_VAL);
        map.set(TYPED_STR_OR_UNDEF_KEY, STRING_VAL);
        const has01: boolean = map.has(STRING_KEY);
        const has02: boolean = map.has(SYMBOL_KEY);
        const has03: boolean = map.has(NUMBER_KEY);
        const has04: boolean = map.has(BOOLEAN_KEY);
        const has05: boolean = map.has(OBJECT_KEY);
        const has06: boolean = map.has(TYPED_UNKNOWN_KEY);
        const has07: boolean = map.has(TYPED_STRING_KEY);
        const has08: boolean = map.has(TYPED_NUMBER_KEY);
        const has09: boolean = map.has(TYPED_BOOLEAN_KEY);
        const has10: boolean = map.has(TYPED_OBJECT_KEY);
        const has11: boolean = map.has(TYPED_LITERAL_KEY);
        const has12: boolean = map.has(TYPED_INSTANCE_KEY);
        const has13: boolean = map.has(TYPED_FUNCTION_KEY);
        const has14: boolean = map.has(TYPED_STR_OR_UNDEF_KEY);
        const has15: boolean = map.has(TYPED_STR_OR_UNDEF_KEY);
        const val01: unknown = map.get(STRING_KEY);
        const val02: unknown = map.get(SYMBOL_KEY);
        const val03: unknown = map.get(NUMBER_KEY);
        const val04: unknown = map.get(BOOLEAN_KEY);
        const val05: unknown = map.get(OBJECT_KEY);
        const val06: unknown = map.get(TYPED_UNKNOWN_KEY);
        const val07: string = map.get(TYPED_STRING_KEY);
        const val08: number = map.get(TYPED_NUMBER_KEY);
        const val09: boolean = map.get(TYPED_BOOLEAN_KEY);
        const val10: {key: string} = map.get(TYPED_OBJECT_KEY);
        const val11: typeof LITERAL_VAL = map.get(TYPED_LITERAL_KEY);
        const val12: DummyClass = map.get(TYPED_INSTANCE_KEY);
        const val13: typeof FUNCTION_VAL = map.get(TYPED_FUNCTION_KEY);
        const val14: string | undefined = map.get(TYPED_STR_OR_UNDEF_KEY);
      });

      it('allows to specify type of TypedMap<string, unknown>', () => {
        const map = new TypedMap<string, unknown>();
        map.set(STRING_KEY, STRING_VAL);
        map.set(STRING_KEY, NUMBER_VAL);
        map.set(STRING_KEY, BOOLEAN_VAL);
        map.set(STRING_KEY, OBJECT_VAL);
        map.set(STRING_KEY, LITERAL_VAL);
        map.set(STRING_KEY, INSTANCE_VAL);
        map.set(STRING_KEY, FUNCTION_VAL);
        map.set(STRING_KEY, UNDEFINED_VAL);
        map.set(STRING_KEY, STRING_VAL);
        const has: boolean = map.has(STRING_KEY);
        const val: unknown = map.get(STRING_KEY);
      });

      it('allows to specify type of TypedMap<symbol, unknown>', () => {
        const map = new TypedMap<symbol, unknown>();
        map.set(SYMBOL_KEY, STRING_VAL);
        map.set(SYMBOL_KEY, NUMBER_VAL);
        map.set(SYMBOL_KEY, BOOLEAN_VAL);
        map.set(SYMBOL_KEY, OBJECT_VAL);
        map.set(SYMBOL_KEY, LITERAL_VAL);
        map.set(SYMBOL_KEY, INSTANCE_VAL);
        map.set(SYMBOL_KEY, FUNCTION_VAL);
        map.set(SYMBOL_KEY, UNDEFINED_VAL);
        map.set(SYMBOL_KEY, STRING_VAL);
        const has: boolean = map.has(SYMBOL_KEY);
        const val: unknown = map.get(SYMBOL_KEY);
      });

      it('allows to specify type of TypedMap<number, unknown>', () => {
        const map = new TypedMap<number, unknown>();
        map.set(NUMBER_KEY, STRING_VAL);
        map.set(NUMBER_KEY, NUMBER_VAL);
        map.set(NUMBER_KEY, BOOLEAN_VAL);
        map.set(NUMBER_KEY, OBJECT_VAL);
        map.set(NUMBER_KEY, LITERAL_VAL);
        map.set(NUMBER_KEY, INSTANCE_VAL);
        map.set(NUMBER_KEY, FUNCTION_VAL);
        map.set(NUMBER_KEY, UNDEFINED_VAL);
        map.set(NUMBER_KEY, STRING_VAL);
        const has: boolean = map.has(NUMBER_KEY);
        const val: unknown = map.get(NUMBER_KEY);
      });

      it('allows to specify type of TypedMap<boolean, unknown>', () => {
        const map = new TypedMap<boolean, unknown>();
        map.set(BOOLEAN_KEY, STRING_VAL);
        map.set(BOOLEAN_KEY, NUMBER_VAL);
        map.set(BOOLEAN_KEY, BOOLEAN_VAL);
        map.set(BOOLEAN_KEY, OBJECT_VAL);
        map.set(BOOLEAN_KEY, LITERAL_VAL);
        map.set(BOOLEAN_KEY, INSTANCE_VAL);
        map.set(BOOLEAN_KEY, FUNCTION_VAL);
        map.set(BOOLEAN_KEY, UNDEFINED_VAL);
        map.set(BOOLEAN_KEY, STRING_VAL);
        const has: boolean = map.has(BOOLEAN_KEY);
        const val: unknown = map.get(BOOLEAN_KEY);
      });

      it('allows to specify type of TypedMap<object, unknown>', () => {
        const map = new TypedMap<object, unknown>();
        map.set(OBJECT_KEY, STRING_VAL);
        map.set(OBJECT_KEY, NUMBER_VAL);
        map.set(OBJECT_KEY, BOOLEAN_VAL);
        map.set(OBJECT_KEY, OBJECT_VAL);
        map.set(OBJECT_KEY, LITERAL_VAL);
        map.set(OBJECT_KEY, INSTANCE_VAL);
        map.set(OBJECT_KEY, FUNCTION_VAL);
        map.set(OBJECT_KEY, UNDEFINED_VAL);
        map.set(OBJECT_KEY, STRING_VAL);
        const has: boolean = map.has(OBJECT_KEY);
        const val: unknown = map.get(OBJECT_KEY);
      });

      it('allows to specify type of TypedMap<TypedKey<unknown>, unknown>', () => {
        const map = new TypedMap<typeof TYPED_UNKNOWN_KEY, unknown>();
        map.set(TYPED_UNKNOWN_KEY, STRING_VAL);
        map.set(TYPED_UNKNOWN_KEY, NUMBER_VAL);
        map.set(TYPED_UNKNOWN_KEY, BOOLEAN_VAL);
        map.set(TYPED_UNKNOWN_KEY, OBJECT_VAL);
        map.set(TYPED_UNKNOWN_KEY, LITERAL_VAL);
        map.set(TYPED_UNKNOWN_KEY, INSTANCE_VAL);
        map.set(TYPED_UNKNOWN_KEY, FUNCTION_VAL);
        map.set(TYPED_UNKNOWN_KEY, UNDEFINED_VAL);
        map.set(TYPED_UNKNOWN_KEY, STRING_VAL);
        const has: boolean = map.has(TYPED_UNKNOWN_KEY);
        const val: unknown = map.get(TYPED_UNKNOWN_KEY);
      });

      it('allows to specify type of TypedMap<TypedKey<string>, string>', () => {
        const map = new TypedMap<typeof TYPED_STRING_KEY, string>();
        map.set(TYPED_STRING_KEY, STRING_VAL);
        map.set(TYPED_STRING_KEY, LITERAL_VAL);
        const has: boolean = map.has(TYPED_STRING_KEY);
        const val: string = map.get(TYPED_STRING_KEY);
      });

      it('allows to specify type of TypedMap<TypedKey<number>, string>', () => {
        const map = new TypedMap<typeof TYPED_NUMBER_KEY, number>();
        map.set(TYPED_NUMBER_KEY, NUMBER_VAL);
        const has: boolean = map.has(TYPED_NUMBER_KEY);
        const val: number = map.get(TYPED_NUMBER_KEY);
      });

      it('allows to specify type of TypedMap<TypedKey<boolean>, boolean>', () => {
        const map = new TypedMap<typeof TYPED_BOOLEAN_KEY, boolean>();
        map.set(TYPED_BOOLEAN_KEY, BOOLEAN_VAL);
        const has: boolean = map.has(TYPED_BOOLEAN_KEY);
        const val: boolean = map.get(TYPED_BOOLEAN_KEY);
      });

      it('allows to specify type of TypedMap<TypedKey<object>, object>', () => {
        const map = new TypedMap<typeof TYPED_OBJECT_KEY, typeof OBJECT_VAL>();
        map.set(TYPED_OBJECT_KEY, OBJECT_VAL);
        const has: boolean = map.has(TYPED_OBJECT_KEY);
        const val: typeof OBJECT_VAL = map.get(TYPED_OBJECT_KEY);
      });

      it("allows to specify type of TypedMap<TypedKey<'literal'>, 'literal'>", () => {
        const map = new TypedMap<typeof TYPED_LITERAL_KEY, typeof LITERAL_VAL>();
        map.set(TYPED_LITERAL_KEY, LITERAL_VAL);
        const has: boolean = map.has(TYPED_LITERAL_KEY);
        const val: typeof LITERAL_VAL = map.get(TYPED_LITERAL_KEY);
      });

      it('allows to specify type of TypedMap<TypedKey<DummyClass>, DummyClass>', () => {
        const map = new TypedMap<typeof TYPED_INSTANCE_KEY, DummyClass>();
        map.set(TYPED_INSTANCE_KEY, INSTANCE_VAL);
        const has: boolean = map.has(TYPED_INSTANCE_KEY);
        const val: DummyClass = map.get(TYPED_INSTANCE_KEY);
      });

      it('allows to specify type of TypedMap<TypedKey<Function>, Function>', () => {
        const map = new TypedMap<typeof TYPED_FUNCTION_KEY, typeof FUNCTION_VAL>();
        map.set(TYPED_FUNCTION_KEY, FUNCTION_VAL);
        const has: boolean = map.has(TYPED_FUNCTION_KEY);
        const val: typeof FUNCTION_VAL = map.get(TYPED_FUNCTION_KEY);
      });

      it('allows to specify type of TypedMap<string | undefined>, string | undefined>', () => {
        const map = new TypedMap<typeof TYPED_STR_OR_UNDEF_KEY, string | undefined>();
        map.set(TYPED_STR_OR_UNDEF_KEY, STRING_KEY);
        map.set(TYPED_STR_OR_UNDEF_KEY, UNDEFINED_VAL);
        const has: boolean = map.has(TYPED_STR_OR_UNDEF_KEY);
        const val: string | undefined = map.get(TYPED_STR_OR_UNDEF_KEY);
      });
    });
  });
});
