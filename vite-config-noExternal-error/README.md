```sh
$ pnpm build

> vite-config-noexternal-error@0.0.0 build /home/hiroshi/code/personal/reproductions/vite-config-noExternal-error
> vite build

[debug] noExternal: [ 'my-package', true ]
vite v6.3.5 building SSR bundle for production...
✓ 1 modules transformed.
✗ Build failed in 16ms
error during build:
[commonjs--resolver] filename.replace is not a function
    at normalizePath (file:///home/hiroshi/code/personal/reproductions/vite-config-noExternal-error/node_modules/.pnpm/vite@6.3.5/node_modules/vite/dist/node/chunks/dep-DBxKXgDP.js:537:21)
    at getMatcherString$1 (file:///home/hiroshi/code/personal/reproductions/vite-config-noExternal-error/node_modules/.pnpm/vite@6.3.5/node_modules/vite/dist/node/chunks/dep-DBxKXgDP.js:542:16)
    at Object.test (file:///home/hiroshi/code/personal/reproductions/vite-config-noExternal-error/node_modules/.pnpm/vite@6.3.5/node_modules/vite/dist/node/chunks/dep-DBxKXgDP.js:561:33)
    at result (file:///home/hiroshi/code/personal/reproductions/vite-config-noExternal-error/node_modules/.pnpm/vite@6.3.5/node_modules/vite/dist/node/chunks/dep-DBxKXgDP.js:582:25)
    at file:///home/hiroshi/code/personal/reproductions/vite-config-noExternal-error/node_modules/.pnpm/vite@6.3.5/node_modules/vite/dist/node/chunks/dep-DBxKXgDP.js:15669:30
    at file:///home/hiroshi/code/personal/reproductions/vite-config-noExternal-error/node_modules/.pnpm/vite@6.3.5/node_modules/vite/dist/node/chunks/dep-DBxKXgDP.js:15684:74
    at shouldExternalize (file:///home/hiroshi/code/personal/reproductions/vite-config-noExternal-error/node_modules/.pnpm/vite@6.3.5/node_modules/vite/dist/node/chunks/dep-DBxKXgDP.js:15604:10)
    at Object.resolveId (file:///home/hiroshi/code/personal/reproductions/vite-config-noExternal-error/node_modules/.pnpm/vite@6.3.5/node_modules/vite/dist/node/chunks/dep-DBxKXgDP.js:15812:119)
    at Object.handler (file:///home/hiroshi/code/personal/reproductions/vite-config-noExternal-error/node_modules/.pnpm/vite@6.3.5/node_modules/vite/dist/node/chunks/dep-DBxKXgDP.js:46459:15)
    at file:///home/hiroshi/code/personal/reproductions/vite-config-noExternal-error/node_modules/.pnpm/rollup@4.41.0/node_modules/rollup/dist/es/shared/node-entry.js:22239:40
 ELIFECYCLE  Command failed with exit code 1.
```
