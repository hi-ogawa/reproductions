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
		resolve: {
			extensions: [".tsx", ".ts", "..."],
		},
		module: {
			rules: [
				// https://webpack.js.org/contribute/writing-a-loader/
				{
					test: /\.tsx?$/,
					use: path.resolve("./extra/esbuild-loader.js"),
				},
				// https://webpack.js.org/guides/asset-modules/#source-assets
				// https://webpack.js.org/guides/asset-modules/#replacing-inline-loader-syntax
				{
					resourceQuery: /raw/,
					type: "asset/source",
				},
				{
					resourceQuery: /inline/,
					type: "asset/inline",
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
		output: {
			path: path.resolve("./dist/server"),
			clean: true,
		},
		plugins: [
			// https://webpack.js.org/contribute/writing-a-plugin/#example
			{
				name: "MyPlugin",
				apply(compiler) {
					const name = "MyPlugin";
					const serverPath = path.resolve("./dist/server/server.cjs");

					/**
					 * @type {import("webpack-dev-server").Configuration}
					 */
					const devServer = {
						static: {
							serveIndex: false,
						},
						// https://github.com/webpack/webpack-dev-middleware#server-side-rendering
						devMiddleware: {
							writeToDisk: true,
							serverSideRender: true,
						},
						// https://webpack.js.org/configuration/dev-server/#devserversetupmiddlewares
						setupMiddlewares: (middlewares, _devServer) => {
							middlewares.push({
								name: "dev-ssr",
								// @ts-ignore
								middleware: (req, res, next) => {
									// TODO: pass it to server runtime?
									/** @type {import("webpack").MultiStats} */
									const stats = res.locals.webpack.devMiddleware.stats;
									const statsJson = stats.toJson();
									0 && console.log(statsJson);

									/** @type {import("./src/entry-server")} */
									const mod = require(serverPath);
									const nodeHandler = webToNodeHandler((request) =>
										mod.handler(request),
									);
									nodeHandler(req, res, next);
								},
							});
							return middlewares;
						},
					};
					compiler.options.devServer = devServer;

					// https://webpack.js.org/api/compiler-hooks/
					compiler.hooks.invalid.tap(name, () => {
						// invalidate cjs
						delete require.cache[serverPath];
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
		output: {
			path: path.resolve("./dist/client"),
			clean: true,
		},
	};

	return [serverConfig, clientConfig];
};
