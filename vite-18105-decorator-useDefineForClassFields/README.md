- https://github.com/vitejs/vite/issues/18105

```sh
$ pnpm dev-tsc
{
  decInstance: DecClass {
    decInit: 'dec-ok',
    decNoInit: 'dec-ok',
    noDecNoInit: undefined
  },
  noDecInstance: NoDecClass {}
}

$ pnpm dev-esbuild
{
  decInstance: DecClass { decInit: 'dec-ok' },
  noDecInstance: NoDecClass {}
}
```
