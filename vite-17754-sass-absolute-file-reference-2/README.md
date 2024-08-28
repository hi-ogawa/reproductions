- https://github.com/vitejs/vite/pull/17754#issuecomment-2299415302

```js
// src/main.js
import "../node_modules/.cache/test1.scss"
```

```scss
// node_modules/.cache/test1.scss
@import "file:///abs-path-to/node_modules/.cache/test2.scss";

// node_modules/.cache/test2.scss
.test {}
```

```sh
$ npm run build
error during build:
[vite:css] [sass] Can't find stylesheet to import.
  ╷
1 │ @import "file:///home/hiroshi/code/personal/reproductions/vite-17754-sass-absolute-file-reference-2/node_modules/.cache/test2.scss";
  │         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  ╵
  node_modules/.cache/test1.scss 1:9  root stylesheet
file: /home/hiroshi/code/personal/reproductions/vite-17754-sass-absolute-file-reference-2/node_modules/.cache/test1.scss
```
