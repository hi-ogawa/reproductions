import { defineComponent } from "vue";
import { getHighlighterCore } from "shiki/core";
import shikiWasm from "shiki/wasm";

export const App = defineComponent(async () => {
	const highlighter = await getHighlighterCore({
		themes: [import("shiki/themes/vitesse-light.mjs")],
		langs: [import("shiki/langs/vue.mjs")],
		loadWasm: shikiWasm,
	});

	const html = highlighter.codeToHtml(CODE, {
		lang: "vue",
		theme: "vitesse-light",
	});

	return () => (
		<div
			style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
		>
			<h4>Shiki + Cloudflare Workers + Vite SSR</h4>
			<div
				style={{ border: "1px solid #aaa", padding: "0 1rem 1rem 1rem" }}
				innerHTML={html}
			/>
		</div>
	);
});

const CODE = `
<script setup>
import { ref } from 'vue'

const msg = ref('Hello World!')
</script>

<template>
  <h1>{{ msg }}</h1>
  <input v-model="msg" />
</template>
`;
