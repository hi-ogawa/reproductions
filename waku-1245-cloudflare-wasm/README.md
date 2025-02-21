## context

https://github.com/dai-shi/waku/issues/1245

## notes

Need to patch https://github.com/dai-shi/waku/blob/29af481f1937abc34ef8cdec4a312f5edd5947d7/packages/waku/src/lib/builder/build.ts#L392-L394 to prevent `.wasm` assets to be moved from rsc build to client build. See `./patches/waku.patch`.

```sh
pnpm cf-build
pnpm cf-preview
pnpm cf-deploy
```

Deployed at https://waku-1245-cloudflare-wasm.hiro18181.workers.dev
