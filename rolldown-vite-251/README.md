## context

- https://github.com/vitejs/rolldown-vite/issues/251

## example

```sh
$ node -e 'import("./src/entry.js").then(console.log)'
[Module: null prototype] { dep: 'dep-ok' }

$ pnpm build
$ node -e 'import("./dist/entry.js").then(console.log)'
[Module: null prototype] { dep: undefined }
```
