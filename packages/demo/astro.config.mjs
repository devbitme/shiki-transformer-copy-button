// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import { addCopyButton } from '../app/src/index.js';

// https://astro.build/config
export default defineConfig({
	markdown: {
		shikiConfig: {
			theme: 'github-dark',
			wrap: true,
			transformers: [addCopyButton({
				toggleDelay: 3500,
				textCopy: 'copier',
				textSuccess: 'copié'
			})]
		},
	},
	vite: {
		plugins: [tailwindcss()]
	}
});