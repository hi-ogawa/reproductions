# Astro + Fontless

- [Astro](https://astro.build/)
- [fontless](https://github.com/unjs/fontaine/tree/main/packages/fontless)

The example is created via:

```sh
pnpm create astro@latest -- --template blog
```

## Setup

- Add `fontless` plugin in `astro.config.mjs`

```js
import { defineConfig } from 'astro/config';
import { fontless } from 'fontless';

export default defineConfig({
	vite: {
		plugins: [
			fontless({
				// options ...
			})
		],
	}
});
```

- Remove manully added `@font-face` and only keep `font-family` in `src/styles/global.css`, e.g.

```css
body {
	font-family: "Inter", sans-serif;
}
```

- Update preload links in `src/components/BaseHead.astro`

```jsx
---
import '../styles/global.css';
import { preloads } from "fontless/runtime";
---
{preloads.map(href => <link rel="preload" href={href} as="font" type="font/woff2" crossorigin />)}
```
