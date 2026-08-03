# Next.js Nested Server Function Repro

This standalone App Router project tests a client calling a module-level Server Function, retaining the nested Server Function returned by that call, and invoking the retained function in a second client request. Two self-contained routes differ only in how the client receives the parent `outer` action.

## Versions

- Next.js: `16.3.0-canary.106`
- React: `19.2.4`
- Tested: 2026-08-03

The local Next.js checkout used for the surrounding investigation was `16.3.0-canary.98`, but that exact version was not published. The repro therefore uses the newer npm canary available at test time.

## Cases

Both [`app/imported/actions.ts`](./app/imported/actions.ts) and [`app/prop/actions.ts`](./app/prop/actions.ts) define:

```js
'use server'

export async function outer(prefix) {
  async function inner(value) {
    'use server'
    return `${prefix}:${value}`
  }

  return inner
}
```

- `/imported`: [`app/imported/repro.tsx`](./app/imported/repro.tsx) directly imports `outer` into a Client Component.
- `/prop`: [`app/prop/page.tsx`](./app/prop/page.tsx) imports `outer` in a Server Component and passes it to [`app/prop/repro.tsx`](./app/prop/repro.tsx) as a prop.

Each client invokes `outer('captured')`, stores its returned function in a ref, and later invokes that function with `'client'`. The root layout provides navigation between the routes.

## Result

The first request succeeds in both cases. Each client receives and retains a value for which `typeof inner === 'function'`.

For `/imported`, the second request fails:

```text
UnrecognizedActionError: Server Action "<inner-action-id>" was not found on the server.
```

For `/prop`, the second request succeeds:

```text
result:captured:client
```

Next.js transforms both nested functions into generated module exports, registers them, binds the encrypted `prefix` captures, and includes their action IDs in the modules' internal action-entry comments. The manifest differs by route:

- `/imported` publishes only the source export `outer`. The client's second request uses the generated nested action ID, which the server action resolver cannot find.
- `/prop` publishes both `outer` and generated `$$RSC_SERVER_ACTION_0`. The second request resolves the generated export and invokes it with the decrypted capture.

The observable distinction is whether the parent action module participates in the RSC render graph that passes `outer` through Flight. A direct Client Component import creates a client-callable reference for the source export but does not make its generated nested action manifest-reachable. Passing `outer` from a Server Component causes the generated nested action to be published as well.

The same split result was reproduced with:

- Default Turbopack development server.
- Webpack development server.
- Turbopack production build followed by `next start`.

## Commands

```sh
pnpm install

# Turbopack development
pnpm test

# Webpack development
NEXT_BUNDLER=webpack pnpm test

# Production
pnpm exec next build
NEXT_MODE=start pnpm test
```

The Playwright test asserts the current failure for `/imported` and successful nested invocation for `/prop`. If direct imports should support the same dynamic return path, its final expectation should become:

```ts
await expect(page.locator('#status')).toHaveText('result:captured:client')
```
