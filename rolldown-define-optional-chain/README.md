## context

https://github.com/evanw/esbuild/issues/3551

## reproduction

See `./dist/rolldown/entry.js` and `./dist/esbuild/entry.js`.

```sh
pnpm build
pnpm build-esbuild
node repro-oxc.js
```
