https://github.com/vitejs/vite/issues/16631

```sh
$ node repro-vite.mjs
[ 'module' ]

$ TEST_NO_EXTERNAL=1 node repro-vite.mjs
[ 'module' ]

$ TEST_EXTERNAL=1 node repro-vite.mjs
[ 'module' ]
```
