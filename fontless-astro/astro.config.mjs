import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import { fontless } from 'fontless';

// https://astro.build/config
export default defineConfig({
	site: 'https://example.com',
	integrations: [mdx(), sitemap()],
	vite: {
		plugins: [
			fontless({
				provider: 'google',
				defaults: {
					// TODO: use preload.subsets https://github.com/unjs/fontaine/pull/655
					// preload: { subsets: ['latin'] }, 
					preload: true,
					// TODO: can be removed after https://github.com/unjs/fontaine/issues/658
					weights: ['400 700']
				},
			})
		],
	}
});
