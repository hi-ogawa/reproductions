# context

- https://github.com/vitejs/vite-plugin-react/issues/650

# example

```sh
$ node test.js
10:44:12 AM [vite] (ssr) Forced re-optimization of dependencies
[vite] connected.
10:44:12 AM [vite] (ssr) ✨ new dependencies optimized: react/jsx-dev-runtime
10:44:12 AM [vite] (ssr) ✨ optimized dependencies changed. reloading
[vite] program reload
[debug] running main.tsx
19.1.1
[debug] running main.tsx
19.1.1
[runner.import] {
  '$$typeof': Symbol(react.transitional.element),
  type: 'div',
  key: null,
  props: { children: 'test' },
  _owner: null,
  _store: {}
}
```
