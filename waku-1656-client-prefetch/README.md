# context

- https://github.com/wakujs/waku/issues/1656
- https://github.com/hi-ogawa/reproductions/tree/main/next-rsc-client-prefetch

# example

`pnpm-workspace.yaml` has `waku: 0.23.7` overrides.

- pnpm build
- pnpm start
- open http://localhost:8080/
- click "About" link
- see waterfall
  - `/RSC/R/about.txt?query=` and `/assets/rsc2-54c10a12c.js` at the same time
  - `/assets/rsc1-77d2239aa.js` comes later
