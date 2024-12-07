```sh
$ pnpm build

$ node dist/main1.cjs
== 'this' inside 'throwError'===
{ throwError: [Getter] }
=== Error.stack from 'throwError' ===
Error: DEMO_STACKS
    at Object.throwError (/xxx/dist/shared.cjs:8:14)

$ node src/main1.js
=== 'this' inside 'throwError'===
undefined
=== Error.stack from 'throwError' ===
Error: DEMO_STACKS
    at throwError (file:///xxx/src/shared.js:6:15)
```
