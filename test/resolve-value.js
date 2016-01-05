import expect from 'expect.js';
import resolveValue from '../src/resolve-value';

describe('resolveValue', () => {
  it('is a function', () => {
    expect(resolveValue).to.be.a('function');
  });
  describe('one-depth', () => {
    describe('object', () => {
      it('resolves new property', () => {
        expect(resolveValue({}, 'a', 1)).to.eql({ a: 1 });
      });
      it('preserves existed properties if not to be resolved', () => {
        expect(resolveValue({ a: 1 }, 'b', 2)).to.eql({ a: 1, b: 2 });
      });
      it('overrides existed property if to be resolved', () => {
        expect(resolveValue({ a: 1, b: 2 }, 'b', 3)).to.eql({ a: 1, b: 3 });
      });
    })
    describe('array', () => {
      describe('empty string as index for push', () => {
        it('pushes new value to empty array', () => {
          expect(resolveValue([], '', 1)).to.eql([1]);
        });
        it('pushes new value to non-empty array', () => {
          expect(resolveValue([1], '', 2)).to.eql([1, 2]);
        });
      });
      describe('numeric string as specified index', () => {
        it('pushes new value to empty array with index \'0\'', () => {
          expect(resolveValue([], '0', 2)).to.eql([2]);
        });
        it('overrides existed item with index', () => {
          expect(resolveValue([1,2,4], '1', 3)).to.eql([1,3,4]);
        });
      });
    });
  })
});
