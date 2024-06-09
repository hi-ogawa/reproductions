- https://github.com/vitest-dev/vitest/issues/5851
- https://github.com/tc39/ecma262/pull/2154
- https://github.com/microsoft/TypeScript/pull/58640

```sh
$ node repro-node.js
[Module: null prototype] {
  'arbitrary string': 'Something',
  normalIdentifier: 'Something'
}

$ node repro-vite.js
{
  undefined: [Getter],
  normalIdentifier: [Getter],
  [Symbol(Symbol.toStringTag)]: 'Module'
}
```
