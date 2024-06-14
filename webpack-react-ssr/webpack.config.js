import path from "node:path";
import HtmlWebpackPlugin from "html-webpack-plugin";

/**
 * @type {import("webpack").Configuration}
 */
export default {
	mode: "development",
	devtool: "source-map",
	entry: "./src/index.tsx",
	plugins: [
		new HtmlWebpackPlugin({
			template: "index.html",
		}),
	],
	output: {
		filename: "[name].bundle.js",
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
	/**
	 * @type {import("webpack-dev-server").Configuration}
	 */
	devServer: {
		// https://webpack.js.org/configuration/dev-server/#devserversetupmiddlewares
		setupMiddlewares: (middlewares, devServer) => {
			// TODO: can inject ssr middleweare?
			// console.log({
			// 	middlewares,
			// 	devServer,
			// })
			return middlewares;
		},
	},
};
