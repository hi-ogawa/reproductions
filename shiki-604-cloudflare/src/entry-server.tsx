import { App } from "./app";
import { renderToString } from "vue/server-renderer";

export async function handler(_request: Request) {
	let html: string;
	if (import.meta.env.DEV) {
		html = (await import("/index.html?raw")).default;
		html = html.replace(
			"<head>",
			`<head><script type="module" src="/@vite/client"></script>`,
		);
	} else {
		html = (await import("/dist/client/index.html?raw")).default;
	}

	const ssrHtml = await renderToString(<App />);
	html = html.replace("<body>", () => `<body><div id="root">${ssrHtml}</div>`);
	return new Response(html, {
		headers: {
			"content-type": "text/html",
		},
	});
}
