Maybe related to https://github.com/vitest-dev/vitest/pull/7646.
Well, Vite SSR also doesn't match exactly with Node, so this is not a big deal.

```sh
$ node repro.js
Trace: __TEST__
    at Object.yyy (file:///dir/repro.js:4:13)
    at file:///dir/repro.js:8:5
Trace: __TEST__
    at yyy (file:///dir/repro.js:4:13)
    at file:///dir/repro.js:10:13
Trace: __TEST__
    at yyy (file:///dir/repro.js:4:13)
    at file:///dir/repro.js:13:1
Trace: __TEST__
    at yyy (file:///dir/repro.js:4:13)
    at file:///dir/repro.js:15:9

$ node generate.js repro.js
$ node --enable-source-maps dist/repro.js
Trace: __TEST__
    at Object.yyy (/dir/repro.js:4:13)
    at <anonymous> (/dir/repro.js:8:5)
Trace: __TEST__
    at yyy (/dir/repro.js:4:13)
    at <anonymous> (/dir/repro.js:10:9) ❓❓❓
Trace: __TEST__
    at yyy (/dir/repro.js:4:13)
    at <anonymous> (/dir/repro.js:13:1)
Trace: __TEST__
    at yyy (/dir/repro.js:4:13)
    at <anonymous> (/dir/repro.js:15:5) ❓❓❓

$ node vite.js repro.js
Trace: __TEST__
    at Object.yyy (/dir/repro.js:4:13)
    at eval (/dir/repro.js:8:5)
Trace: __TEST__
    at yyy (/dir/repro.js:4:13)
    at eval (/dir/repro.js:10:13)
Trace: __TEST__
    at yyy (/dir/repro.js:4:13)
    at eval (/dir/repro.js:13:1)
Trace: __TEST__
    at yyy (/dir/repro.js:4:13)
    at eval (/dir/repro.js:15:9)

$ node generate-magic-string.js repro.js
$ node --enable-source-maps dist/magic/repro.js
Trace: __TEST__
    at Object.yyy (/dir/repro.js:4:13)
    at <anonymous> (/dir/repro.js:8:5)
Trace: __TEST__
    at yyy (/dir/repro.js:4:13)
    at <anonymous> (/dir/repro.js:10:13)
Trace: __TEST__
    at yyy (/dir/repro.js:4:13)
    at <anonymous> (/dir/repro.js:13:1)
Trace: __TEST__
    at yyy (/dir/repro.js:4:13)
    at <anonymous> (/dir/repro.js:15:9)
```

```sh
$ node repro2.js
Trace: __TEST__
    at repro2Dep (file:///dir/repro2-dep.js:3:11)
    at file:///dir/repro2.js:3:1
Trace: __TEST__
    at repro2Dep (file:///dir/repro2-dep.js:3:11)
    at file:///dir/repro2.js:5:15

$ node generate.js repro2.js
$ node generate.js repro2-dep.js
$ node --enable-source-maps dist/repro2.js
Trace: __TEST__
    at repro2Dep (/dir/repro2-dep.js:3:11)
    at <anonymous> (/dir/repro2.js:3:1)
Trace: __TEST__
    at repro2Dep (/dir/repro2-dep.js:3:11)
    at <anonymous> (/dir/repro2.js:5:5) ❓❓❓

$ node vite.js repro2.js
Trace: __TEST__
    at repro2Dep (/dir/repro2-dep.js:3:11)
    at eval (/dir/repro2.js:3:10) ❓❓❓
Trace: __TEST__
    at repro2Dep (/dir/repro2-dep.js:3:11)
    at eval (/dir/repro2.js:5:15)
```

- Vite module runner stack trace is on first line

```sh
$ node repro3.js
file:///dir/repro3.js:1
throw new Error('__TEST__')
      ^

Error: __TEST__
    at file:///dir/repro3.js:1:7
    ...

$ node vite2.js repro3.js
[vite] connected.
/dir/repro3.js:3
"use strict";throw new Error('__TEST__')
                   ^

Error: __TEST__
    at /dir/repro3.js:1:18 ❓❓❓
    ...

# runnerImport doesn't fix stacktrace on top level error
$ node vite.js repro3.js
/dir/repro3.js:3
"use strict";throw new Error('__TEST__')
                   ^

Error: __TEST__
    at eval (/dir/repro3.js:3:20) ❓❓❓
```
