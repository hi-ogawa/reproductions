Minimal POC of rolldown module runner with source map

```sh
$ node demo.js
<dir>/src/error.js:6
  throw new Error("boom");
        ^


Error: boom
    at errorFn2 (<dir>/src/error.js:6:9)
    at Object.errorFn (<dir>/src/error.js:2:3)
    at main2 (<dir>/src/entry.js:1:1)
    at Object.main (<dir>/src/entry.js:4:3)
    at main (file://<dir>/demo.js:31:7)

Node.js v20.18.0
```

## related

- https://github.com/rolldown/vite/pull/66
