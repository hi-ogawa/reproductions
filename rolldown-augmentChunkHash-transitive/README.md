Use `augmentChunkHash` to update `dep2` chunk hash.

On rollup, it affect parent chunks' has.

```sh
$ pnpm build-rollup
[debug] [ 'entry-JLv7mwm2.js', 'dep1-BjiIigbx.js', 'dep2-FFxFXinQ.js' ]

$ pnpm build-rollup
[debug] [ 'entry-DfZTTeuI.js', 'dep1-dlGUTxta.js', 'dep2-nUWkYB-M.js' ]
```

On rolldown, it affects only `dep2` chunk.

```sh
$ pnpm build
[debug] [ 'entry-CBcHEEV8.js', 'dep1-CN1ADQTv.js', 'dep2-CeH93yrm.js' ]

$ pnpm build
[debug] [ 'entry-CBcHEEV8.js', 'dep1-CN1ADQTv.js', 'dep2-Bo3o0C0E.js' ]
```
