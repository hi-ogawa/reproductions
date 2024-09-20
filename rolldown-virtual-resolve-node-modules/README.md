- https://github.com/rolldown/rolldown/issues/2269

```sh
# see dist/rolldown
$ pnpm build-rolldown

[UNRESOLVED_IMPORT] Warning: "slash" is imported by "\0virtual.js", but could not be resolved – treating it as an external dependency.

<DIR>/virtual.js  chunk │ size: 0.10 kB
<DIR>/actual.js   chunk │ size: 0.31 kB


# see dist/rollup
$ pnpm build-rollup

virtual.js, ./src/actual.js → ./dist/rollup...
created ./dist/rollup in 20ms
```
