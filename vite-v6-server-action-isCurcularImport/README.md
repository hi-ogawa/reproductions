- https://github.com/hi-ogawa/vite-plugins/pull/297

```sh
$ node repro.mjs
file:///home/hiroshi/code/personal/reproductions/vite-v6-server-action-isCurcularImport/node_modules/.pnpm/vite@https+++pkg.pr.new+vite@4e81092/node_modules/vite/dist/node/module-runner.js:923
      if (mod.importers.size && this.isCurcularImport(mod.importers, moduleId))
                        ^

RangeError: Maximum call stack size exceeded
    at get size [as size] (<anonymous>)
    at ModuleRunner.isCurcularImport (file:///home/hiroshi/code/personal/reproductions/vite-v6-server-action-isCurcularImport/node_modules/.pnpm/vite@https+++pkg.pr.new+vite@4e81092/node_modules/vite/dist/node/module-runner.js:923:25)
    at ModuleRunner.isCurcularImport (file:///home/hiroshi/code/personal/reproductions/vite-v6-server-action-isCurcularImport/node_modules/.pnpm/vite@https+++pkg.pr.new+vite@4e81092/node_modules/vite/dist/node/module-runner.js:923:38)
    at ModuleRunner.isCurcularImport (file:///home/hiroshi/code/personal/reproductions/vite-v6-server-action-isCurcularImport/node_modules/.pnpm/vite@https+++pkg.pr.new+vite@4e81092/node_modules/vite/dist/node/module-runner.js:923:38)
    at ModuleRunner.isCurcularImport (file:///home/hiroshi/code/personal/reproductions/vite-v6-server-action-isCurcularImport/node_modules/.pnpm/vite@https+++pkg.pr.new+vite@4e81092/node_modules/vite/dist/node/module-runner.js:923:38)
    at ModuleRunner.isCurcularImport (file:///home/hiroshi/code/personal/reproductions/vite-v6-server-action-isCurcularImport/node_modules/.pnpm/vite@https+++pkg.pr.new+vite@4e81092/node_modules/vite/dist/node/module-runner.js:923:38)
    at ModuleRunner.isCurcularImport (file:///home/hiroshi/code/personal/reproductions/vite-v6-server-action-isCurcularImport/node_modules/.pnpm/vite@https+++pkg.pr.new+vite@4e81092/node_modules/vite/dist/node/module-runner.js:923:38)
    at ModuleRunner.isCurcularImport (file:///home/hiroshi/code/personal/reproductions/vite-v6-server-action-isCurcularImport/node_modules/.pnpm/vite@https+++pkg.pr.new+vite@4e81092/node_modules/vite/dist/node/module-runner.js:923:38)
    at ModuleRunner.isCurcularImport (file:///home/hiroshi/code/personal/reproductions/vite-v6-server-action-isCurcularImport/node_modules/.pnpm/vite@https+++pkg.pr.new+vite@4e81092/node_modules/vite/dist/node/module-runner.js:923:38)
    at ModuleRunner.isCurcularImport (file:///home/hiroshi/code/personal/reproductions/vite-v6-server-action-isCurcularImport/node_modules/.pnpm/vite@https+++pkg.pr.new+vite@4e81092/node_modules/vite/dist/node/module-runner.js:923:38)

Node.js v20.14.0
```
