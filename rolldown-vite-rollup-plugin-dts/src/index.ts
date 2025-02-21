import type { TransformResult } from "vite";

export const test = (): void => {
	let result!: TransformResult;
	if (result.map && "sources" in result.map) {
		result.map.sources.map((source) => {
			console.log(source);
		});
	}
};
