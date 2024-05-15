```sh
$ DEBUG=vite:deps npm run dev -- --force
  vite:deps Crawling dependencies using entries:
  vite:deps   (my-dir)/index.html +0ms
  vite:deps Scan completed in 49.88ms:
  vite:deps   vue -> (my-dir)/node_modules/vue/dist/vue.runtime.esm-bundler.js +37ms
  vite:deps creating package.json in (my-dir)/node_modules/.vite/deps_temp_042469d1 +63ms
  vite:deps Dependencies bundled in 96.07ms +97ms
  vite:deps ✨ static imports crawl ended +942ms
  vite:deps removing cache dir (my-dir)/node_modules/.vite/deps_temp_042469d1 +794ms
  vite:deps ✨ new dependencies were found while crawling that weren't detected by the scanner +3ms
  vite:deps ✨ re-running optimizer +0ms
  vite:deps new dependencies found: vue, vue/jsx-dev-runtime +2ms
```

```sh
$ FIX_esbuildOptions=1 DEBUG=vite:deps npm run dev -- --force
  vite:deps Crawling dependencies using entries:
  vite:deps   (my-dir)/index.html +0ms
  vite:deps Scan completed in 99.74ms:
  vite:deps   vue -> (my-dir)/node_modules/vue/dist/vue.runtime.esm-bundler.js
  vite:deps   vue/jsx-dev-runtime -> (my-dir)/node_modules/vue/jsx-runtime/index.mjs +70ms
```
