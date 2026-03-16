# Uninstalled optional peer dep throws hard resolve error on Yarn PnP

Related: https://github.com/vitest-dev/vitest/issues/9799

## Describe the bug

Given a local dependency `my-dep` that declares `foobar` as an optional peer dep:

```json
{
  "name": "my-dep",
  "peerDependencies": { "foobar": "*" },
  "peerDependenciesMeta": { "foobar": { "optional": true } }
}
```

And `my-dep/index.js` dynamically imports it:

```js
export async function callPeerDep() {
  return await import("foobar");
}
```

When `foobar` is **not installed**, Vite 8 on Yarn PnP fails to recognize it as optional. Instead of resolving to the `__vite-optional-peer-dep` marker, it throws a hard resolve error — both during dependency optimization (rolldown) and during `vite:import-analysis` (when excluded from optimizeDeps).

This works correctly in Vite 7 (all linkers) and Vite 8 with `nodeLinker: node-modules`.

| Vite version | Linker       | Status     |
| ------------ | ------------ | ---------- |
| 7            | pnp          | OK         |
| 7            | node-modules | OK         |
| 8            | pnp          | **NOT OK** |
| 8            | node-modules | OK         |

## Reproduction

https://github.com/user/vitest-9799-vite-optional-peer-dep-excluded-pnp

## Steps to reproduce

```bash
corepack enable
yarn install
yarn dev
# open http://localhost:5173/
```

## Expected behavior

- `hello()` from `my-dep` returns `"ok"`
- `callPeerDep()` rejects with: `Could not resolve "foobar" imported by "my-dep"`

## Actual behavior

```sh
$ yarn dev
11:34:49 AM [vite] (client) Re-optimizing dependencies because vite config has changed

  VITE v8.0.0  ready in 504 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
file:///home/hiroshi/.yarn/berry/cache/rolldown-npm-1.0.0-rc.9-144204c709-10c0.zip/node_modules/rolldown/dist/shared/error-CP8smW_P.mjs:48
        const wrapper = new Error(summary);
                        ^

Error: Error during dependency optimization:

Build failed with 1 error:

[RESOLVE_ERROR] Error: Could not resolve 'foobar' in .yarn/__virtual__/my-dep-virtual-4d1718b948/5/.yarn/berry/cache/my-dep-file-41fc9621c1-10c0.zip/node_modules/my-dep/index.js
   ╭─[ .yarn/__virtual__/my-dep-virtual-4d1718b948/5/.yarn/berry/cache/my-dep-file-41fc9621c1-10c0.zip/node_modules/my-dep/index.js:6:23 ]
   │
 6 │   return await import("foobar");
   │                       ────┬───
   │                           ╰───── my-dep tried to access foobar, but it isn't declared in its dependencies; this makes the require call ambiguous and unsound.

Required package: foobar
Required by: my-dep@virtual:b120e78f35cad2c07ce9c7b835bb92fc524afc6dfff430a75f4022588b6732b1bc5ca4482b4d328c6059f041aefff68843af9522f74260c1acbb1ad689dd4d3f#file:./packages/my-dep#./packages/my-dep::hash=dd5ed8&locator=vitest-9799-vite-optional-peer-dep-excluded-pnp%40workspace%3A. (via /home/hiroshi/code/personal/reproductions/vitest-9799-vite-optional-peer-dep-excluded-pnp/.yarn/__virtual__/my-dep-virtual-4d1718b948/5/.yarn/berry/cache/my-dep-file-41fc9621c1-10c0.zip/node_modules/my-dep/)
───╯

    at aggregateBindingErrorsIntoJsError (file:///home/hiroshi/.yarn/berry/cache/rolldown-npm-1.0.0-rc.9-144204c709-10c0.zip/node_modules/rolldown/dist/shared/error-CP8smW_P.mjs:48:18)
    at unwrapBindingResult (file:///home/hiroshi/.yarn/berry/cache/rolldown-npm-1.0.0-rc.9-144204c709-10c0.zip/node_modules/rolldown/dist/shared/error-CP8smW_P.mjs:18:128)
    at #build (file:///home/hiroshi/.yarn/berry/cache/rolldown-npm-1.0.0-rc.9-144204c709-10c0.zip/node_modules/rolldown/dist/shared/rolldown-build-4YnQkA76.mjs:3311:34)
    at async Object.build (file:///home/hiroshi/code/personal/reproductions/vitest-9799-vite-optional-peer-dep-excluded-pnp/.yarn/__virtual__/vite-virtual-f05641aa8c/5/.yarn/berry/cache/vite-npm-8.0.0-259ca3eb1b-10c0.zip/node_modules/vite/dist/node/chunks/node.js:31415:18) {
  errors: [Getter/Setter]
}
```

Also with `optimizeDeps.exclude: ["my-dep"]`:

```sh
$ yarn dev
11:21:56 AM [vite] (client) Re-optimizing dependencies because lockfile has changed

  VITE v8.0.0  ready in 519 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
11:21:57 AM [vite] (client) Pre-transform error: Failed to resolve import "foobar" from ".yarn/__virtual__/my-dep-virtual-46a9f04511/5/.yarn/berry/cache/my-dep-file-89884eef3b-10c0.zip/node_modules/my-dep/index.js?v=04ae9376". Does the file exist?
  Plugin: vite:import-analysis
  File: ...my-dep/index.js?v=04ae9376:6:22
  4  |
  5  |  export async function callPeerDep() {
  6  |    return await import('foobar')
     |                        ^
  7  |  }
  8  |
```

## System Info

```
Used Package Manager: yarn (PnP)
```

## Notes

Toggle linker for comparison:

```bash
# in .yarnrc.yml, change nodeLinker: pnp to nodeLinker: node-modules
yarn install
yarn dev
```
