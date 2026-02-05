import { defineConfig, type Plugin } from "vite";

export default defineConfig({
	clearScreen: false,
	plugins: [webManifestTransformPlugin()],
	build: {
		assetsInlineLimit: 0,
	},
});

// cf. https://github.com/parcel-bundler/parcel/blob/31ec6830b39e4936c5c0fd6fe976ac6b9eb62604/packages/transformers/webmanifest/src/WebManifestTransformer.js
function webManifestTransformPlugin(): Plugin {
	return {
		name: webManifestTransformPlugin.name,
		apply: "build",
		buildStart() {
			this.emitFile({
				type: "chunk",
				id: "virtual:manifest.webmanifest",
				preserveSignature: "strict",
			});
		},
		resolveId(source, importer, options) {
			if (source === "virtual:manifest.webmanifest") {
				return { id: "\0" + source, moduleSideEffects: "no-treeshake" };
			}
		},
		load(id, options) {
			if (id === "\0virtual:manifest.webmanifest") {
				return `
					import iconUrl from "/src/webmanifest/icon.png?url";

					export default {
						"name": "pwa-webmanifest-example",
						"icons": [
							{
								"src": iconUrl,
								"sizes": "100x100",
								"type": "image/png"
							}
						]
					};
				`;
			}
		},
		async generateBundle(_options, bundle) {
			for (const [k, v] of Object.entries(bundle)) {
				if (
					v.type === "chunk" &&
					v.facadeModuleId === "\0virtual:manifest.webmanifest"
				) {
					// https://nodejs.org/docs/v20.16.0/api/esm.html#data-imports
					const mod = await import("data:text/javascript," + v.code);
					this.emitFile({
						type: "asset",
						fileName: "manifest.webmanifest",
						source: JSON.stringify(mod.default, null, 2),
					});
					delete bundle[k];
				}
			}
		},
		transformIndexHtml() {
			return [
				{
					injectTo: "head",
					tag: "link",
					attrs: { rel: "manifest", href: "/manifest.webmanifest" },
				},
			];
		},
	};
}
