# Vite + RSC + Cloudflare D1

Based on
- https://github.com/cloudflare/workers-sdk/tree/4492eb0490588df736c25272ed2b279736462c9a/packages/vite-plugin-cloudflare/playground/prisma
- https://github.com/prisma/prisma-examples/tree/5a36a8878a40f3c7fb7ac94d844d0223e82b7fa9/generator-prisma-client/react-router-starter-cloudflare-workerd
- https://github.com/redwoodjs/sdk/blob/a386cc51a557c9d8717cc755b9fdd23612020180/sdk/src/scripts/migrate-new.mts

# example

```sh
# initialize empty d1
$ pnpm wrangler d1 migrations apply demo-db --local
✅ No migrations to apply!

# generate a migration file
$ pnpm prisma migrate diff --from-local-d1 --to-schema-datamodel ./prisma/schema.prisma --script > migrations/20250831_181525_init.sql

# apply migration
$ pnpm wrangler d1 migrations apply demo-db --local
✔ About to apply 1 migration(s)
Your database may not be available to serve requests during the migration, continue? … yes
🌀 Executing on local database demo-db (local) from .wrangler/state/v3/d1:
🌀 To execute on your remote database, add a --remote flag to your wrangler command.
🚣 2 commands executed successfully.
┌──────────────────────────┬────────┐
│ name                     │ status │
├──────────────────────────┼────────┤
│ 20250831_181525_init.sql │ ✅  

$ pnpm prisma generate
$ pnpm dev
$ pnpm build
$ pnpm preview
```
