https://github.com/users/hi-ogawa/projects/4/views/1?pane=issue&itemId=90149585

### turbopack

- `.next/server/chunks/ssr/[root of the server]__f93bc5._.js`

```js
module.exports = {
	"[externals]/argon2 [external] (argon2, cjs)": function (
		__turbopack_context__,
	) {
		var {
			r: __turbopack_require__,
			f: __turbopack_module_context__,
			i: __turbopack_import__,
			s: __turbopack_esm__,
			v: __turbopack_export_value__,
			n: __turbopack_export_namespace__,
			c: __turbopack_cache__,
			M: __turbopack_modules__,
			l: __turbopack_load__,
			j: __turbopack_dynamic__,
			P: __turbopack_resolve_absolute_path__,
			U: __turbopack_relative_url__,
			R: __turbopack_resolve_module_id_path__,
			b: __turbopack_worker_blob_url__,
			g: global,
			__dirname,
			x: __turbopack_external_require__,
			y: __turbopack_external_import__,
			m: module,
			e: exports,
			t: __turbopack_require_real__,
		} = __turbopack_context__;
		{
			const mod = __turbopack_external_require__("argon2", () =>
				require("argon2"),
			);

			module.exports = mod;
		}
	},
	"[externals]/@vitejs/test-esm-only [external] (@vitejs/test-esm-only, esm_import)":
		(__turbopack_context__) => {
			"use strict";

			var {
				r: __turbopack_require__,
				f: __turbopack_module_context__,
				i: __turbopack_import__,
				s: __turbopack_esm__,
				v: __turbopack_export_value__,
				n: __turbopack_export_namespace__,
				c: __turbopack_cache__,
				M: __turbopack_modules__,
				l: __turbopack_load__,
				j: __turbopack_dynamic__,
				P: __turbopack_resolve_absolute_path__,
				U: __turbopack_relative_url__,
				R: __turbopack_resolve_module_id_path__,
				b: __turbopack_worker_blob_url__,
				g: global,
				__dirname,
				a: __turbopack_async_module__,
				x: __turbopack_external_require__,
				y: __turbopack_external_import__,
				z: __turbopack_require_stub__,
			} = __turbopack_context__;
			__turbopack_async_module__(
				async (
					__turbopack_handle_async_dependencies__,
					__turbopack_async_result__,
				) => {
					try {
						const mod = await __turbopack_external_import__(
							"@vitejs/test-esm-only",
						);

						__turbopack_export_namespace__(mod);
						__turbopack_async_result__();
					} catch (e) {
						__turbopack_async_result__(e);
					}
				},
				true,
			);
		},
	"[project]/app/page.js [app-rsc] (ecmascript)": (__turbopack_context__) => {
		"use strict";

		var {
			r: __turbopack_require__,
			f: __turbopack_module_context__,
			i: __turbopack_import__,
			s: __turbopack_esm__,
			v: __turbopack_export_value__,
			n: __turbopack_export_namespace__,
			c: __turbopack_cache__,
			M: __turbopack_modules__,
			l: __turbopack_load__,
			j: __turbopack_dynamic__,
			P: __turbopack_resolve_absolute_path__,
			U: __turbopack_relative_url__,
			R: __turbopack_resolve_module_id_path__,
			b: __turbopack_worker_blob_url__,
			g: global,
			__dirname,
			a: __turbopack_async_module__,
			x: __turbopack_external_require__,
			y: __turbopack_external_import__,
			z: __turbopack_require_stub__,
		} = __turbopack_context__;
		__turbopack_async_module__(
			async (
				__turbopack_handle_async_dependencies__,
				__turbopack_async_result__,
			) => {
				try {
					__turbopack_esm__({
						default: () => Home,
					});
					var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$1$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ =
						__turbopack_import__(
							"[project]/node_modules/.pnpm/next@15.1.0_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)",
						);
					var __TURBOPACK__imported__module__$5b$externals$5d2f$argon2__$5b$external$5d$__$28$argon2$2c$__cjs$29$__ =
						__turbopack_import__("[externals]/argon2 [external] (argon2, cjs)");
					var __TURBOPACK__imported__module__$5b$externals$5d2f40$vitejs$2f$test$2d$esm$2d$only__$5b$external$5d$__$2840$vitejs$2f$test$2d$esm$2d$only$2c$__esm_import$29$__ =
						__turbopack_import__(
							"[externals]/@vitejs/test-esm-only [external] (@vitejs/test-esm-only, esm_import)",
						);
					var __turbopack_async_dependencies__ =
						__turbopack_handle_async_dependencies__([
							__TURBOPACK__imported__module__$5b$externals$5d2f40$vitejs$2f$test$2d$esm$2d$only__$5b$external$5d$__$2840$vitejs$2f$test$2d$esm$2d$only$2c$__esm_import$29$__,
						]);
					[
						__TURBOPACK__imported__module__$5b$externals$5d2f40$vitejs$2f$test$2d$esm$2d$only__$5b$external$5d$__$2840$vitejs$2f$test$2d$esm$2d$only$2c$__esm_import$29$__,
					] = __turbopack_async_dependencies__.then
						? (await __turbopack_async_dependencies__)()
						: __turbopack_async_dependencies__;
					function Home() {
            ...
```

## externalized indirect dependency not supported

```
 ⚠ ./node_modules/.pnpm/@vitejs+test-external-indirect@file+deps+external-indirect/node_modules/@vitejs/test-external-indirect
Package @node-rs/bcrypt can't be external
The request @node-rs/bcrypt matches serverExternalPackages (or the default list).
The request could not be resolved by Node.js from the project directory.
Packages that should be external need to be installed in the project directory, so they can be resolved from the output files.
Try to install it into the project directory by running npm install @node-rs/bcrypt from the project directory.
```
