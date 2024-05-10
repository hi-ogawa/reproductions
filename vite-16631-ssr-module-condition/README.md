https://github.com/vitejs/vite/issues/16631

```sh
$ node repro-vite.mjs
[ 'default' ]

$ TEST_INLINE=1 node repro-vite.mjs
[ 'module' ]
```
