Investigating Rakkasjs Vite 6 ecosystem ci failures. It looks like the issue is in [`@vavite/multibuild`](https://github.com/cyco130/vavite/tree/main/packages/multibuild) not compabilitble with Vite 6.

- Vite 6

```sh
$ node test.mjs
[testPlugin] z92orf1g6qo
[testPlugin] nasvossftv9
[buildStepStart] { who: 'nasvossftv9', forwarded: undefined }
[testPlugin] g3e986sd4eq
[buildStepStart] { who: 'g3e986sd4eq', forwarded: undefined }
vite v6.0.0-alpha.19 building for production...
✓ 1 modules transformed.
dist/client/assets/entry-client-B4xo99rY.js  0.03 kB │ gzip: 0.05 kB
✓ built in 29ms
[buildStepEnd] { who: 'g3e986sd4eq' }
[testPlugin] ftgj36tylls
[buildStepStart] { who: 'ftgj36tylls', forwarded: 'g3e986sd4eq' }
[testPlugin] 6vodngm961k
[buildStepStart] { who: '6vodngm961k', forwarded: 'g3e986sd4eq' }
[testPlugin] lkf89cq0qyq
[buildStepStart] { who: 'lkf89cq0qyq', forwarded: 'g3e986sd4eq' }
vite v6.0.0-alpha.19 building SSR bundle for production...
✓ 1 modules transformed.
dist/server/entry-server.js  0.03 kB
✓ built in 8ms
```

- Vite 5

```sh
$ node test.mjs
[testPlugin] ahx58az91he
[testPlugin] 6qoia3i99o9
[buildStepStart] { who: '6qoia3i99o9', forwarded: undefined }
vite v5.3.5 building for production...
✓ 1 modules transformed.
dist/client/assets/entry-client-B4xo99rY.js  0.03 kB │ gzip: 0.05 kB
✓ built in 26ms
[buildStepEnd] { who: '6qoia3i99o9' }
[testPlugin] wy90qak668
[buildStepStart] { who: 'wy90qak668', forwarded: '6qoia3i99o9' }
vite v5.3.5 building SSR bundle for production...
✓ 1 modules transformed.
dist/server/entry-server.js  0.03 kB
✓ built in 7ms
[buildStepEnd] { who: 'wy90qak668' }
```
