Parcel doesn't seem to have separate builds for "browser" and "ssr".
For example, server bundled dependency inside "use client" is resolved with "browser" condition.

```js
// SSR logs
$ pnpm dev
dist/server/entry.server.js: [testDep] { node: false, browser: true }
```
