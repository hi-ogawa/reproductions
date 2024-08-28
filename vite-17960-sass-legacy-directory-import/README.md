- https://github.com/vitejs/vite/pull/17960

`canonicalize` being called twise for `@import "./dir"`, but this seems expected.

```sh
$ node src/modern.js sass
[debug:canonicalize] { url: 'virtual-entry', importer: undefined }
[debug:load] {
  url: 'file:///home/hiroshi/code/personal/reproductions/vite-17960-sass-legacy-directory-import/src/styles/main.scss'
}
[debug:canonicalize] {
  url: 'file:///home/hiroshi/code/personal/reproductions/vite-17960-sass-legacy-directory-import/src/styles/dir',
  importer: undefined
}
[debug:canonicalize] {
  url: 'dir',
  importer: 'file:///home/hiroshi/code/personal/reproductions/vite-17960-sass-legacy-directory-import/src/styles/main.scss'
}
node:internal/process/promises:391
    triggerUncaughtException(err, true /* fromPromise */);
    ^

sass.Exception [Error]: Can't find stylesheet to import.
  ╷
1 │ @import "./dir";
  │         ^^^^^^^
  ╵
  main.scss 1:9  @import
  - 1:9          root stylesheet
```
