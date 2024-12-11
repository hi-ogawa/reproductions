import { defineConfig } from "@rspack/cli";

export default defineConfig({
	entry: {
		main: "./src/index.js",
	},
	target: "node",
	externalsType: "module-import",
	externals: {
		'react': 'react',
		'react-dom': 'react-dom',
	},
	// static import external is supported only for esm output
	// https://rspack.dev/config/externals#externalstypemodule-import
	// experiments: {
	// 	outputModule: true
	// },
	devServer: {
		hot: false,
		devMiddleware: {
			writeToDisk: true,
		},
	},
});
