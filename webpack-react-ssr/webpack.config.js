// @ts-check

import path from "node:path";
import { webToNodeHandler } from "@hiogawa/utils-node";

// https://webpack.js.org/configuration/configuration-types/#exporting-multiple-configurations
// https://github.com/unstubbable/mfng/blob/251b5284ca6f10b4c46e16833dacf0fd6cf42b02/apps/aws-app/webpack.config.js

export default () => {
	/**
	 * @type {import("webpack").Configuration}
	 */
	const serverConfig = {
		name: "server",
		mode: "development",
		devtool: "source-map",
		target: "node20",
		entry: {
			server: {
				import: "./src/entry-server",
				filename: "server.js",
				library: {
					// https://webpack.js.org/configuration/output/#outputlibrarytype
					type: "module",
				},
			},
		},
		experiments: {
			// esm
			outputModule: true,
		},
		output: {
			path: path.resolve("./dist"),
			clean: true,
		},
		resolve: {
			extensions: [".tsx", ".ts", "..."],
		},
		module: {
			rules: [
				// https://webpack.js.org/contribute/writing-a-loader/
				{
					test: /\.tsx$/,
					use: path.join(import.meta.dirname, "extra/esbuild-loader.js"),
				},
				// https://webpack.js.org/guides/asset-management/#loading-css
				{
					test: /\.css$/i,
					use: ["style-loader", "css-loader"],
				},
				// https://webpack.js.org/guides/asset-management/#loading-images
				{
					test: /\.(png|svg|jpg|jpeg|gif)$/i,
					type: "asset/resource",
				},
			],
		},
		plugins: [
			// https://webpack.js.org/contribute/writing-a-plugin/#example
			{
				name: "MyPlugin",
				apply(compiler) {
					const name = "MyPlugin";
					// https://webpack.js.org/api/compiler-hooks/
					// console.log("[hooks]", Object.keys(compiler.hooks));
					console.log("[MyPlugin.apply]");

					// plugin can manipulate webpack config?
					/**
					 * @type {import("webpack-dev-server").Configuration}
					 */
					const devServer = {
						hot: false,
						static: {
							serveIndex: false,
						},
						devMiddleware: {
							writeToDisk: true,
							serverSideRender: true,
						},
						setupMiddlewares: (middlewares, _devServer) => {
							// https://webpack.js.org/configuration/dev-server/#devserversetupmiddlewares
							// https://github.com/webpack/webpack-dev-middleware?tab=readme-ov-file#server-side-rendering
							middlewares.push({
								name: "dev-ssr",
								middleware: webToNodeHandler(async (request) => {
									// TODO: invalidate
									// - require.cache trick with cjs?
									// - tsx cache import?
									const mod = await import(path.resolve("./dist/server.js"));
									return mod.default(request);
								}),
							});
							return middlewares;
						},
					};
					compiler.options.devServer = devServer;

					// compiler.hooks.assetEmitted.tap(name, (...args) => {
					// 	console.log("[assetEmitted]", args);
					// });

					// compiler.hooks.shouldEmit.tap(name, (_) => {
					// 	return true;
					// });

					compiler.hooks.invalid.tap(name, (fileName) => {
						console.log("[invalid]", fileName);
					});
				},
			},
		],
	};

	return [serverConfig];
};
