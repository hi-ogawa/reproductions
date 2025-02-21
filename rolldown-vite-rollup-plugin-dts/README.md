## context

- https://github.com/vitest-dev/vitest/pull/7509#issuecomment-2674130599

## reproduction

```sh
# OK
pnpm build-tsup

# Not OK
pnpm build-rollup

> rolldown-vite-using-syntax@0.0.0 build-rollup /home/hiroshi/code/personal/reproductions/rolldown-vite-rollup-plugin-dts
> rollup -c


./src/index.ts → dist/rollup...
src/index.ts(6,27): error TS7006: Parameter 'source' implicitly has an 'any' type.

[!] (plugin dts) RollupError: [plugin dts] src/index.ts: Failed to compile. Check the logs above.
src/index.ts
    at getRollupError (/home/hiroshi/code/personal/reproductions/rolldown-vite-rollup-plugin-dts/node_modules/.pnpm/rollup@4.34.8/node_modules/rollup/dist/shared/parseAst.js:285:41)
    at Object.error (/home/hiroshi/code/personal/reproductions/rolldown-vite-rollup-plugin-dts/node_modules/.pnpm/rollup@4.34.8/node_modules/rollup/dist/shared/parseAst.js:281:42)
    at Object.error (/home/hiroshi/code/personal/reproductions/rolldown-vite-rollup-plugin-dts/node_modules/.pnpm/rollup@4.34.8/node_modules/rollup/dist/shared/rollup.js:888:32)
    at Object.error (/home/hiroshi/code/personal/reproductions/rolldown-vite-rollup-plugin-dts/node_modules/.pnpm/rollup@4.34.8/node_modules/rollup/dist/shared/rollup.js:21799:42)
    at generateDtsFromTs (file:///home/hiroshi/code/personal/reproductions/rolldown-vite-rollup-plugin-dts/node_modules/.pnpm/rollup-plugin-dts@6.1.1_rollup@4.34.8_typescript@5.7.3/node_modules/rollup-plugin-dts/dist/rollup-plugin-dts.mjs:1834:30)
    at Object.transform (file:///home/hiroshi/code/personal/reproductions/rolldown-vite-rollup-plugin-dts/node_modules/.pnpm/rollup-plugin-dts@6.1.1_rollup@4.34.8_typescript@5.7.3/node_modules/rollup-plugin-dts/dist/rollup-plugin-dts.mjs:1843:38)
    at /home/hiroshi/code/personal/reproductions/rolldown-vite-rollup-plugin-dts/node_modules/.pnpm/rollup@4.34.8/node_modules/rollup/dist/shared/rollup.js:1073:40
```
