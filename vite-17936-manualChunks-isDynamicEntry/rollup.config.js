import { defineConfig } from "rollup";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

export default defineConfig({
	input: ["./src/main.js"],
	output: {
		// this can force splitting 'firebase/firestore/dist/esm/index.esm.js'
		// experimentalMinChunkSize: 0,
		dir: "dist/rollup",
		chunkFileNames: "chunks/[name]-[hash].js",
		manualChunks: (id) => {
			const bundle = [
				// firebase/auth
				{
					keyword: "/node_modules/@firebase/auth/",
					label: "vendor_firebase_auth",
				},

				// firebase/firestore
				{
					keyword: "/node_modules/@firebase/firestore/dist/index",
					label: "vendor_firebase_firestore",
				},

				// @firebase/app, etc
				{
					keyword: "/node_modules/@firebase/app/",
					label: "vendor_firebase_app",
				},
				{
					keyword: "/node_modules/@firebase/util/",
					label: "vendor_firebase_app",
				},
				{
					keyword: "/node_modules/@firebase/logger/",
					label: "vendor_firebase_app",
				},
				{
					keyword: "/node_modules/@firebase/component/",
					label: "vendor_firebase_app",
				},
			];

			if (id.includes("/node_modules/")) {
				for (const { keyword, label } of bundle) {
					if (id.includes(keyword)) {
						return label;
					}
				}
			}
		},
	},
	plugins: [
		nodeResolve(),
		commonjs(),
		{
			name: "debug",
			renderChunk(_code, chunk) {
				console.log(chunk.name, chunk.moduleIds);
			},
		},
	],
});
