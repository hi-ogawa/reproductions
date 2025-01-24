## context

- https://github.com/vitest-dev/vitest/issues/7345

## reproductions

- Vite 5

```sh
$ ssr=true node repro.js
>>> transformRequest("/src/entry.js", { ssr: true })
[transform] entry.js
[transform] dep.js

$ ssr=false node repro.js
>>> transformRequest("/src/entry.js")
[transform] entry.js
[transform] dep.js

$ ssr=true preTransformRequests=true node repro.js
>>> transformRequest("/src/entry.js", { ssr: true })
[transform] entry.js
[transform] dep.js

$ ssr=false preTransformRequests=true node repro.js
>>> transformRequest("/src/entry.js")
[transform] entry.js
[transform] dep.js

$ ssr=true preTransformRequests=false node repro.js
>>> transformRequest("/src/entry.js", { ssr: true })
[transform] entry.js

$ ssr=false preTransformRequests=false node repro.js
>>> transformRequest("/src/entry.js")
[transform] entry.js
```

- Vite 6

```sh
# ⚠️ ssr became no pre transform by default.
# could it be related to a perf issue? https://github.com/vitejs/vite/discussions/19171
$ ssr=true node repro.js
>>> transformRequest("/src/entry.js", { ssr: true })
[transform] entry.js

$ ssr=false node repro.js
>>> transformRequest("/src/entry.js")
[transform] entry.js
[transform] dep.js

# ⚠️ `server.preTransformRequests: true` doesn't enable ssr pre transform
$ ssr=true preTransformRequests=true node repro.js
>>> transformRequest("/src/entry.js", { ssr: true })
[transform] entry.js

$ ssr=false preTransformRequests=true node repro.js
>>> transformRequest("/src/entry.js")
[transform] entry.js
[transform] dep.js

$ ssr=true preTransformRequests=false node repro.js
>>> transformRequest("/src/entry.js", { ssr: true })
[transform] entry.js

# ⚠️ `server.preTransformRequests: false` doesn't disable client pre transform
$ ssr=false preTransformRequests=false node repro.js
>>> transformRequest("/src/entry.js")
[transform] entry.js
[transform] dep.js
```
