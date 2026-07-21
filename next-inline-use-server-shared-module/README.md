# context

Indirect variant of `next-inline-use-server-in-client`.

- https://github.com/vitejs/vite-plugin-react/issues/883
- https://github.com/vitejs/vite-plugin-react/issues/1250
- https://github.com/vitejs/vite-plugin-react/pull/1251

Unlike `next-inline-use-server-in-client` (inline `"use server"` directly inside
a `"use client"` module), here the inline-action module `app/shared.jsx` has
**no** `"use client"` and **no** top-level `"use server"` directive. It:

- renders as a Server Component containing an inline `"use server"` action
  (`InlinePage`, used by `app/page.jsx`), and
- also exports a plain value (`pageTitle`) that a separate `"use client"` module
  (`app/client.jsx`) imports.

So `shared.jsx` is pulled into the client graph via a non-action import. This is
the shape behind vite-plugin-react #1250: a plain module carrying an inline
action leaks into a non-RSC graph.

## result

Next.js (16.2.10, turbopack) **hard-errors**, the same as the direct case,
pointing at `shared.jsx` even though it has no `"use client"` directive:

```
./app/shared.jsx:9:5
It is not allowed to define inline "use server" annotated Server Actions in Client Components.

Import traces:
  Server Component:
    ./app/shared.jsx
    ./app/page.jsx

  Client Component Browser:
    ./app/shared.jsx [Client Component Browser]
    ./app/client.jsx [Client Component Browser]
    ...
```

So once the module is pulled into the client graph (via `client.jsx` importing
`pageTitle`), Next treats the whole module as a Client Component and rejects the
inline action. It does **not** split/dedupe or silently accept.

## run

```sh
pnpm install
pnpm build   # and: pnpm dev
```

```sh
$ next build
▲ Next.js 16.2.10 (Turbopack)

  Creating an optimized production build ...

> Build error occurred
Error: Turbopack build failed with 1 errors:
./app/shared.jsx:9:5
It is not allowed to define inline "use server" annotated Server Actions in Client Components.
    To use Server Actions in a Client Component, you can either export them from a separate file with "use server" at the top, or pass them down through props from a Server Component.

    Read more: https://nextjs.org/docs/app/api-reference/directives/use-server#using-server-functions-in-a-client-component
   7 | export function InlinePage() {
   8 |   async function invoke() {
>  9 |     "use server";
     |     ^^^^^^^^^^^^
  10 |     console.log("boom");
  11 |   }
  12 |   return (

Ecmascript file had an error

Import traces:
  Server Component:
    ./app/shared.jsx
    ./app/page.jsx

  Client Component Browser:
    ./app/shared.jsx [Client Component Browser]
    ./app/client.jsx [Client Component Browser]
    ./app/client.jsx [Server Component]
    ./app/page.jsx [Server Component]

  Client Component SSR:
    ./app/shared.jsx [Client Component SSR]
    ./app/client.jsx [Client Component SSR]
    ./app/client.jsx [Server Component]
    ./app/page.jsx [Server Component]


    at <unknown> (./app/shared.jsx:9:5)
[ELIFECYCLE] Command failed with exit code 1.
```
