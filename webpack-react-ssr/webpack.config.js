// @ts-check

import { writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import { webToNodeHandler } from "@hiogawa/utils-node";
import webpack from "webpack";

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
	const dev = !env.WEBPACK_BUILD;

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
		dependencies: ["client"],
		target: "node20",
		// TODO: https://webpack.js.org/configuration/externals
		externals: {},
		entry: {
			server: "./src/entry-server",
		},
		output: {
			path: path.resolve("./dist/server"),
			filename: "[name].js",
			library: {
				// https://webpack.js.org/configuration/output/#outputlibrarytype
				type: "module",
			},
			clean: true,
		},
		experiments: { outputModule: true },
		plugins: [
			new webpack.DefinePlugin({
				"__define.SSR": "true",
				"__define.DEV": dev,
			}),
			// https://webpack.js.org/contribute/writing-a-plugin/#example
			dev && {
				name: "dev-ssr",
				apply(compiler) {
					const name = "dev-ssr";
					const serverPath = path.resolve("./dist/server/server.js");
					let version = 0;

					/**
					 * @type {import("webpack-dev-server").Configuration}
					 */
					const devServer = {
						hot: false,
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
									const nodeHandler = webToNodeHandler(async (request) => {
										/** @type {import("./src/entry-server")} */
										const mod = await import(
											`${serverPath}?version=${version}`
										);
										return mod.handler(request);
									});
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
						version++;
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
			// https://webpack.js.org/guides/public-path/
			publicPath: "/assets",
			path: path.resolve("./dist/client/assets"),
			filename: dev ? "[name].js" : "[name].[contenthash:8].js",
			clean: true,
		},
		plugins: [
			new webpack.DefinePlugin({
				"__define.SSR": "false",
				"__define.DEV": dev,
			}),
			!dev && {
				name: "client-stats",
				apply(compilation) {
					compilation.hooks.done.tap("client-stats", (stats) => {
						const statsJson = stats.toJson({ all: false, assets: true });
						const code = `export default ${JSON.stringify(statsJson, null, 2)}`;
						writeFileSync("./dist/client/__stats.js", code);
					});
				},
			},
		],
	};

	return [serverConfig, clientConfig];
}
