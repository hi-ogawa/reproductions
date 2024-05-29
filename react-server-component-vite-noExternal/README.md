Quick RSC demo on Vite 5 (single process + two vite servers)

```sh
# noExternal on server
pnpm dev

# noExternal on ssr (client) with `react-server` condition on whole process
# (Thanks Jacob https://github.com/jacob-ebey/remix-express-rsc/blob/0e55d0a2beb05b781647d71f4001b7cd77e0e0b5/react-router-dev/vite.ts#L811)
pnpm dev-reverse
```
