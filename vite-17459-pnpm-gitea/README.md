- https://github.com/vitejs/vite/issues/17459
- https://gitea.com/hi-ogawa/test-vite-17459

```sh
$ pnpm --version
9.7.0

$ node -p 'path.relative(process.cwd(), require.resolve("test-vite-17459"))'
node_modules/.pnpm/test-vite-17459@git+https+++gitea.com+hi-ogawa+test-vite-17459#76ebfeb28d389f2b48ab34b7d5496c2b98b971b1/node_modules/test-vite-17459/index.js

$ pnpm dev
```
