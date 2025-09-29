# Sveltekit + Fontless

- [Sveltekit](https://github.com/sveltejs/kit/)
- [fontless](https://github.com/unjs/fontaine/tree/main/packages/fontless)

## Setup

- Add `fontless` plugin to `vite.config.ts`

```js
import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { fontless } from 'fontless';

export default defineConfig({
	plugins: [
		sveltekit(),
		fontless({
			// options...
		})
	]
});

```

- Add font in `src/app.css`

```css
:root {
	--font-body: 'Open Sans', sans-serif;
	--font-mono: 'Fira Mono', monospace;
}
```

- Add preload links to `src/routes/+layout.svelte`

```svelte
<script lang="ts">
	import '../app.css';
	import { preloads } from "fontless/runtime";
</script>

<svelte:head>
	{#each preloads as href}
		<link rel="preload" as="font" href={href} crossorigin="anonymous" />
	{/each}
</svelte:head>
```
