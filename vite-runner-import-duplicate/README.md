https://github.com/hi-ogawa/vite-environment-examples/pull/91

vite 6 runner import duplicate module


```sh
$ node test-vite.js
[debug:import] file:///home/hiroshi/code/personal/reproductions/vite-runner-import-duplicate/src/dep.js
[debug:import] file:///home/hiroshi/code/personal/reproductions/vite-runner-import-duplicate/src/dep.js
false

$ node test-node.js
[debug:import] file:///home/hiroshi/code/personal/reproductions/vite-runner-import-duplicate/src/dep.js
true
```
