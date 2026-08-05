# Next.js callable use cache form reload reproduction

This reproduction demonstrates one surprising behavior for an inline cached form action with a captured value:

1. Submit the hydrated form: `cachedAction` writes to stdout.
2. Reload the page and wait for hydration.
3. Submit the unchanged form: `cachedAction` writes to stdout again.

The second write is the surprise. A cache hit would replay the first result without executing the function body again. This reproduction uses `process.stdout.write()` because Next.js captures and replays `console` output for cached functions, which makes `console.log()` unsuitable for observing actual executions.

At its core, the surprising case is equivalent to:

```tsx
const captured = 'captured'

async function cachedAction(formData: FormData) {
  'use cache'
  process.stdout.write(
    `cachedAction ${captured} ${JSON.stringify([...formData])}\n`,
  )
}

<form action={cachedAction}>
  <input name="message" defaultValue="hello" />
  <button>Submit</button>
</form>
```

The demo records execution count instead of relying only on console output. The comparison routes and no-JavaScript matrix below isolate why the second execution occurs.

## Examples

The app enables `cacheComponents` and provides two routes:

- `/inline` defines an inline `use cache` function that captures `captured` from its Server Component scope.
- `/file` imports a top-level function from `action-cached.ts`, which has the file-level `use cache` directive.

Both routes follow the same structure as the corresponding Vite examples. `page.tsx` renders a component from `server.tsx`, which passes the cached callable to a Client Component form. Each form submits a `FormData` argument containing `message=hello`.

The examples also provide two ordinary Server Actions:

- `Reset cache` clears execution state and invalidates the callable through `updateTag()`.
- `Re-render page` calls `refresh()` so the page displays the latest execution state. This action is separate from the cached callable, so it does not alter the callable form's SSR action metadata or invalidate its cache entry.

Execution state is filesystem-backed because Next bundles the cached callable separately from the page render, so plain module state is not shared across those environments.

## Reproduction

The hydrated scenario performs this sequence for both routes:

1. Load the route directly and wait for hydration.
2. Reset the cache and reload to obtain a fresh SSR-rendered form.
3. Submit the form, then rerender the page to observe one execution.
4. Reload and hydrate a newly SSR-rendered form.
5. Submit the unchanged form again, then rerender the page to observe the final execution count.

The JavaScript-disabled scenario performs the same direct load, native submit, reload, and native submit sequence without hydration. Native form submissions return a newly rendered page directly, so the separate rerender action is unnecessary.

The client-navigation scenario starts at `/`, navigates to an example through Next's client router, submits, then performs a full reload and submits again. The client action transport initially invokes the callable with only the application fields. After reload, the hydrated SSR form retains progressive `$ACTION_*` controls in the submitted `FormData`, so the cache argument changes for both directive styles.

## Result

The same result is observed in development and production builds:

| Form path | Inline directive | File directive |
| --- | ---: | ---: |
| Direct SSR load, hydrated reload | 2 executions, cache miss | 1 execution, cache hit |
| Client navigation, then hydrated reload | 2 executions, cache miss | 2 executions, cache miss |
| Direct SSR load, no JavaScript reload | 1 execution, cache hit | 1 execution, cache hit |

The hydrated inline miss is consistent with the SSR form carrying `$ACTION_REF_*` controls whose bound payload contains freshly encrypted closure data. React's hydrated action transport retains those controls in the submitted `FormData`, so rendering the form again changes the cached function argument.

The file-directive form uses stable top-level action metadata, so its hydrated `FormData` cache argument remains stable across reload. In the no-JavaScript path, React's native action decoder removes all `$ACTION_*` controls before invoking either callable, so both forms hit the cache.

Client navigation creates a different transition: the first invocation receives no action controls, while the invocation from the hydrated SSR form after reload includes them. The file directive therefore misses in this mixed path even though its `$ACTION_ID_*` value is stable.

## Run

```bash
pnpm install
pnpm test:dev
pnpm test:build
```

To inspect the examples manually:

```bash
pnpm dev
```

Open `http://localhost:3000/inline` or `http://localhost:3000/file`.
