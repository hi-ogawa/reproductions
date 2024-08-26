- https://github.com/hi-ogawa/rollup-plugin-module-federation/pull/1

```sh
$ pnpm build-rollup

[debug] this.resolve("this-is-external") = {
  resolvedId: {
    attributes: {},
    external: true,
    id: 'this-is-external',
    meta: {},
    moduleSideEffects: true,
    resolvedBy: 'rollup',
    syntheticNamedExports: false
  }
}
```

```sh
$ pnpm build-rolldown

[debug] this.resolve("this-is-external") = { resolvedId: null }
```
