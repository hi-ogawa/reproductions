- https://github.com/vitejs/vite/pull/17754#issuecomment-2299415302

`@import file:///some/absolute/path.scss` succeeds on legacy API but fails on modern API.

```sh
$ node src/repro.js
@@@@
@@@@ [legacy] @import "/home/hiroshi/code/personal/reproductions/vite-17754-sass-absolute-file-reference/src/importee.scss"
@@@@
{
  css: <Buffer 2e 74 65 73 74 20 7b 0a 20 20 63 6f 6c 6f 72 3a 20 6f 72 61 6e 67 65 3b 0a 7d>,
  map: undefined,
  stats: {
    entry: '/test.scss',
    start: 1724202140327,
    end: 1724202140348,
    duration: 21,
    includedFiles: [
      '/test.scss',
      '/home/hiroshi/code/personal/reproductions/vite-17754-sass-absolute-file-reference/src/importee.scss',
      [Symbol($ti)]: [Rti]
    ]
  }
}

@@@@
@@@@ [legacy] @import "file:///home/hiroshi/code/personal/reproductions/vite-17754-sass-absolute-file-reference/src/importee.scss"
@@@@
{
  css: <Buffer 2e 74 65 73 74 20 7b 0a 20 20 63 6f 6c 6f 72 3a 20 6f 72 61 6e 67 65 3b 0a 7d>,
  map: undefined,
  stats: {
    entry: '/test.scss',
    start: 1724202140350,
    end: 1724202140352,
    duration: 2,
    includedFiles: [
      '/test.scss',
      '/home/hiroshi/code/personal/reproductions/vite-17754-sass-absolute-file-reference/src/importee.scss',
      [Symbol($ti)]: [Rti]
    ]
  }
}

@@@@
@@@@ [modern] @import "/home/hiroshi/code/personal/reproductions/vite-17754-sass-absolute-file-reference/src/importee.scss"
@@@@
{
  css: '.test {\n  color: orange;\n}',
  loadedUrls: [
    URL {
      href: 'file:///test.scss',
      origin: 'null',
      protocol: 'file:',
      username: '',
      password: '',
      host: '',
      hostname: '',
      port: '',
      pathname: '/test.scss',
      search: '',
      searchParams: URLSearchParams {},
      hash: ''
    },
    URL {
      href: 'file:///home/hiroshi/code/personal/reproductions/vite-17754-sass-absolute-file-reference/src/importee.scss',
      origin: 'null',
      protocol: 'file:',
      username: '',
      password: '',
      host: '',
      hostname: '',
      port: '',
      pathname: '/home/hiroshi/code/personal/reproductions/vite-17754-sass-absolute-file-reference/src/importee.scss',
      search: '',
      searchParams: URLSearchParams {},
      hash: ''
    }
  ]
}

@@@@
@@@@ [modern] @import "file:///home/hiroshi/code/personal/reproductions/vite-17754-sass-absolute-file-reference/src/importee.scss"
@@@@
sass.Exception [Error]: Can't find stylesheet to import.
  ╷
1 │ @import "file:///home/hiroshi/code/personal/reproductions/vite-17754-sass-absolute-file-reference/src/importee.scss"
  │         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  ╵
  /test.scss 1:9  root stylesheet
    at Object.wrapException (/home/hiroshi/code/personal/reproductions/vite-17754-sass-absolute-file-reference/node_modules/.pnpm/sass@1.77.8/node_modules/sass/sass.dart.js:2161:43)
    at /home/hiroshi/code/personal/reproductions/vite-17754-sass-absolute-file-reference/node_modules/.pnpm/sass@1.77.8/node_modules/sass/sass.dart.js:82676:25
    at _wrapJsFunctionForAsync_closure.$protected (/home/hiroshi/code/personal/reproductions/vite-17754-sass-absolute-file-reference/node_modules/.pnpm/sass@1.77.8/node_modules/sass/sass.dart.js:4900:15)
    at _wrapJsFunctionForAsync_closure.call$2 (/home/hiroshi/code/personal/reproductions/vite-17754-sass-absolute-file-reference/node_modules/.pnpm/sass@1.77.8/node_modules/sass/sass.dart.js:35592:12)
    at _awaitOnObject_closure.call$1 (/home/hiroshi/code/personal/reproductions/vite-17754-sass-absolute-file-reference/node_modules/.pnpm/sass@1.77.8/node_modules/sass/sass.dart.js:35580:32)
    at Object._rootRunUnary (/home/hiroshi/code/personal/reproductions/vite-17754-sass-absolute-file-reference/node_modules/.pnpm/sass@1.77.8/node_modules/sass/sass.dart.js:5295:18)
    at StaticClosure.<anonymous> (/home/hiroshi/code/personal/reproductions/vite-17754-sass-absolute-file-reference/node_modules/.pnpm/sass@1.77.8/node_modules/sass/sass.dart.js:116118:16)
    at _CustomZone.runUnary$2$2 (/home/hiroshi/code/personal/reproductions/vite-17754-sass-absolute-file-reference/node_modules/.pnpm/sass@1.77.8/node_modules/sass/sass.dart.js:37044:39)
    at _Future__propagateToListeners_handleValueCallback.call$0 (/home/hiroshi/code/personal/reproductions/vite-17754-sass-absolute-file-reference/node_modules/.pnpm/sass@1.77.8/node_modules/sass/sass.dart.js:36106:51)
    at Object._Future__propagateToListeners (/home/hiroshi/code/personal/reproductions/vite-17754-sass-absolute-file-reference/node_modules/.pnpm/sass@1.77.8/node_modules/sass/sass.dart.js:5087:93)
```
