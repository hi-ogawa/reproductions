Regression of https://github.com/vitejs/vite/pull/17909 reported in https://github.com/userquin/vuetify-vite-modern-sass/pull/2

```sh
npm run build

x Build failed in 150ms
error during build:
[vite:css] [sass] EISDIR: illegal operation on a directory, read
  ╷
1 │ @import "./dir"
  │         ^^^^^^^
  ╵
  src/test.scss 1:9  @import
  src/main.scss 5:9  root stylesheet
file: /home/hiroshi/code/personal/reproductions/vite-17909-sass-import-directory-index/src/main.scss
```
