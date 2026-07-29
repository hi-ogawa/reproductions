# Next.js Server-Reference Argument Reproduction

- Next.js package: `16.3.0-canary.102`
- Related local source checkout: `/Users/hogawa/code/others/next.js` at `aae4179ac628e55483b62cd023a7e1827dcef122` (`16.3.0-canary.98`, unpublished)

## Scenario

Page A is the only static application graph that reaches `actionA`. Page B is the only static application graph that reaches `actionB`. A shared client-only module stores a server-reference value without statically importing either action.

```text
/a client -> actionA
/b client -> actionB
shared client state: no action imports
```

The browser visits `/a`, stores `actionA`, navigates to `/b`, and invokes:

```ts
actionB(savedActionA)
```

The explicit action header identifies only `actionB`, so Next.js keeps the request on page B. React's `decodeReply()` must then revive the serialized `actionA` argument through page B's server module map even though page B has no static graph edge to `actionA`.

Two controls isolate this failure without changing the A/B application graphs:

- Page B can invoke the retained `actionA` directly. Next.js sees A as the outer action ID and forwards it to a compatible page.
- A separate `/nested` page reaches two route-local action modules and successfully invokes `outerAction(innerAction)`. Nested server-reference arguments therefore work when the current page's module map contains both references.

## Run

The Playwright configuration starts the development server:

```sh
pnpm install
pnpm test
```

For production:

```sh
pnpm build
PORT=3102 SERVER_COMMAND="pnpm start -p 3102" pnpm test
```

The same checks can be run with Webpack:

```sh
PORT=3103 SERVER_COMMAND="pnpm dev --webpack -p 3103" pnpm test
pnpm exec next build --webpack
PORT=3104 SERVER_COMMAND="pnpm start -p 3104" pnpm test
```

## Verified Result

Verified with Next.js `16.3.0-canary.102` in all four combinations:

- Turbopack development;
- Turbopack production;
- Webpack development;
- Webpack production.

The three browser checks confirm:

```text
/b: savedActionA()             -> ACTION_A_OK
/b: actionB(savedActionA)      -> ERROR
/nested: outerAction(innerAction) -> OUTER_OK(INNER_OK)
```

For the failing call, the server reports:

```text
Failed to find Server Action "<actionA-id>"
```

Both production bundlers' `server-reference-manifest.json` confirm:

```text
actionA workers: app/a/page
actionB workers: app/b/page
```

The outer request invokes `actionB`, which is locally available on page B and therefore does not need forwarding. During `decodeReply()`, Next.js attempts to revive the serialized `actionA` argument through page B's server module map. Because that map has no page-B worker entry for `actionA`, decoding fails before `actionB` executes.

This confirms that hydrated action routing considers only the explicit outer action ID. It does not select an entrypoint based on the intersection of worker sets for server references serialized inside the argument payload.

The successful controls show that neither retaining A across navigation nor passing a server reference as an argument is independently unsupported. The failure is specific to resolving a nested reference through a current page module map that does not contain it.
