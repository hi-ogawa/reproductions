https://github.com/vitest-dev/vitest/pull/5123#issuecomment-1949788480

```sh
# 5.1.0-beta.0
$ npm run dev

> vite-starter@0.0.0 dev
> vite

[watcher:ready] 0
[getWatched()] {
  '/home/hiroshi/code/personal/reproductions/vite-watcher-ready': [ 'vite.config.ts' ]
}
[watcher:ready] 1
[getWatched()] {
  '/home/hiroshi/code/personal/reproductions/vite-watcher-ready': [ 'vite.config.ts' ]
}
  VITE v5.1.0-beta.0  ready in 153 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help

# 5.0.12
$ npm run dev

> vite-starter@0.0.0 dev
> vite


  VITE v5.0.12  ready in 160 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
[watcher:ready] 0
[getWatched()] {
  '/home/hiroshi/code/personal/reproductions/vite-watcher-ready': [
    '.gitignore',
    'README.md',
    'index.html',
    'main.js',
    'package-lock.json',
    'package.json',
    'vite.config.ts'
  ],
  '/home/hiroshi/code/personal/reproductions': [ 'vite-watcher-ready' ]
}
```
