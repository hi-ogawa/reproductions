# Vite + RSC + Cloudflare D1

- https://vite-rsc-d1-demo.hiro18181.workers.dev/

# example

- Local

```sh
### Generate migration
$ pnpm drizzle-kit generate
No config path provided, using default 'drizzle.config.ts'
Reading config file '/home/hiroshi/code/personal/reproductions/vite-rsc-d1/drizzle.config.ts'
1 tables
counters 2 columns 0 indexes 0 fks

[✓] Your SQL migration file ➜ drizzle/0000_tricky_newton_destine.sql 🚀

### Apply migration
$ pnpm wrangler d1 migrations apply vite-rsc-d1-demo-db --local

 ⛅️ wrangler 4.33.1
───────────────────
Migrations to be applied:
┌────────────────────────────────┐
│ name                           │
├────────────────────────────────┤
│ 0000_tricky_newton_destine.sql │
└────────────────────────────────┘
...

$ pnpm dev
$ pnpm build
$ pnpm preview
```

- Remote

```sh
$ pnpm wrangler d1 create vite-rsc-d1-demo-db
$ pnpm wrangler d1 migrations apply vite-rsc-d1-demo-db --remote
$ pnpm build
$ pnpm wrangler deploy
```
