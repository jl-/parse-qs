simple query string parser

```
import parse from 'parse-qs';

const tests = [
  'a=1&b=2&c=3', // {a: '1', b: '2', c: '3'}
  'a=1&b[]=2&b[]=3' // {a: '1', b: ['2', '3']}
  'a[]=1&b[id]=2', // {a: ['1'], b: { id: '2'}}
  'a[][]=1&a[0][]=2&b[id][name]=12&b[id][age]=13' // {a: [['1', '2']], b: {id: {name: '12', age: '13'}}}
];

tests.forEach(test => console.log(parse(test)));

```
test cases: `test/parse.spec.js`
