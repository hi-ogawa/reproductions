- https://github.com/vitest-dev/vitest/pull/5535

```sh
npm test
...
  ● object, set, map

    RangeError: Maximum call stack size exceeded

      11 |     return obj
      12 |   }
    > 13 |   expect(gen()).toEqual(gen())
         |                 ^
      14 | })
      15 |
      16 | test('object, set, set', () => {

      at Object.toEqual (basic.test.js:13:17)
```
