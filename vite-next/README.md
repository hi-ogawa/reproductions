- https://github.com/hi-ogawa/vite-plugins/issues/406

From [Next.js](https://github.com/vercel/next.js) to [`@hiogawa/react-server`](https://github.com/hi-ogawa/vite-plugins/tree/main/packages/react-server)

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
-    "dev": "next dev",
-    "build": "next build",
-    "start": "next start",
+    "dev": "vite dev",
+    "build": "vite build",
+    "start": "vite preview",
     "lint": "next lint"
   },
   "dependencies": {
-    "react": "19.0.0-rc-f994737d14-20240522",
-    "react-dom": "19.0.0-rc-f994737d14-20240522",
-    "next": "15.0.0-rc.0"
+    "@hiogawa/react-server": "latest",
+    "react": "rc",
+    "react-dom": "rc",
+    "react-server-dom-webpack": "rc"
   },
   "devDependencies": {
     "typescript": "^5",
     "@types/node": "^20",
     "@types/react": "^18",
     "@types/react-dom": "^18",
+    "@vitejs/plugin-react": "^4.3.1",
+    "vite": "latest",
     "postcss": "^8",
     "tailwindcss": "^3.4.1"
   },
diff --git a/vite-next/tsconfig.json b/vite-next/tsconfig.json
index d8b9323..1cc745f 100644
--- a/vite-next/tsconfig.json
+++ b/vite-next/tsconfig.json
@@ -19,6 +19,8 @@
       }
     ],
     "paths": {
+      "next": ["./node_modules/@hiogawa/react-server/dist/next/compat"],
+      "next/*": ["./node_modules/@hiogawa/react-server/dist/next/compat/*"],
       "@/*": ["./*"]
     }
   },
```
