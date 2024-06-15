Practice Webpack (SSR)

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
