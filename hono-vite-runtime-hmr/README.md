https://github.com/honojs/vite-plugins/pull/129

Minimal React SSR app based on https://github.com/hi-ogawa/vite-plugins/tree/main/packages/vite-plugin-ssr-middleware/examples/react

Reproduce hydration error

- `pnpm dev`
- open browser
- update `src/app.tsx` and client HMR works
- reload browser and see hydration error

See also

- https://github.com/hi-ogawa/repro-vite-runtime-ssr-react
