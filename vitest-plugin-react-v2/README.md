- https://github.com/vitejs/vite-plugin-react/pull/347
- https://github.com/rolldown/rolldown/pull/1616

## vite ssr repro

```sh
# error with deafult server.fs.cachedChecks (succeeds when cachedChecks: false)
$ rm -f src/generated.js && node repro-vite.js
file:///home/hiroshi/code/personal/reproductions/vitest-plugin-react-v2/node_modules/.pnpm/vite@5.3.4_@types+node@20.14.11/node_modules/vite/dist/node/chunks/dep-D8YhmIY-.js:52402
    const err = new Error(
                ^

Error: Failed to load url /src/generated.js (resolved id: /src/generated.js). Does the file exist?
    at loadAndTransform (file:///home/hiroshi/code/personal/reproductions/vitest-plugin-react-v2/node_modules/.pnpm/vite@5.3.4_@types+node@20.14.11/node_modules/vite/dist/node/chunks/dep-D8YhmIY-.js:52402:17)
    at async instantiateModule (file:///home/hiroshi/code/personal/reproductions/vitest-plugin-react-v2/node_modules/.pnpm/vite@5.3.4_@types+node@20.14.11/node_modules/vite/dist/node/chunks/dep-D8YhmIY-.js:53354:44) {
  code: 'ERR_LOAD_URL'
}
```

## vitest repro

```sh
# ok
rm -f src/generated.js && npx vitest -t absolute

# error
rm -f src/generated.js && npx vitest -t relative

 DEV  v2.0.3 /home/hiroshi/code/personal/reproductions/vitest-plugin-react-v2

 ❯ src/repro.test.ts (2)
   × relative error
   ↓ absolute ok [skipped]

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ Failed Tests 1 ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯

 FAIL  src/repro.test.ts > relative error
Error: Failed to load url ./generated.js (resolved id: ./generated.js) in /home/hiroshi/code/personal/reproductions/vitest-plugin-react-v2/src/repro.test.ts. Does the file exist?
 ❯ loadAndTransform node_modules/.pnpm/vite@5.3.4_@types+node@20.14.11/node_modules/vite/dist/node/chunks/dep-D8YhmIY-.js:52402:17
```
