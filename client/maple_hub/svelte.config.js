import adapter from '@sveltejs/adapter-netlify';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import path from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter({
       edge: false,
       split: true
     }),
		inlineStyleThreshold: Infinity,
		alias: {
			$lib: path.resolve('src/lib'),
			$styles: path.resolve('src/styles'),
			$Components: path.resolve('src/Components')
		}
	}
};

export default config;
