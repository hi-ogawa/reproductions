https://github.com/hi-ogawa/vite-environment-examples/pull/74

## v0.60.2

```sh
$ node repro.mjs
{
  config: {},
  sources: [
    '/home/hiroshi/code/personal/reproductions/unocss-jiti-esm-slow-config/uno.config.ts'
  ]
}
[loadConfig]: 1.342s
```

## v0.58.9

```sh
$ cd fast && npm i && node repro.mjs
{
  config: {},
  sources: [
    '/home/hiroshi/code/personal/reproductions/unocss-jiti-esm-slow-config/fast/uno.config.ts'
  ]
}
[loadConfig]: 347.48ms
```
