Testing https://github.com/hi-ogawa/vite-plugins/pull/899 on Next. Got the same error.

```
Failed to serialize an action for progressive enhancement:
Error: React Element cannot be passed to Server Functions from the Client without a temporary reference set. Pass a TemporaryReferenceSet to the options.
  [</>]
   ^^^
    at JSON.stringify (<anonymous>)
 ⨯ Error: Attempted to call ActionBindClient() from the server but ActionBindClient is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.
    at <unknown> (app/action-bind/client.tsx/proxy.mjs:3:23)
  1 | import { registerClientReference } from "react-server-dom-turbopack/server.edge";
  2 | export const ActionBindClient = registerClientReference(
> 3 |     function() { throw new Error("Attempted to call ActionBindClient() from the server but ActionBindClient is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component."); },
    |                       ^
  4 |     "[project]/app/action-bind/client.tsx <module evaluation>",
  5 |     "ActionBindClient",
  6 | ); {
  digest: '3086055555'
}
 POST / 500 in 217ms
```
