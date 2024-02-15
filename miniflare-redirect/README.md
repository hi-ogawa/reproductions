https://github.com/hi-ogawa/vite-plugins/issues/127

```sh
$ node main.js https://example.local/ok
[workerd] request.url = https://example.local/ok
[node] response {
  status: 200,
  headers: {
    'content-length': '30',
    'content-type': 'text/plain;charset=UTF-8'
  },
  text: 'Hello https://example.local/ok'
}

# same for https://example.local/redirect-absolute
$ node main.js https://example.local/redirect
[workerd] request.url = https://example.local/redirect
[workerd] request.url = https://example.local/redirect
[workerd] request.url = https://example.local/redirect
[workerd] request.url = https://example.local/redirect
[workerd] request.url = https://example.local/redirect
[workerd] request.url = https://example.local/redirect
[workerd] request.url = https://example.local/redirect
[workerd] request.url = https://example.local/redirect
[workerd] request.url = https://example.local/redirect
[workerd] request.url = https://example.local/redirect
[workerd] request.url = https://example.local/redirect
[workerd] request.url = https://example.local/redirect
[workerd] request.url = https://example.local/redirect
[workerd] request.url = https://example.local/redirect
[workerd] request.url = https://example.local/redirect
[workerd] request.url = https://example.local/redirect
[workerd] request.url = https://example.local/redirect
[workerd] request.url = https://example.local/redirect
[workerd] request.url = https://example.local/redirect
[workerd] request.url = https://example.local/redirect
[workerd] request.url = https://example.local/redirect
/home/hiroshi/code/personal/reproductions/miniflare-redirect/node_modules/.pnpm/undici@5.28.3/node_modules/undici/index.js:112
        Error.captureStackTrace(err, this)
              ^

TypeError: fetch failed
    at fetch (/home/hiroshi/code/personal/reproductions/miniflare-redirect/node_modules/.pnpm/undici@5.28.3/node_modules/undici/index.js:112:15)
    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
    at async fetch2 (/home/hiroshi/code/personal/reproductions/miniflare-redirect/node_modules/.pnpm/miniflare@3.20240129.2/node_modules/miniflare/dist/src/index.js:4128:20)
    at async Miniflare.dispatchFetch (/home/hiroshi/code/personal/reproductions/miniflare-redirect/node_modules/.pnpm/miniflare@3.20240129.2/node_modules/miniflare/dist/src/index.js:8617:22)
    at async file:///home/hiroshi/code/personal/reproductions/miniflare-redirect/main.js:22:18 {
  cause: Error: redirect count exceeded
      at makeNetworkError (/home/hiroshi/code/personal/reproductions/miniflare-redirect/node_modules/.pnpm/undici@5.28.3/node_modules/undici/lib/fetch/response.js:352:9)
      at httpRedirectFetch (/home/hiroshi/code/personal/reproductions/miniflare-redirect/node_modules/.pnpm/undici@5.28.3/node_modules/undici/lib/fetch/index.js:1141:28)
      at httpFetch (/home/hiroshi/code/personal/reproductions/miniflare-redirect/node_modules/.pnpm/undici@5.28.3/node_modules/undici/lib/fetch/index.js:1090:24)
      at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
      at async /home/hiroshi/code/personal/reproductions/miniflare-redirect/node_modules/.pnpm/undici@5.28.3/node_modules/undici/lib/fetch/index.js:600:16
      at async mainFetch (/home/hiroshi/code/personal/reproductions/miniflare-redirect/node_modules/.pnpm/undici@5.28.3/node_modules/undici/lib/fetch/index.js:584:16)
      at async httpFetch (/home/hiroshi/code/personal/reproductions/miniflare-redirect/node_modules/.pnpm/undici@5.28.3/node_modules/undici/lib/fetch/index.js:1090:18)
      at async /home/hiroshi/code/personal/reproductions/miniflare-redirect/node_modules/.pnpm/undici@5.28.3/node_modules/undici/lib/fetch/index.js:600:16
      at async mainFetch (/home/hiroshi/code/personal/reproductions/miniflare-redirect/node_modules/.pnpm/undici@5.28.3/node_modules/undici/lib/fetch/index.js:584:16)
      at async httpFetch (/home/hiroshi/code/personal/reproductions/miniflare-redirect/node_modules/.pnpm/undici@5.28.3/node_modules/undici/lib/fetch/index.js:1090:18)
}
```
