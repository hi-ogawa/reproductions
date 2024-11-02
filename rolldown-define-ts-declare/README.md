```sh
$ pnpm build
```

- input: `src/test-declare.ts`

```ts
declare let __TEST_DEFINE__: string
console.log({ __TEST_DEFINE__ })
```

- output: `dist/test-declare.js`

```ts
console.log({ __TEST_DEFINE__ });
```
