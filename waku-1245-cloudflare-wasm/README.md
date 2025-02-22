Deployed at https://waku-1245-cloudflare-wasm.hiro18181.workers.dev

## notes

- `./waku.config.ts`
  - Use `vitePluginWasmModule({ buildMode: "import" })` to process wasm to match Cloudflare wasm semantics.
- `./src/pages/index.tsx`
  - Shiki setup example with custom wasm loading.
- `./patches/waku.patch`
  - Need to patch https://github.com/dai-shi/waku/blob/29af481f1937abc34ef8cdec4a312f5edd5947d7/packages/waku/src/lib/builder/build.ts#L392-L394 to prevent `.wasm` assets to be moved from rsc build to client build.
- `./wasm-loader.js`
  - Additionally, this custom loader allows importing `.wasm` on NodeJS for pre-rendering (though I haven't actually tested).

```sh
pnpm cf-build
pnpm cf-preview
pnpm cf-deploy
```

## references

- https://github.com/dai-shi/waku/issues/1245
- https://github.com/hi-ogawa/vite-plugins/tree/main/packages/server-asset#vitepluginwasmmodule
- https://github.com/hi-ogawa/vite-plugins/blob/6eb7fb954a935a0b05fa2b043f6636654c83059f/packages/react-server/examples/basic/src/routes/test/wasm/page.tsx
- https://rsc-experiment.hiro18181.workers.dev/test/wasm
