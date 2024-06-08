https://github.com/hi-ogawa/vite-environment-examples/pull/91

vite 6 runner import duplicate module


```sh
$ node test-vite.js
[debug:import] file:///home/hiroshi/code/personal/vite-environment-examples/examples/repro/src/thing.js
[debug:import] file:///home/hiroshi/code/personal/vite-environment-examples/examples/repro/src/thing.js
false

$ node test-node.js
[debug:import] file:///home/hiroshi/code/personal/vite-environment-examples/examples/repro/src/thing.js
true
```
