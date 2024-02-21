https://github.com/vitest-dev/vitest/issues/4365

```sh
$ node repro.cjs
{
  cjs: {
    Component: [Function: x],
    Fragment: [Function: _],
    cloneElement: [Function (anonymous)],
    createContext: [Function (anonymous)],
    createElement: [Function: y],
    createRef: [Function (anonymous)],
    h: [Function: y],
    hydrate: [Function: n],
    isValidElement: [Function: u],
    options: { __e: [Function: __e] },
    render: [Function: O],
    toChildArray: [Function: n]
  },
  esm: [Module: null prototype] {
    Component: [Function: b],
    Fragment: [Function: g],
    cloneElement: [Function: F],
    createContext: [Function: G],
    createElement: [Function: y],
    createRef: [Function: _],
    h: [Function: y],
    hydrate: [Function: E],
    isValidElement: [Function: t],
    options: { __e: [Function: __e] },
    render: [Function: B],
    toChildArray: [Function: H]
  }
}
false

# same log
$ node repro.cjs
```
