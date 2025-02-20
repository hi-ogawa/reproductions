```sh
$ npx vite build --ssr
$ node dist/main.js
[effect2.js] undefined
[effect1.js]

$ node src/main.js
[effect1.js]
[effect2.js] true
```
