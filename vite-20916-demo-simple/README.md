# context

https://github.com/vitejs/vite/pull/20916

## Vite

```sh
$ pnpm dev

  VITE v7.1.9  ready in 84 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
6:29:01 PM [vite] (client) [Unhandled error] Error: this is test error
 > testError src/main.ts:20:8
    18 |  
    19 |  function testError() {
    20 |    throw new Error('this is test error')
       |          ^
    21 |  }
    22 |  
 > HTMLButtonElement.<anonymous> src/main.ts:6:2

6:29:01 PM [vite] (client) [Unhandled error] Error: this is test unhandledrejection
 > testUnhandledRejection src/main.ts:24:8
    22 |  
    23 |  async function testUnhandledRejection() {
    24 |    throw new Error('this is test unhandledrejection')
       |          ^
    25 |  }
    26 |  
 > HTMLButtonElement.<anonymous> src/main.ts:12:4
```

## Bun

Enabled by default

```sh
> bun index.html

 DEV  Bun v1.2.20 ready in 7.95 ms

➜ http://localhost:3000/

Press h + Enter to show shortcuts
Bundled page in 17ms: index.html
frontend error: this is test unhandledrejection
      at testUnhandledRejection (/home/hiroshi/code/personal/reproductions/vite-20916-demo-simple/src/main.ts:24:9)
      at HTMLButtonElement.<anonymous> (/home/hiroshi/code/personal/reproductions/vite-20916-demo-simple/src/main.ts:12:5)
    from browser tab http://localhost:3000/
frontend error: this is test error
      at testError (/home/hiroshi/code/personal/reproductions/vite-20916-demo-simple/src/main.ts:20:9)
      at HTMLButtonElement.<anonymous> (/home/hiroshi/code/personal/reproductions/vite-20916-demo-simple/src/main.ts:6:3)
    from browser tab http://localhost:3000/
```

## Rsbuild

Enabled by default

```sh
Rsbuild v1.5.17

  ➜  Local:    http://localhost:3000/
  ➜  Network:  http://10.186.205.251:3000/
  ➜  press h + enter to show shortcuts

start   build started...
ready   built in 0.02 s
error   [browser] Uncaught Error: this is test error (src/main.ts:26:0)
error   [browser] Uncaught (in promise) Error: this is test unhandledrejection (src/main.ts:30:0)
```

## Next.js

See [../vite-20916-demo-next](../vite-20916-demo-next)

Disabled by default. Enable it by `experimental.browserDebugInfoInTerminal` https://github.com/vercel/next.js/pull/82701. 

```sh
> next dev --turbopack

   ▲ Next.js 16.0.0-canary.5 (Turbopack)
   - Local:        http://localhost:3000
   - Network:      http://10.186.205.251:3000
   - Experiments (use with caution):
     ✓ browserDebugInfoInTerminal

 ✓ Starting...
 ✓ Ready in 274ms
 ○ Compiling / ...
 ✓ Compiled / in 561ms
 GET / 200 in 413ms
[browser] Download the React DevTools for a better development experience: https://react.dev/link/react-devtools
[browser] Uncaught Error: this is test error
    at testError (app/client.jsx:21:9)
    at onClick (app/client.jsx:7:9)
    at button (<anonymous>)
    at TestClient (app/client.jsx:6:7)
    at Home (app/page.jsx:7:7)
  19 |
  20 | function testError() {
> 21 |   throw new Error('this is test error')
     |         ^
  22 | }
  23 |
  24 |
[browser] ⨯ unhandledRejection: Error: this is test unhandledrejection
    at testUnhandledRejection (app/client.jsx:26:9)
    at onClick (app/client.jsx:12:9)
  24 |
  25 | async function testUnhandledRejection() {
> 26 |   throw new Error('this is test unhandledrejection')
     |         ^
  27 | }
  28 |
```
