export const image1 = new URL("./vite.svg", import.meta.url).href;
export const image2 = new URL("vite.svg", import.meta.url).href;

export function createImageElement() {
	const el = document.createElement("img");
	el.src = image1;
	return el;
}
