import {expect} from 'chai';
import {TypedKey} from '../src';
import {TypedMapKey} from '../src';

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

const STRING_FROM = TypedMapKey.stringFrom;

describe('TypedMapKey', () => {
  describe('stringFrom', () => {
    it('returns string representation', () => {
      expect(STRING_FROM(TYPED_KEY)).to.be.eq('TypedKey');
      expect(STRING_FROM(NAMED_TYPED_KEY)).to.be.eq('TypedKey(name)');
      expect(STRING_FROM(new TestClass())).to.be.eq('TestClass');
      expect(STRING_FROM(INSTANCE_KEY)).to.be.eq('TestClass');
      expect(STRING_FROM(STRING_KEY)).to.be.eq('String(key)');
      expect(STRING_FROM(NUMBER_KEY)).to.be.eq('Number(10)');
      expect(STRING_FROM(SYMBOL_KEY)).to.be.eq('Symbol');
      expect(STRING_FROM(NAMED_SYMBOL_KEY)).to.be.eq('Symbol(name)');
      expect(STRING_FROM(TRUE_BOOLEAN_KEY)).to.be.eq('Boolean(true)');
      expect(STRING_FROM(FALSE_BOOLEAN_KEY)).to.be.eq('Boolean(false)');
      expect(STRING_FROM(OBJECT_KEY)).to.be.eq('Object');
    });
  });
});
