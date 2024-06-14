// @ts-check

import { createRequire } from "node:module";
import path from "node:path";
import { webToNodeHandler } from "@hiogawa/utils-node";

const require = createRequire(import.meta.url);

// https://webpack.js.org/configuration/configuration-types/#exporting-multiple-configurations
// https://github.com/unstubbable/mfng/blob/251b5284ca6f10b4c46e16833dacf0fd6cf42b02/apps/aws-app/webpack.config.js

export default () => {
	/**
	 * @type {import("webpack").Configuration}
	 */
	const commonConfig = {
		mode: "development",
		devtool: "source-map",
		output: {
			path: path.resolve("./dist"),
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
	};

	/**
	 * @type {import("webpack").Configuration}
	 */
	const serverConfig = {
		...commonConfig,
		name: "server",
		target: "node20",
		// TODO: https://webpack.js.org/configuration/externals
		externals: {},
		entry: {
			server: {
				import: "./src/entry-server",
				filename: "server.cjs",
				library: {
					// https://webpack.js.org/configuration/output/#outputlibrarytype
					type: "commonjs-static",
				},
			},
		},
		plugins: [
			// https://webpack.js.org/contribute/writing-a-plugin/#example
			{
				name: "MyPlugin",
				apply(compiler) {
					const name = "MyPlugin";
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
									const mod = require(path.resolve("./dist/server.cjs"));
									return mod.handler(request);
								}),
							});
							return middlewares;
						},
					};
					compiler.options.devServer = devServer;

					// https://webpack.js.org/api/compiler-hooks/
					compiler.hooks.invalid.tap(name, () => {
						// invalidate cjs
						delete require.cache[path.resolve("./dist/server.cjs")];
					});
				},
			},
		],
	};

	/**
	 * @type {import("webpack").Configuration}
	 */
	const clientConfig = {
		...commonConfig,
		name: "client",
		entry: {
			client: "./src/entry-client",
		},
	};

	return [serverConfig, clientConfig];
};
