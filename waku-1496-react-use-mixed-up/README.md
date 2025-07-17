## context

- https://github.com/wakujs/waku/issues/1496

## reproduction

Stable

```sh
$ node index.js
react 19.1.0
react-dom 19.1.0
[Component1] React.use(promise1) = value1
[Component2] React.use(promise2) = value1  👈 `value2` expected
HTML output: <div><div>Component1: value1<div>Component2: value1</div></div></div>
```

Canary

```sh
$ node index.js
react 19.2.0-canary-dffacc7b-20250717
react-dom 19.2.0-canary-dffacc7b-20250717
[Component1] React.use(promise1) = value1
[Component2] React.use(promise2) = value1
HTML output: <div><div>Component1: value1<div>Component2: value1</div></div></div>
```
