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
      it('allows to specify generic type for a map key and its value', () => {
        // TypedMap<unknown, unknown>
        const uuMap = new TypedMap();
        uuMap.set(STRING_KEY, STRING_VAL);
        uuMap.set(SYMBOL_KEY, STRING_VAL);
        uuMap.set(NUMBER_KEY, STRING_VAL);
        uuMap.set(BOOLEAN_KEY, STRING_VAL);
        uuMap.set(OBJECT_KEY, STRING_VAL);
        uuMap.set(TYPED_UNKNOWN_KEY, STRING_VAL);
        uuMap.set(TYPED_STRING_KEY, STRING_VAL);
        uuMap.set(TYPED_NUMBER_KEY, NUMBER_VAL);
        uuMap.set(TYPED_BOOLEAN_KEY, BOOLEAN_VAL);
        uuMap.set(TYPED_OBJECT_KEY, OBJECT_VAL);
        uuMap.set(TYPED_LITERAL_KEY, LITERAL_VAL);
        uuMap.set(TYPED_INSTANCE_KEY, INSTANCE_VAL);
        uuMap.set(TYPED_FUNCTION_KEY, FUNCTION_VAL);
        uuMap.set(TYPED_STR_OR_UNDEF_KEY, UNDEFINED_VAL);
        uuMap.set(TYPED_STR_OR_UNDEF_KEY, STRING_VAL);
        const uuVal01: unknown = uuMap.get(STRING_KEY);
        const uuVal02: unknown = uuMap.get(SYMBOL_KEY);
        const uuVal03: unknown = uuMap.get(NUMBER_KEY);
        const uuVal04: unknown = uuMap.get(BOOLEAN_KEY);
        const uuVal05: unknown = uuMap.get(OBJECT_KEY);
        const uuVal06: unknown = uuMap.get(TYPED_UNKNOWN_KEY);
        const uuVal07: string = uuMap.get(TYPED_STRING_KEY);
        const uuVal08: number = uuMap.get(TYPED_NUMBER_KEY);
        const uuVal09: boolean = uuMap.get(TYPED_BOOLEAN_KEY);
        const uuVal10: {key: string} = uuMap.get(TYPED_OBJECT_KEY);
        const uuVal11: typeof LITERAL_VAL = uuMap.get(TYPED_LITERAL_KEY);
        const uuVal12: DummyClass = uuMap.get(TYPED_INSTANCE_KEY);
        const uuVal13: typeof FUNCTION_VAL = uuMap.get(TYPED_FUNCTION_KEY);
        const uuVal14: string | undefined = uuMap.get(TYPED_STR_OR_UNDEF_KEY);
        // TypedMap<string, unknown>
        const suMap = new TypedMap<string, unknown>();
        suMap.set(STRING_KEY, STRING_VAL);
        const suVal: unknown = suMap.get(STRING_KEY);
        // TypedMap<symbol, unknown>
        const syuMap = new TypedMap<symbol, unknown>();
        syuMap.set(SYMBOL_KEY, STRING_VAL);
        const syuVal: unknown = syuMap.get(SYMBOL_KEY);
        // TypedMap<number, unknown>
        const nuMap = new TypedMap<number, unknown>();
        nuMap.set(NUMBER_KEY, STRING_VAL);
        const nuVal: unknown = nuMap.get(NUMBER_KEY);
        // TypedMap<boolean, unknown>
        const buMap = new TypedMap<boolean, unknown>();
        buMap.set(BOOLEAN_KEY, STRING_VAL);
        const buVal: unknown = buMap.get(BOOLEAN_KEY);
        // TypedMap<object, unknown>
        const ouMap = new TypedMap<object, unknown>();
        ouMap.set(OBJECT_KEY, STRING_VAL);
        const ouVal: unknown = ouMap.get(OBJECT_KEY);
        // TypedMap<TypedKey<unknown>, unknown>
        const tuuMap = new TypedMap<typeof TYPED_UNKNOWN_KEY, unknown>();
        tuuMap.set(TYPED_UNKNOWN_KEY, STRING_VAL);
        tuuMap.set(TYPED_UNKNOWN_KEY, NUMBER_VAL);
        tuuMap.set(TYPED_UNKNOWN_KEY, BOOLEAN_VAL);
        tuuMap.set(TYPED_UNKNOWN_KEY, OBJECT_VAL);
        tuuMap.set(TYPED_UNKNOWN_KEY, LITERAL_VAL);
        tuuMap.set(TYPED_UNKNOWN_KEY, INSTANCE_VAL);
        tuuMap.set(TYPED_UNKNOWN_KEY, FUNCTION_VAL);
        tuuMap.set(TYPED_UNKNOWN_KEY, UNDEFINED_VAL);
        tuuMap.set(TYPED_UNKNOWN_KEY, STRING_VAL);
        const tuuVal: unknown = uuMap.get(TYPED_UNKNOWN_KEY);
        // TypedMap<TypedKey<string>, string>
        const tssMap = new TypedMap<typeof TYPED_STRING_KEY, string>();
        tssMap.set(TYPED_STRING_KEY, STRING_VAL);
        const tssVal: string = uuMap.get(TYPED_STRING_KEY);
        // TypedMap<TypedKey<string>, string>
        const tnnMap = new TypedMap<typeof TYPED_NUMBER_KEY, number>();
        tnnMap.set(TYPED_NUMBER_KEY, NUMBER_VAL);
        const tnnVal: number = tnnMap.get(TYPED_NUMBER_KEY);
        // TypedMap<TypedKey<boolean>, boolean>
        const tbbMap = new TypedMap<typeof TYPED_BOOLEAN_KEY, boolean>();
        tbbMap.set(TYPED_BOOLEAN_KEY, BOOLEAN_VAL);
        const tbbVal: boolean = tbbMap.get(TYPED_BOOLEAN_KEY);
        // TypedMap<TypedKey<{key: string}>, {key: string}>
        const tooMap = new TypedMap<typeof TYPED_OBJECT_KEY, typeof OBJECT_VAL>();
        tooMap.set(TYPED_OBJECT_KEY, OBJECT_VAL);
        const tooVal: typeof OBJECT_VAL = tooMap.get(TYPED_OBJECT_KEY);
        // TypedMap<TypedKey<'literal'>, 'literal'>
        const tllMap = new TypedMap<typeof TYPED_LITERAL_KEY, typeof LITERAL_VAL>();
        tllMap.set(TYPED_LITERAL_KEY, LITERAL_VAL);
        const tllVal: typeof LITERAL_VAL = tllMap.get(TYPED_LITERAL_KEY);
        // TypedMap<TypedKey<DummyClass>, DummyClass>
        const tiiMap = new TypedMap<typeof TYPED_INSTANCE_KEY, typeof INSTANCE_VAL>();
        tiiMap.set(TYPED_INSTANCE_KEY, INSTANCE_VAL);
        const tiiVal = tiiMap.get(TYPED_INSTANCE_KEY);
        // TypedMap<TypedKey<(param: string) => string>, (param: string) => string>
        const kffMap = new TypedMap<typeof TYPED_FUNCTION_KEY, typeof FUNCTION_VAL>();
        kffMap.set(TYPED_FUNCTION_KEY, FUNCTION_VAL);
        const kffVal = kffMap.get(TYPED_FUNCTION_KEY);
        // TypedMap<string | undefined>, string | undefined>
        const tsuMap = new TypedMap<typeof TYPED_STR_OR_UNDEF_KEY, string | undefined>();
        tsuMap.set(TYPED_STR_OR_UNDEF_KEY, STRING_KEY);
        tsuMap.set(TYPED_STR_OR_UNDEF_KEY, UNDEFINED_VAL);
        const tsuVal: string | undefined = tsuMap.get(TYPED_STR_OR_UNDEF_KEY);
      });
    });
  });
});
