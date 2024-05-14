// cf.
// https://shiki.style/guide/install#cloudflare-workers

import { getHighlighterCore, loadWasm } from "shiki/core";
import nord from "shiki/themes/nord.mjs";
import js from "shiki/langs/javascript.mjs";

await loadWasm(import("shiki/onig.wasm"));

export default {
	async fetch() {
		const highlighter = await getHighlighterCore({
			themes: [nord],
			langs: [js],
		});

		const code = "console.log('shiki');";
		const html = highlighter.codeToHtml(code, {
			theme: "nord",
			lang: "js",
		});
		return new Response(html, { headers: { "content-type": "text/html" } });
	},
};
