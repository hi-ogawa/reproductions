https://github.com/users/hi-ogawa/projects/4/views/1?pane=issue&itemId=73410910

`new URL(..., import.meta.url)` alone triggers asset copy while `new Worker(new URL(..., import.meta.url))` triggers a separate worker entry bundle.

```sh
# webpack
pnpm dev-webpack
pnpm bulid-webpack
pnpm preview-webpack

# vite
pnpm dev
pnpm bulid
pnpm preview

# implementing something similar on rollup using plugins
pnpm build-rollup
pnpm preview-rollup

# parcel
pnpm dev-parcel
pnpm build-parcel
pnpm preview-parcel
```

- https://webpack.js.org/guides/asset-modules/#url-assets
- https://webpack.js.org/guides/web-workers/
- https://github.com/vitejs/vite/pull/17837
- https://github.com/hi-ogawa/vite-plugins/tree/main/packages/pre-bundle-new-url
- https://parceljs.org/languages/javascript/#url-dependencies
- https://parceljs.org/languages/javascript/#web-workers
- https://github.com/parcel-bundler/parcel/issues/8924#issuecomment-1494488167
- https://github.com/evanw/esbuild/pull/2508
- https://github.com/lgarron/loadeverything.net

## bundler comparison

|                                                   | vite dev | vite dev (pre-bundle) | vite build | webpack    | parcel     | esbuild (PR-2508) | vite dev (pre-bundle PR-17837) |
|---------------------------------------------------|----------|-----------------------|------------|------------|------------|-------------------|--------------------------------|
| `new URL("./test.svg", import.meta.url)`            | ✅        | ❌                     | ✅          | ✅          | ✅          | ❓                 | ✅                              |
| `new URL("./test.js", import.meta.url)`             | ✅        | ❌                     | ✅          | ✅          | ✅ (bundle) | ✅ (chunk)        | ✅                              |
| `new URL("some-dep/test.svg", import.meta.url)`     | ✅        | ❌                     | ✅          | ✅          | ❌          | ❓                 | ❌                              |
| `new Worker(new URL("./test.js", import.meta.url))` | ✅        | ❌                     | ✅ (bundle) | ✅ (bundle) | ✅ (bundle) | ✅ (chunk)        | ✅ (bundle)                     |

Here ✅ without (...) means it's handled as a raw asset reference.

_Additional notes_

- Esbuild seems hesitant to use `new Worker(new URL(...))` as a trigger and condiering `new URL(...)` to cover the worker use case. However this seems to cause some issues for a raw asset reference usage.
  - https://github.com/evanw/esbuild/pull/2508#issuecomment-1486935873
  - https://github.com/evanw/esbuild/pull/2508#issuecomment-1926574877
- On Webpack and Parcel, the entire build fails when `new URL(...)` fails to resolve.
  - https://github.com/webpack/webpack/issues/16878
- None of them seem to handle `worker` export condition when bundling `new Worker(...)`.
  - https://github.com/webpack/webpack/issues/14681
  - https://github.com/vitejs/vite/issues/7439
  - Parcel doesn't even pick up `browser` condition, but technically they should be able to handle proper bundle environment separation by their `EnvironmentContext`?
- The 3rd pattern `new URL("some-dep/test.svg", import.meta.url)` might be close to what `import.meta.resolve("some-dep/test.svg")` is expected to do.
  - https://github.com/vitejs/vite/discussions/14405
  - https://github.com/evanw/esbuild/issues/2866
- Self reference worker
  - webpack: works but duplicate workers with warning `Circular dependency between chunks with runtime`
  - parcel: works
  - vite build: works by rewriting to `self.location.href`
  - esbuild: probably works?
