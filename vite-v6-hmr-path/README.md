Reproduction of browser hmr double module in https://github.com/hi-ogawa/vite-plugins/pull/297

- run `pnpm dev`
- open http://localhost:5173 and see http://localhost:5173/src/app.js is loaded
- modify `src/app.js` to trigger HMR
- see http://localhost:5173/full-path-to/src/app.js?t=xxx is loaded
- reload a page and see http://localhost:5173/src/app.js?t=xxx is loaded
