Bundler comparison of `new URL(..., import.meta.url)` and `new Worker` support

```sh
# webpack
pnpm dev-webpack
pnpm bulid-webpack
pnpm preview-webpack

# vite
pnpm dev
pnpm bulid
pnpm preview

# parcel
pnpm dev-parcel
pnpm build-parcel
pnpm preview-parcel

# implementing something similar on rollup using plugins
pnpm build-rollup
pnpm preview-rollup
```

## Documentations

- Webpack
  - https://webpack.js.org/guides/asset-modules/#url-assets
  - https://webpack.js.org/guides/web-workers/
- Parcel
  - https://parceljs.org/languages/javascript/#url-dependencies
  - https://parceljs.org/languages/javascript/#web-workers
- Vite
  - https://vitejs.dev/guide/assets.html#new-url-url-import-meta-url
  - https://vitejs.dev/guide/features.html#web-workers


## Table

|                                                   | vite dev | vite dev (optimizer) | vite build | webpack    | parcel     | esbuild [PR-2508](https://github.com/evanw/esbuild/pull/2508) | vite dev (optimizer [PR-17837](https://github.com/vitejs/vite/pull/17837)) |
|---------------------------------------------------|----------|-----------------------|------------|------------|------------|-------------------|--------------------------------|
| `new URL("./test.svg", import.meta.url)`            | ✅        | ❌                     | ✅ (copy)   | ✅ (copy)   | ✅ (bundle) | ❓                 | ✅ (copy)                       |
| `new URL("./test.js", import.meta.url)`             | ✅        | ❌                     | ✅ (copy)   | ✅ (copy)   | ✅ (bundle) | ✅ (chunk)        | ✅ (copy)                        |
| `new URL("some-dep/test.svg", import.meta.url)`     | ✅        | ❌                     | ✅ (copy)   | ✅ (copy)   | ❌          | ❓                 | ❌                              |
| `new Worker(new URL("./test.js", import.meta.url))` | ✅        | ❌                     | ✅ (bundle) | ✅ (bundle) | ✅ (bundle) | ✅ (chunk)        | ✅ (bundle)                     |

### Additional notes

- Esbuild might not go with using `new Worker(new URL(...))` as a trigger. Instead it might use `new URL(...)` to cover the worker use case. However this can cause some issues for a raw asset reference usage.
  - https://github.com/evanw/esbuild/pull/2508#issuecomment-1486935873
  - https://github.com/evanw/esbuild/pull/2508#issuecomment-1926574877
- On Webpack and Parcel, the entire build fails when `new URL(...)` fails to resolve.
  - https://github.com/webpack/webpack/issues/16878
- Parcel probably handles any asset reference as "dependency" which goes through their transform pipeline. For example, `test.svg` gets minified and it's not an exact copy of original assets.
- None of them seem to handle `worker` export condition when bundling `new Worker(...)`.
  - https://github.com/webpack/webpack/issues/14681
  - https://github.com/vitejs/vite/issues/7439
  - Parcel doesn't even pick up `browser` condition, but technically they should be able to handle proper bundle environment separation by their `EnvironmentContext`. (cf. https://github.com/parcel-bundler/parcel/pull/8807)
- The 3rd pattern `new URL("some-dep/test.svg", import.meta.url)` might be close to what `import.meta.resolve("some-dep/test.svg")` is expected to do.
  - https://github.com/vitejs/vite/discussions/14405
  - https://github.com/evanw/esbuild/issues/2866
  - However, Rollup rewrites [`import.meta.ROLLUP_FILE_URL_referenceId`](https://rollupjs.org/plugin-development/#file-urls) to `new URL("some-asset-xxx.svg", import.meta.url)` without `"./"` prefix.
- Self reference worker
  - webpack: works but duplicate workers with warning `Circular dependency between chunks with runtime`
  - parcel: works
  - vite build: works by rewriting to `self.location.href`
  - esbuild: probably works?
- Glob support (e.g. ``new URL(`./images/${name}.svg`, import.meta.url)``)
  - TODO: I haven't checked yet... probably vite build and webpack support them in a similar way?

## Other links

- https://github.com/evanw/esbuild/pull/2508
- https://github.com/vitejs/vite/pull/17837
- https://github.com/parcel-bundler/parcel/issues/8924#issuecomment-1494488167
- https://github.com/lgarron/loadeverything.net
- https://github.com/hi-ogawa/vite-plugins/tree/main/packages/pre-bundle-new-url
- https://github.com/users/hi-ogawa/projects/4/views/1?pane=issue&itemId=73410910

### Things to discuss

- Should Vite wait for esbuild or rolldown to support `new URL` and `new Worker` in pre-bundling? Or should Vite try to support on top of current esbuild optimizer?
