export const imageUrl = new URL("./vite.svg", import.meta.url).href;

export function createImageElement() {
	const el = document.createElement("img");
	el.src = imageUrl;
	return el;
}
