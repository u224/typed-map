import {expect} from 'chai';
import {TypedKey} from '../src';

describe('TypedKey', () => {
  describe('toString', () => {
    it('returns a string representation', () => {
      class TestKey<T> extends TypedKey<T> {}
      const testKey = new TestKey();
      const namedTestKey = new TestKey('named');
      expect(String(testKey)).to.be.eq('TestKey');
      expect(String(namedTestKey)).to.be.eq('TestKey(named)');
    });
  });
});
