// @ts-check

import { createRequire } from "node:module";
import path from "node:path";
import { webToNodeHandler } from "@hiogawa/utils-node";

// require server code for dev ssr
// TODO: try import("?timestamp") trick for esm output?
const require = createRequire(import.meta.url);

// https://webpack.js.org/configuration/configuration-types/
// https://github.com/unstubbable/mfng/blob/251b5284ca6f10b4c46e16833dacf0fd6cf42b02/apps/aws-app/webpack.config.js

/**
 * @param {{ WEBPACK_SERVE?: boolean, WEBPACK_BUILD?: boolean }} env
 * @param {unknown} _argv
 * @returns {import("webpack").Configuration[]}
 */
export default function (env, _argv) {
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
				{
					test: /\.tsx?$/,
					use: "esbuild-loader",
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
			server: "./src/entry-server",
		},
		output: {
			path: path.resolve("./dist/server"),
			filename: "[name].cjs",
			library: {
				// https://webpack.js.org/configuration/output/#outputlibrarytype
				type: "commonjs-static",
			},
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
						host: "localhost",
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
									// TODO: how to pass it to server runtime?
									/** @type {import("webpack").MultiStats} */
									const stats = res.locals.webpack.devMiddleware.stats;
									const statsJson = stats.toJson();
									// console.log(statsJson)

									const clientStats = statsJson.children?.find(
										(s) => s.name === "client",
									);
									0 &&
										console.log(JSON.stringify(clientStats?.assets, null, 2));
									// 0 && console.log(statsJson);

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
						// TODO: also trigger browser reload?
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
			filename: env.WEBPACK_BUILD ? "[name].[contenthash:8].js" : "[name].js",
			clean: true,
		},
	};

	return [serverConfig, clientConfig];
}
