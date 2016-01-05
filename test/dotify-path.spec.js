import expect from 'expect.js';
import dotifyPath from '../src/dotify-path';

describe('dotifyPath', () => {
  it('is a function', () => {
    expect(dotifyPath).to.be.a('function');
  });
  it('ignores empty path', () => {
    expect(dotifyPath('')).to.equal('');
  });
  it('ignores paths without [] wrapping', () => {
    const paths = ['a', 'a.b', 'a.b.c'];
    paths.forEach(path => expect(dotifyPath(path)).to.equal(path));
  });
  it('dotifies array of one dimension', () => {
    expect(dotifyPath('a[]')).to.equal('a.');
  });
  it('dotifies array of tow dimensions', () => {
    expect(dotifyPath('a[][]')).to.equal('a..');
  });
  it('dotifies array of three dimensions', () => {
    expect(dotifyPath('a[][][]')).to.equal('a...');
  });
  it('dotifies array of four dimensions', () => {
    expect(dotifyPath('a[][][][]')).to.equal('a....');
  });
});
