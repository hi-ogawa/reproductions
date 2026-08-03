# Next.js Returned Nested Action Reproduction

This App Router project tests a client calling a module-level Server Function, retaining the nested Server Function returned by that call, and invoking the retained function in a second client request.

Two self-contained routes differ only in how the client receives the parent `outer` action:

- `/imported` directly imports `outer` into a Client Component.
- `/prop` imports `outer` in a Server Component and passes it to the Client Component as a prop.

Both routes successfully call `outer` and retain the returned `inner` function. Calling `inner` fails on `/imported`, but succeeds with its captured value on `/prop`.

The generated server-reference manifest contains only `outer` for `/imported`. For `/prop`, it contains both `outer` and generated `$$RSC_SERVER_ACTION_0`.

## Run

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

The Playwright test asserts the current split behavior.
