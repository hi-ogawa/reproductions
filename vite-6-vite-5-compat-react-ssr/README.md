https://github.com/vitejs/vite/pull/16471

Hydration error reproduction after Client HMR

- `pnpm dev`
- load page
- edit `root.tsx` and see client hmr works
- reload and see hydration error

It works fine when `USE_RUNNER=1 pnpm dev`
