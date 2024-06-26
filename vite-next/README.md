> [!note]
> See https://github.com/hi-ogawa/rsc-on-vite/tree/main/next-ts-tw for the latest version

- https://github.com/hi-ogawa/vite-plugins/issues/406

From [Next.js](https://github.com/vercel/next.js) to [`@hiogawa/react-server`](https://github.com/hi-ogawa/vite-plugins/tree/main/packages/react-server)

[Try it on Stackblitz](https://stackblitz.com/github/hi-ogawa/reproductions/tree/main/vite-next?file=app%2Fpage.tsx)

```diff
diff --git a/vite-next/package.json b/vite-next/package.json
index 2c8e728..8bcd4a3 100644
--- a/vite-next/package.json
+++ b/vite-next/package.json
@@ -2,22 +2,26 @@
   "name": "vite-next",
   "version": "0.1.0",
   "private": true,
+  "type": "module",
   "scripts": {
     "dev": "next dev",
     "build": "next build",
     "start": "next start",
     "lint": "next lint"
   },
   "dependencies": {
-    "react": "19.0.0-rc-f994737d14-20240522",
-    "react-dom": "19.0.0-rc-f994737d14-20240522",
-    "next": "15.0.0-rc.0"
+    "@hiogawa/react-server": "latest",
+    "next": "npm:@hiogawa/react-server-next@latest",
+    "react": "rc",
+    "react-dom": "rc",
+    "react-server-dom-webpack": "rc"
   },
diff --git a/vite-next/vite.config.ts b/vite-next/vite.config.ts
new file mode 100644
index 0000000..5016373
--- /dev/null
+++ b/vite-next/vite.config.ts
@@ -0,0 +1,8 @@
+import next from "next/vite";
+
+export default {
+  plugins: [next()],
+};
```
