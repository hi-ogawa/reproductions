# context

- https://github.com/wakujs/waku/issues/1656

# example

- pnpm build
- pnpm start
- open http://localhost:3000
- click "Other" link (which uses `<Link prefetch={false}>`)
- see waterfall of two requests
  - `/other?_rsc=xxx`
  - `/_next/static/chunks/app/other/page-xxx`
