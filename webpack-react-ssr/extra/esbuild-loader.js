import { transformWithEsbuild } from "vite";

/**
 * @type {import("webpack").LoaderDefinitionFunction<{}, {}>}
 */
export default async function loader(source) {
	const callback = this.async();
	const result = await transformWithEsbuild(source, this.resourcePath);
	callback(null, result.code, result.map);
}
