// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Use the local source during development (NODE_ENV='dev' or 'development'),
// otherwise import the published package for production.
const stcb = (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'dev')
	? await import('../app/src/index.js')
	: await import('@devbitme/shiki-transformer-copy-button');
const { addCopyButton } = stcb;

// https://astro.build/config
export default defineConfig({
	site: 'https://devbitme.github.io',
	base: '/shiki-transformer-copy-button',
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