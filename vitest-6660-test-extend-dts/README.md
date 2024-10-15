- https://github.com/vitest-dev/vitest/issues/6660

```sh
pnpm tsc
```

On `vitest@2.1.0-beta.1`

```ts
// dist/repro.d.ts
export declare const myTest: import("@vitest/runner").CustomAPI<{
  now: number;
}>;
```

On `vitest@2.0.5`

```ts
export declare const myTest: import("vitest").TestAPI<{
  now: number;
}>;
```
