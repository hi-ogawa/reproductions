https://github.com/vitest-dev/vitest/issues/5688

```sh
npm test

  console.log
    [x._tail] VNode { array: [ { x: 1 } ], ownerID: undefined }

      at Object.log (basic.test.js:7:10)

  console.log
    [y._tail] VNode { array: [ { x: 1 } ], ownerID: OwnerID {} }

      at Object.log (basic.test.js:8:10)

 PASS  ./basic.test.js
  ✓ repro (22 ms)
```
