- https://github.com/nuxt/nuxt/issues/28723
- https://github.com/vitejs/vite/issues/18111

## vite repro

```sh
$ DEBUG=vite:sourcemap pnpm dev
...
Sourcemap for "/home/hiroshi/code/personal/reproductions/vite-sass-modern-sourcemap/src/style.scss" points to missing source files
  vite:sourcemap Missing sources:
  vite:sourcemap   /home/hiroshi/code/personal/reproductions/vite-sass-modern-sourcemap/src/data:;charset=utf-8,$primary: blue;
  vite:sourcemap  +0ms
```

## sass repro

```sh
$ node repro.mjs modern
{
  css: 'body {\n  color: blue;\n}',
  map: {
    version: 3,
    sourceRoot: '',
    sources: [
      'file:///main.scss',
      'file:///home/hiroshi/code/personal/reproductions/vite-sass-modern-sourcemap/variables.scss'
    ],
    names: [],
    mappings: 'AAEI;EACE,OCHI'
  }
}

$ node repro.mjs modern-findFileUrl
{
  css: 'body {\n  color: blue;\n}',
  map: {
    version: 3,
    sourceRoot: '',
    sources: [
      'file:///main.scss',
      'file:///home/hiroshi/code/personal/reproductions/vite-sass-modern-sourcemap/variables.scss'
    ],
    names: [],
    mappings: 'AAEI;EACE,OCHI'
  }
}

$ node repro.mjs legacy
{
  css: 'body {\n  color: blue;\n}',
  map: {
    version: 3,
    sourceRoot: '/',
    sources: [
      'main.scss',
      'home/hiroshi/code/personal/reproductions/vite-sass-modern-sourcemap/variables.scss'
    ],
    names: [],
    mappings: 'AAEI;EACE,OCHI',
    file: 'main.scss'
  }
}
```
