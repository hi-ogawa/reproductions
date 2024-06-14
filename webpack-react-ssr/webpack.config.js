// @ts-check
import path from "node:path";

/**
 * @type {import("webpack").Configuration}
 */
export default {
	mode: "development",
	devtool: "source-map",
	target: "node20",
	entry: {
		server: {
			import: "./src/entry-server",
			filename: "server.js",
			library: {
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
				// https://webpack.js.org/api/compiler-hooks/
				console.log("[hooks]", Object.keys(compiler.hooks));
			},
		},
	],
	/**
	 * @type {import("webpack-dev-server").Configuration}
	 */
	devServer: {
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
