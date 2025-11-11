# context

- https://github.com/vitejs/vite-plugin-react/issues/795

## Cases

- [x] server component error https://github.com/hi-ogawa/reproductions/tree/main/next-ssr-error
- [x] server function error
- [ ] network error on rsc fetching
  - [ ] server function call
  - [ ] client side navigation

### Server function error

Steps to reproduce:
- pnpm build
- pnpm start
- go to http://localhost:3000/test-action and click "Test error"

Server function error is caught on server. Server function result (including error) is a part of RSC payload and sent back to client. E.g.

https://github.com/vercel/next.js/blob/28a14da5010ad3147a06abbabc99a119d009f733/packages/next/src/shared/lib/app-router-types.ts#L276-L315

```js
// Response from `createFromFetch` for server actions. Action's flight data can be null
export type ActionFlightResponse = {
  /** actionResult */
  a: ActionResult
  /** buildId */
  b: string
  /** flightData */
  f: FlightData
}

export type ActionResult = Promise<any>
```

### Network error

TODO
