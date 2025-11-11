# context

- https://github.com/vitejs/vite-plugin-react/issues/795

## Cases

- [x] server component error https://github.com/hi-ogawa/reproductions/tree/main/next-ssr-error
- [ ] server function error
- [ ] network error on rsc fetching
  - [ ] server function call
  - [ ] client side navigation

### Server function error

Steps to reproduce:
- pnpm build
- pnpm start
- go to http://localhost:3000/test-action and click "Test error"

Server function error is caught on server. Server function result (including error) is a part of RSC payload and sent back to client.

```js
{
  "a": ...,
  "f": ...,
  "b": ...,
}
```

### Network error

TODO
