# Inline `"use server"` function fails when returned from file-level `"use server"` function

### Link to the code that reproduces this issue

https://github.com/hi-ogawa/reproductions/tree/main/next-rsc-returned-nested-action

### To Reproduce

The reproduction exercises the natural composition of the two `"use server"` forms. An exported function inherits the file-level directive and returns a nested function with its own inline directive and one closure capture.

```ts
'use server'

export async function outer(prefix: string) {
  async function inner(value: string) {
    'use server'
    return `${prefix}:${value}`
  }

  return inner
}
```

The routes differ only in how the Client Component receives `outer`:

1. `/imported` imports `outer` directly into the Client Component.
2. `/prop` imports `outer` in the Server Component and passes it to the Client Component as a prop.

In both routes:

1. Select **Get inner**. The client calls `outer('captured')`, stores its return value in a ref, and displays `stored:function`.
2. Select **Call inner**. The client calls the retained function with `'client'`.

Run the automated reproduction with:

```sh
pnpm install
pnpm test
```

### Current vs. Expected behavior

On `/imported`, `outer` succeeds and returns a function to the client, but invoking that returned function fails:

```text
UnrecognizedActionError: Server Action "<inner-action-id>" was not found on the server.
```

On `/prop`, the same sequence succeeds and produces:

```text
result:captured:client
```

I expected `/imported` to produce the same result. The returned value is serialized to the client as a Server Action reference, so its generated action ID should remain resolvable when the client invokes it.

The generated server code for both routes contains the hoisted nested action, calls `registerServerReference`, binds the encrypted `prefix` capture, and lists the generated action in the internal action-entry comment. However, the production `server-reference-manifest.json` differs:

- `app/imported/actions.ts` publishes only the source export `outer`.
- `app/prop/actions.ts` publishes both `outer` and generated `$$RSC_SERVER_ACTION_0`.

The `/imported` client therefore receives a valid-looking reference ID that has no manifest worker. The `/prop` route succeeds because its generated nested export is present in the manifest.

### Provide environment information

```bash
Operating System:
  Platform: darwin
  Arch: arm64
Binaries:
  Node: 24.18.1
  pnpm: 10.34.5
Relevant Packages:
  next: 16.3.0-canary.106
  react: 19.2.4
  react-dom: 19.2.4
  typescript: 5.9.3
Next.js Config:
  output: N/A
```

### Which area(s) are affected? (Select all that apply)

Server Actions

### Which stage(s) are affected? (Select all that apply)

next dev (local), next build (local), next start (local)

### Additional context

The split result was verified in:

- Turbopack development.
- Webpack development.
- Turbopack production followed by `next start`.

[PR #62052](https://github.com/vercel/next.js/pull/62052) added support for nested inline actions inside module-level `"use server"` files. Its example includes an exported action returning nested actions, but its coverage is at the SWC transform layer. The transform works in this reproduction; the missing piece is publication of the generated nested export for the direct Client Component import path.

[Issue #96331](https://github.com/vercel/next.js/issues/96331) is related because it concerns valid Server Action references that cannot be resolved through a route-scoped server module map. This reproduction differs because the generated `inner` action has no manifest worker under `/imported`, while passing the same parent action through the RSC render graph in `/prop` causes that generated action to be published and callable.
