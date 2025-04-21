minimal repro of https://github.com/hi-ogawa/vite-plugins/pull/735

- `pnpm build`
- open `example/repro.ts`
- "Go to implementation" of `fn` goes to `dist/index.d.ts`

Repeat after downgrading `"tsdown": "0.7.3"`

- `pnpm build-old`
- open `example/repro.ts`
- "Go to implementation" of `fn` goes to `src/index.ts`
