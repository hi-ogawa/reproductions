- v6

```sh
$ node repro.mjs
1:12:18 PM [vite] (ssr) Error when evaluating SSR module /src/entry:
|- Error: something bad
    at eval (/home/hiroshi/code/personal/reproductions/vite-v6-ssr-error/src/dep3.js:3:20)
    at ESModulesEvaluator.runInlinedModule (file:///home/hiroshi/code/personal/reproductions/vite-v6-ssr-error/node_modules/.pnpm/vite@6.0.0-alpha.19/node_modules/vite/dist/node/module-runner.js:1065:6)
    at ModuleRunner.directRequest (file:///home/hiroshi/code/personal/reproductions/vite-v6-ssr-error/node_modules/.pnpm/vite@6.0.0-alpha.19/node_modules/vite/dist/node/module-runner.js:1038:82)
    at ModuleRunner.cachedRequest (file:///home/hiroshi/code/personal/reproductions/vite-v6-ssr-error/node_modules/.pnpm/vite@6.0.0-alpha.19/node_modules/vite/dist/node/module-runner.js:947:28)
    at request (file:///home/hiroshi/code/personal/reproductions/vite-v6-ssr-error/node_modules/.pnpm/vite@6.0.0-alpha.19/node_modules/vite/dist/node/module-runner.js:984:116)
    at async eval (/home/hiroshi/code/personal/reproductions/vite-v6-ssr-error/src/dep2.js:3:44)
    at async ESModulesEvaluator.runInlinedModule (file:///home/hiroshi/code/personal/reproductions/vite-v6-ssr-error/node_modules/.pnpm/vite@6.0.0-alpha.19/node_modules/vite/dist/node/module-runner.js:1057:5)
    at async ModuleRunner.directRequest (file:///home/hiroshi/code/personal/reproductions/vite-v6-ssr-error/node_modules/.pnpm/vite@6.0.0-alpha.19/node_modules/vite/dist/node/module-runner.js:1038:61)
    at async ModuleRunner.cachedRequest (file:///home/hiroshi/code/personal/reproductions/vite-v6-ssr-error/node_modules/.pnpm/vite@6.0.0-alpha.19/node_modules/vite/dist/node/module-runner.js:948:76)
    at async eval (/home/hiroshi/code/personal/reproductions/vite-v6-ssr-error/src/dep1.js:3:44)
```

- v5

```sh
$ node repro.mjs
1:11:30 PM [vite] Error when evaluating SSR module /src/dep3.js:
|- Error: something bad
    at eval (/home/hiroshi/code/personal/reproductions/vite-v6-ssr-error/src/dep3.js:3:20)
    at instantiateModule (file:///home/hiroshi/code/personal/reproductions/vite-v6-ssr-error/node_modules/.pnpm/vite@5.3.5/node_modules/vite/dist/node/chunks/dep-mCdpKltl.js:52650:11)

1:11:30 PM [vite] Error when evaluating SSR module /src/dep2.js:
|- Error: something bad
    at eval (/home/hiroshi/code/personal/reproductions/vite-v6-ssr-error/src/dep3.js:3:20)
    at instantiateModule (file:///home/hiroshi/code/personal/reproductions/vite-v6-ssr-error/node_modules/.pnpm/vite@5.3.5/node_modules/vite/dist/node/chunks/dep-mCdpKltl.js:52650:11)

1:11:30 PM [vite] Error when evaluating SSR module /src/dep1.js:
|- Error: something bad
    at eval (/home/hiroshi/code/personal/reproductions/vite-v6-ssr-error/src/dep3.js:3:20)
    at instantiateModule (file:///home/hiroshi/code/personal/reproductions/vite-v6-ssr-error/node_modules/.pnpm/vite@5.3.5/node_modules/vite/dist/node/chunks/dep-mCdpKltl.js:52650:11)

1:11:30 PM [vite] Error when evaluating SSR module /src/entry:
|- Error: something bad
    at eval (/home/hiroshi/code/personal/reproductions/vite-v6-ssr-error/src/dep3.js:3:20)
    at instantiateModule (file:///home/hiroshi/code/personal/reproductions/vite-v6-ssr-error/node_modules/.pnpm/vite@5.3.5/node_modules/vite/dist/node/chunks/dep-mCdpKltl.js:52650:11)
```
