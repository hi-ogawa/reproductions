https://github.com/vitejs/vite/pull/19612

```bash
$ node repro.js
[e.stack:before] Error: __TEST_ERROR__
    at eval (/xxx/src/test.js:5:11)
    at Module.test (/xxx/src/test.js:6:5)
    at main (file:///xxx/repro.js:7:9)
[e.stack:after] Error: __TEST_ERROR__
    at /xxx/src/test.js:3:11
    at Module.test (/xxx/src/test.js:4:5)
    at main (file:///xxx/repro.js:7:9)

$ bun repro.js
[e.stack:before] Error: __TEST_ERROR__
    at <anonymous> (/xxx/src/test.js:5:20)
    at test (/xxx/src/test.js:6:5)
    at <anonymous> (/xxx/repro.js:7:9)
    at processTicksAndRejections (native:7:39)
[e.stack:after] Error: __TEST_ERROR__
    at <anonymous> (/xxx/src/test.js:3:20)
    at test (/xxx/src/test.js:4:5)
    at <anonymous> (/xxx/repro.js:7:9)
    at processTicksAndRejections (native:7:39)
```
