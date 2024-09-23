- https://github.com/vitejs/vite/issues/17459
- https://gitea.com/hi-ogawa/test-vite-17459

```sh
$ pnpm --version
9.7.0

$ node -p 'path.relative(process.cwd(), require.resolve("test-vite-17459"))'
node_modules/.pnpm/test-vite-17459@git+https+++gitea.com+hi-ogawa+test-vite-17459#76ebfeb28d389f2b48ab34b7d5496c2b98b971b1/node_modules/test-vite-17459/index.js

$ pnpm dev
...
3:40:35 PM [vite] Pre-transform error: Failed to load url /node_modules/.pnpm/test-vite-17459@git+https+++gitea.com+hi-ogawa+test-vite-17459?import#76ebfeb28d389f2b48ab34b7d5496c2b98b971b1/node_modules/test-vite-17459/index.js (resolved id: /home/hiroshi/code/personal/reproductions/vite-17459-pnpm-gitea/node_modules/.pnpm/test-vite-17459@git+https+++gitea.com+hi-ogawa+test-vite-17459#76ebfeb28d389f2b48ab34b7d5496c2b98b971b1/node_modules/test-vite-17459/index.js) in /home/hiroshi/code/personal/reproductions/vite-17459-pnpm-gitea/main.js. Does the file exist?
3:40:35 PM [vite] Pre-transform error: Failed to load url /node_modules/.pnpm/slash@https+++codeload.github.com+sindresorhus+slash+tar.gz+98b618f5a3bfcb5dd374b204868818845b87bb2f?import#path++/node_modules/slash/index.js (resolved id: /home/hiroshi/code/personal/reproductions/vite-17459-pnpm-gitea/node_modules/.pnpm/slash@https+++codeload.github.com+sindresorhus+slash+tar.gz+98b618f5a3bfcb5dd374b204868818845b87bb2f#path++/node_modules/slash/index.js) in /home/hiroshi/code/personal/reproductions/vite-17459-pnpm-gitea/main.js. Does the file exist?
```

Verifying a fix on pnpm v10 https://github.com/pnpm/pnpm/pull/8499

```sh
# edit package.json to remove "packageManager"
# then run local build
$ /home/hiroshi/code/others/pnpm/pnpm/bin/pnpm.cjs i

$ node -p 'path.relative(process.cwd(), require.resolve("test-vite-17459"))'
node_modules/.pnpm/test-vite-17459@git+https+++gitea.com+hi-ogawa+test-vite-17459+76ebfeb28d389f2b48ab34b7d5496c2b98b971b1/node_modules/test-vite-17459/index.js
```
