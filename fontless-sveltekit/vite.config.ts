import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { fontless } from 'fontless';

export default defineConfig({
	plugins: [
		sveltekit(),
		fontless({
			provider: 'google',
			defaults: {
					// TODO: use preload.subsets https://github.com/unjs/fontaine/pull/655
					// preload: { subsets: ['latin'] }, 
					preload: true,
			}
		})
	]
});
