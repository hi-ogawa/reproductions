## context

- https://github.com/vitejs/vite/pull/18983

## examples

```sh
$ node src/test1/index.js
$ node src/test5/index.js
ReferenceError: Cannot access 'dep1' before initialization

$ pnpm build
$ node dist/client/test1.js
$ node dist/client/test5.js
ReferenceError: Cannot access 'dep1' before initialization

$ pnpm build --ssr
$ node dist/server/test1.js
$ node dist/server/test5.js
ReferenceError: Cannot access 'dep1' before initialization
```
