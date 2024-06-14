// @ts-check
import path from "node:path";

// https://webpack.js.org/configuration/configuration-types/#exporting-multiple-configurations
// https://github.com/unstubbable/mfng/blob/251b5284ca6f10b4c46e16833dacf0fd6cf42b02/apps/aws-app/webpack.config.js

export default () => {
	/**
	 * @type {import("webpack").Configuration}
	 */
	const serverConfig = {
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
				name: "test-plugin",
				apply(compiler) {
					const name = "MyPlugin";
					// https://webpack.js.org/api/compiler-hooks/
					// console.log("[hooks]", Object.keys(compiler.hooks));

					compiler.hooks.shouldEmit.tap(name, (_) => {
						return true;
					});

					compiler.hooks.invalid.tap(name, (fileName) => {
						console.log("[invalid]", fileName);
					});
				},
			},
		],
		/**
		 * @type {import("webpack-dev-server").Configuration}
		 */
		devServer: {
			// [webpack-dev-middleware] HookWebpackError: HMR is not implemented for module chunk format yet
			hot: false,

			// https://webpack.js.org/configuration/dev-server/#devserversetupmiddlewares
			setupMiddlewares: (middlewares, _devServer) => {
				_devServer.compiler;
				// TODO: can inject ssr middleweare?
				// console.log({
				// 	middlewares,
				// 	devServer,
				// })

				// TODO: how to load server module?
				// how about tsx's namespace import?

				// middlewares.push({
				// 	name: "dev-ssr",
				// 	middleware: (req, res) => {
				// 		res.send("hello!!!!!!!!!!!");
				// 	}
				// });
				return middlewares;
			},
		},
	};

	return [serverConfig];
};
