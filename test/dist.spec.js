import expect from 'expect.js';
import parse from '../dist/parse.min';

describe('parse', () => {
  it('is a function', () => {
    expect(parse).to.be.a('function');
  });
  it('parses empty querystring', () => {
    expect(parse('')).to.eql({});
  })
  describe('object', () => {
    describe('simple key value', () => {
      it('parses single param', () => {
        expect(parse('a=1')).to.eql({ a: 1 });
      });
      it('parses param without value', () => {
        expect(parse('a=')).to.eql({ a: '' });
      });
      it('parses multi params', () => {
        expect(parse('a=1&b=2')).to.eql({ a: '1', b: '2' });
        expect(parse('a=1&b=&c=3')).to.eql({ a: '1', b: '', c:'3' });
      });
    });
    describe('nested', () => {
      it('parses nested single param', () => {
        expect(parse('a[b]=3')).to.eql({ a: { b: '3'} });
      });
      it('parses nested multi param', () => {
        expect(parse('a[b]=3&a[c]=4')).to.eql({ a: { b: '3', c: '4' } });
        expect(parse('a[b]=3&a[c][d]=4')).to.eql({ a: { b: '3', c: { d: '4' } } });
        expect(parse('a[b]=3&a[c][d]=4&a[c][e]=6')).to.eql({ a: { b: '3', c: { d: '4', e: '6' } } });
      });
    });
  });
  describe('array', () => {
    describe('one dimension', () => {
      it('parses single item', () => {
        expect(parse('a[]=1')).to.eql({ a: ['1'] });
        expect(parse('a[]=')).to.eql({ a: [''] });
      });
      it('parses multi item', () => {
        expect(parse('a[]=1&b[]=2')).to.eql({ a: ['1'], b: ['2'] });
        expect(parse('a[]=1&a[]=2')).to.eql({ a: ['1', '2'] });
        expect(parse('a[]=&a[]=2')).to.eql({ a: ['', '2'] });
        expect(parse('a[]=1&a[]=')).to.eql({ a: ['1', ''] });
        expect(parse('a[]=1&a[]=&b[]=3')).to.eql({ a: ['1', ''], b: ['3'] });
      });
    })
    describe('multi dimension', () => {
      it('parses single item', () => {
        expect(parse('a[][]=1')).to.eql({ a: [['1']] });
        expect(parse('a[]=')).to.eql({ a: [''] });
      });
      it('parses multi item', () => {
        expect(parse('a[][]=1&b[][]=2')).to.eql({ a: [['1']], b: [['2']] });
        expect(parse('a[][]=1&b[]=2')).to.eql({ a: [['1']], b: ['2'] });

        expect(parse('a[][]=1&a[][]=2')).to.eql({ a: [['1'], ['2']] });
        expect(parse('a[][]=1&a[0][]=2')).to.eql({ a: [['1','2']] });

        expect(parse('a[][]=1&a[]=2')).to.eql({ a: [['1'], '2'] });
        expect(parse('a[][]=&a[]=2')).to.eql({ a: [[''], '2'] });

        expect(parse('a[][]=&a[][]=2')).to.eql({ a: [[''], ['2']] });
        expect(parse('a[][]=&a[0][]=2')).to.eql({ a: [['', '2']] });

        expect(parse('a[][]=&a[][]=2&b[]=2&b[][]=&b[]=3&b[][]=4&b[]=6&b[][]=7')).to.eql({ a: [[''], ['2']], b: ['2', [''], '3', ['4'], '6', ['7']] });
      });
      describe('specified index', () => {
        it('parses specified index, below to undefined', () => {
          expect(parse('a[][]=&a[][]=2&b[]=2&b[][]=&b[]=3&b[1][]=4&b[]=6&b[1][3]=7')).to.eql({ a: [[''], ['2']], b: ['2', ['', '4', , '7'], '3', '6'] });
        });
      });
    })
    describe('mixed object and array', () => {
      it('parses single key value, and one dimension array', () => {
        expect(parse('a=1&b[]=2')).to.eql({ a: '1', b: ['2'] });
        expect(parse('a=1&b[]=2&c[]=3')).to.eql({ a: '1', b: ['2'], c: ['3'] });
      });
      it('parses nested array in object', () => {
        expect(parse('a=1&b[id][]=2')).to.eql({ a: '1', b: { id: ['2']} });
      });
    })
  })

});
