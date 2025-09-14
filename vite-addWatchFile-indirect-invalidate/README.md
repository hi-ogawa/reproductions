# context 

- https://github.com/vitejs/vite-plugin-react/pull/847

# example

- `pnpm dev` 
- open http://localhost:5173
  - see `virtual: ok (load count: 0)` on browser
- modify `dep1.js`
  - see `[invalidateModule] { id: '\x00virtual:test', softInvalidate: false }` in terminal
  - see `virtual: ok (load count: 1)` on browser (i.e. virtual `load` is re-executed)
- modify `dep2.js`
  - see `[invalidateModule] { id: '\x00virtual:test', softInvalidate: true }` in terminal
  - see `virtual: ok (load count: 1)` on browser (i.e. virtual `load` is not re-executed)
