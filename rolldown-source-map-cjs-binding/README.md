Debugging source map

```sh
# ok
$ node ./src/main1.js
Trace: yay
    at throwError (file://<root>/src/lib.js:2:11)
    at main (file://<root>/src/main1.js:4:3)
    at file://<root>/src/main1.js:7:1
    ...

# not ok
$ pnpm build
$ node --enable-source-maps ./dist/main1.js
Trace: yay
    at Object.throwError (<root>/src/lib.js:2:11)
    at main (<root>/src/main1.js:1:1)
    at Object.<anonymous> (<root>/src/main1.js:7:1)
    ...
```
