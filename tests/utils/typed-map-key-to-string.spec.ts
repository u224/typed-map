import {expect} from 'chai';
import {TypedKey} from '../../src';
import {typedMapKeyToString} from '../../src';

const TYPED_KEY = new TypedKey();
const NAMED_TYPED_KEY = new TypedKey('name');
class TestClass {}
const INSTANCE_KEY = new TestClass();
const STRING_KEY = 'key';
const NUMBER_KEY = 10;
const SYMBOL_KEY = Symbol();
const NAMED_SYMBOL_KEY = Symbol('name');
const TRUE_BOOLEAN_KEY = true;
const FALSE_BOOLEAN_KEY = false;
const OBJECT_KEY = {key: 'myName'};
const NO_PROTO_OBJECT_KEY = Object.create(null);

describe('typedMapKeyToString', () => {
  it('returns string representation', () => {
    expect(typedMapKeyToString(TYPED_KEY)).to.be.eq('TypedKey');
    expect(typedMapKeyToString(NAMED_TYPED_KEY)).to.be.eq('TypedKey(name)');
    expect(typedMapKeyToString(TestClass)).to.be.eq('TestClass');
    expect(typedMapKeyToString(INSTANCE_KEY)).to.be.eq('TestClass');
    expect(typedMapKeyToString(STRING_KEY)).to.be.eq('String(key)');
    expect(typedMapKeyToString(NUMBER_KEY)).to.be.eq('Number(10)');
    expect(typedMapKeyToString(SYMBOL_KEY)).to.be.eq('Symbol');
    expect(typedMapKeyToString(NAMED_SYMBOL_KEY)).to.be.eq('Symbol(name)');
    expect(typedMapKeyToString(TRUE_BOOLEAN_KEY)).to.be.eq('Boolean(true)');
    expect(typedMapKeyToString(FALSE_BOOLEAN_KEY)).to.be.eq('Boolean(false)');
    expect(typedMapKeyToString(OBJECT_KEY)).to.be.eq('Object');
    expect(typedMapKeyToString(NO_PROTO_OBJECT_KEY)).to.be.eq('Object');
  });
});
