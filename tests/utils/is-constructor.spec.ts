import {expect} from 'chai';
import {isConstructor} from '../../src';

class TestClass {}

describe('isConstructor', () => {
  it('returns true if the value is a constructor', () => {
    expect(isConstructor(TestClass)).to.be.true;
  });

  it('returns false if the value is not a constructor', () => {
    expect(isConstructor(10)).to.be.false;
    expect(isConstructor('string')).to.be.false;
    expect(isConstructor(true)).to.be.false;
    expect(isConstructor({})).to.be.false;
    expect(isConstructor(() => 10)).to.be.false;
    expect(isConstructor(new TestClass())).to.be.false;
  });
});
