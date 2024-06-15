Practice Webpack (SSR)

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/hi-ogawa/reproductions/tree/main/webpack-react-ssr?file=webpack.config.js)

https://webpack-react-ssr-hiroshi.vercel.app

- [x] build server
  - [x] server build (cjs)
  - [ ] externalize more
- [x] dev server
  - server entry flushed to fs and invalidate `require.cache`
  - integrate webpack dev middleware
  - [ ] reload server
- [x] integrate client
  - [ ] hmr
- [ ] server assets
  - [x] raw and inline
  - [ ] url

```sh
# dev
pnpm dev

# local preview
pnpm build
pnpm preview

# vercel edge deploy
pnpm vc-build
pnpm vc-release
```
