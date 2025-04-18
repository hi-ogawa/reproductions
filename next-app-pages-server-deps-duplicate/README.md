```sh
# see `[testServerState]` logged twice
pnpm dev
curl http://localhost:3000/app-router
curl http://localhost:3000/pages-router

pnpm build
pnpm start
curl http://localhost:3000/app-router
curl http://localhost:3000/pages-router
```
