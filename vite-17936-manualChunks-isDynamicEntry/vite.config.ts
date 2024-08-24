import { defineConfig } from "vite";

export default defineConfig({
	build: {
		outDir: "dist/vite",
		minify: false,
		manifest: true,
		rollupOptions: {
			output: {
				manualChunks: (id: string) => {
					const bundle: { keyword: string; label: string }[] = [
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

					if (id.includes("node_modules")) {
						for (const { keyword, label } of bundle) {
							if (id.includes(keyword)) {
								return label;
							}
						}
					}
				},
			},
		},
	},
	plugins: [
		{
			name: "debug",
			renderChunk(_code, chunk) {
				console.log(chunk.name, chunk.moduleIds);
			},
		},
	],
});
