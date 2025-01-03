https://github.com/rolldown/rolldown/issues/2387

_approach 1_

```sh
# rolldown: bundle to esm + transform esm chunk to systemjs
$ npx rolldown -c rolldown.config.system.js

$ node run-system.js ./dist/entry.js
```

_approach 2_

```sh
# rolldown: bundle to esm
$ npx rolldown -c rolldown.config.js

# rollup: transform from esm to system
$ npx rollup -c rollup.config.js

$ node run-system.js ./dist/system/entry.js
```
