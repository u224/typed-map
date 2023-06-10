import {expect} from 'chai';
import {namedInstanceToString} from '../../src';

describe('namedInstanceToString', () => {
  it('returns a string representation of an instance', () => {
    class TestClass {}
    const instance = new TestClass();
    const value = namedInstanceToString(instance);
    expect(value).to.be.eq('TestClass');
  });

  it('returns a string representation of a named instance', () => {
    class NamedClass {
      constructor(readonly name: string) {}
    }
    const instance = new NamedClass('foo');
    const value = namedInstanceToString(instance);
    expect(value).to.be.eq('NamedClass(foo)');
  });
});
