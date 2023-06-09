import {expect} from 'chai';
import {describe} from 'mocha';
import {TypedMap} from '../src';
import {TypedKey} from '../src';
import {KeyNotFoundError} from '../src';

class DummyClass {
  protected nameProp = 'DummyClass' as const;
}

const DUMMY_INSTANCE = new DummyClass();
const DUMMY_OBJECT = {key: 'val'};
const DUMMY_FUNCTION = (param: string) => param;

const STRING_KEY = 'stringKey';
const SYMBOL_KEY = Symbol('symbolKey');
const NUMBER_KEY = 10;
const BOOLEAN_KEY = true;
const OBJECT_KEY = {key: 'objectKey', expire: 10};

const TYPED_UNKNOWN_KEY = new TypedKey<unknown>('unknownString');
const TYPED_STRING_KEY = new TypedKey<string>('string');
const TYPED_NUMBER_KEY = new TypedKey<number>('number');
const TYPED_BOOLEAN_KEY = new TypedKey<boolean>('boolean');
const TYPED_OBJECT_KEY = new TypedKey<typeof DUMMY_OBJECT>('dummyObject');
const TYPED_LITERAL_KEY = new TypedKey<'literal'>('stringLiteral');
const TYPED_INSTANCE_KEY = new TypedKey<DummyClass>('dummyClass');
const TYPED_FUNCTION_KEY = new TypedKey<typeof DUMMY_FUNCTION>('dummyFunction');
const TYPED_STR_OR_UNDEF_KEY = new TypedKey<string | undefined>('strOrUndef');

describe('TypedMap', () => {
  describe('constructor', () => {
    it('allows to specify generic type for a map key and its value', () => {
      new TypedMap();
      new TypedMap<string, unknown>();
      new TypedMap<symbol, unknown>();
      new TypedMap<number, unknown>();
      new TypedMap<boolean, unknown>();
      new TypedMap<object, unknown>();
      new TypedMap<typeof TYPED_UNKNOWN_KEY, unknown>();
      new TypedMap<typeof TYPED_STRING_KEY, string>();
      new TypedMap<typeof TYPED_NUMBER_KEY, number>();
      new TypedMap<typeof TYPED_BOOLEAN_KEY, boolean>();
      new TypedMap<typeof TYPED_OBJECT_KEY, typeof DUMMY_OBJECT>();
      new TypedMap<typeof TYPED_LITERAL_KEY, 'literal'>();
      new TypedMap<typeof TYPED_INSTANCE_KEY, typeof DUMMY_INSTANCE>();
      new TypedMap<typeof TYPED_FUNCTION_KEY, typeof DUMMY_FUNCTION>();
      new TypedMap<typeof TYPED_STR_OR_UNDEF_KEY, string | undefined>();
    });
  });

  describe('get', () => {
    it('returns a value as unknown by a given non-typed key', () => {
      const typedMap = new TypedMap([
        [STRING_KEY, 'a'],
        [SYMBOL_KEY, 'b'],
        [NUMBER_KEY, 'c'],
        [BOOLEAN_KEY, 'd'],
        [OBJECT_KEY, 'e'],
      ]);
      const val1: unknown = typedMap.get(STRING_KEY);
      const val2: unknown = typedMap.get(SYMBOL_KEY);
      const val3: unknown = typedMap.get(NUMBER_KEY);
      const val4: unknown = typedMap.get(BOOLEAN_KEY);
      const val5: unknown = typedMap.get(OBJECT_KEY);
      expect(val1).to.be.eq('a');
      expect(val2).to.be.eq('b');
      expect(val3).to.be.eq('c');
      expect(val4).to.be.eq('d');
      expect(val5).to.be.eq('e');
    });

    it('returns a value with inferred type by a given typed key', () => {
      const typedMap = new TypedMap([
        [TYPED_UNKNOWN_KEY, 'string'],
        [TYPED_STRING_KEY, 'string'],
        [TYPED_NUMBER_KEY, 10],
        [TYPED_BOOLEAN_KEY, true],
        [TYPED_OBJECT_KEY, DUMMY_OBJECT],
        [TYPED_LITERAL_KEY, 'literal'],
        [TYPED_INSTANCE_KEY, DUMMY_INSTANCE],
        [TYPED_FUNCTION_KEY, DUMMY_FUNCTION],
        [TYPED_STR_OR_UNDEF_KEY, undefined],
      ]);
      const val1: unknown = typedMap.get(TYPED_UNKNOWN_KEY);
      const val2: string = typedMap.get(TYPED_STRING_KEY);
      const val3: number = typedMap.get(TYPED_NUMBER_KEY);
      const val4: boolean = typedMap.get(TYPED_BOOLEAN_KEY);
      const val5: typeof DUMMY_OBJECT = typedMap.get(TYPED_OBJECT_KEY);
      const val6: 'literal' = typedMap.get(TYPED_LITERAL_KEY);
      const val7: DummyClass = typedMap.get(TYPED_INSTANCE_KEY);
      const val8: typeof DUMMY_FUNCTION = typedMap.get(TYPED_FUNCTION_KEY);
      const val9: string | undefined = typedMap.get(TYPED_STR_OR_UNDEF_KEY);
      expect(val1).to.be.eq('string');
      expect(val2).to.be.eq('string');
      expect(val3).to.be.eq(10);
      expect(val4).to.be.eq(true);
      expect(val5).to.be.eq(DUMMY_OBJECT);
      expect(val6).to.be.eq('literal');
      expect(val7).to.be.eq(DUMMY_INSTANCE);
      expect(val8).to.be.eq(DUMMY_FUNCTION);
      expect(val9).to.be.undefined;
    });

    it('returns an instance with inferred type by a given class key', () => {
      const typedMap = new TypedMap([[DummyClass, DUMMY_INSTANCE]]);
      const val: DummyClass = typedMap.get(DummyClass);
      expect(val).to.be.eq(DUMMY_INSTANCE);
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
        [STRING_KEY, 'b'],
        [SYMBOL_KEY, 'c'],
        [NUMBER_KEY, 'd'],
        [BOOLEAN_KEY, 'e'],
        [OBJECT_KEY, 'f'],
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
        [TYPED_UNKNOWN_KEY, 'string'],
        [TYPED_STRING_KEY, 'string'],
        [TYPED_NUMBER_KEY, 10],
        [TYPED_BOOLEAN_KEY, true],
        [TYPED_OBJECT_KEY, DUMMY_OBJECT],
        [TYPED_LITERAL_KEY, 'literal'],
        [TYPED_INSTANCE_KEY, DUMMY_INSTANCE],
        [TYPED_FUNCTION_KEY, DUMMY_FUNCTION],
        [TYPED_STR_OR_UNDEF_KEY, undefined],
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
      const typedMap = new TypedMap([[DummyClass, DUMMY_INSTANCE]]);
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
      const val1: TypedMap = typedMap.set(STRING_KEY, 'b');
      const val2: TypedMap = typedMap.set(SYMBOL_KEY, 'c');
      const val3: TypedMap = typedMap.set(NUMBER_KEY, 'd');
      const val4: TypedMap = typedMap.set(BOOLEAN_KEY, 'e');
      const val5: TypedMap = typedMap.set(OBJECT_KEY, 'f');
      expect(val1).to.be.eq(typedMap);
      expect(val2).to.be.eq(typedMap);
      expect(val3).to.be.eq(typedMap);
      expect(val4).to.be.eq(typedMap);
      expect(val5).to.be.eq(typedMap);
    });

    it('binds a given typed key to a value and return itself', () => {
      const typedMap = new TypedMap();
      const val1: TypedMap = typedMap.set(TYPED_UNKNOWN_KEY, 'string');
      const val2: TypedMap = typedMap.set(TYPED_STRING_KEY, 'string');
      const val3: TypedMap = typedMap.set(TYPED_NUMBER_KEY, 10);
      const val4: TypedMap = typedMap.set(TYPED_BOOLEAN_KEY, true);
      const val5: TypedMap = typedMap.set(TYPED_OBJECT_KEY, DUMMY_OBJECT);
      const val6: TypedMap = typedMap.set(TYPED_LITERAL_KEY, 'literal');
      const val7: TypedMap = typedMap.set(TYPED_INSTANCE_KEY, DUMMY_INSTANCE);
      const val8: TypedMap = typedMap.set(TYPED_FUNCTION_KEY, DUMMY_FUNCTION);
      const val9: TypedMap = typedMap.set(TYPED_STR_OR_UNDEF_KEY, undefined);
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
      const val: TypedMap = typedMap.set(DummyClass, DUMMY_INSTANCE);
      expect(val).to.be.eq(typedMap);
    });
  });
});
