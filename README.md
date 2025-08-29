# shiki-transformer-copy-button

## Install

- astro.config.mjs
```mjs
// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import { addCopyButton } from 'shiki-transformer-copy-button';

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
			})],
		},
	},
	vite: {
		plugins: [tailwindcss()]
	}
});
```

- pages/index.ts, add style
```html
<style lang="postcss" is:global>
	@reference '../styles/global.css';

	/* heading styles */
	h2 {
		@apply text-xl font-bold mb-2 select-none;
	}

	/* shiki-transformer-copy-button */
	pre:has(code) {
		@apply p-4 pt-8 rounded-md shadow relative;

		button.copy {
			@apply absolute cursor-pointer top-1 right-2 text-xs font-semibold text-white transition-opacity;

			& .ready {
				@apply flex justify-center items-center gap-1;
				> svg {
					@apply fill-white stroke-[1.5] size-4; 
				}
			}

			& .success {
				@apply hidden;
			}

			&.copied {
				@apply text-green-300;

				& .success {
					@apply flex justify-center items-center;
					> svg {
						@apply fill-green-300 stroke-[1.5] size-4; 
					}
				}

				& .ready {
					@apply hidden;
				}
			}
		}
	}
</style>
```

## options

- toggleDelay: number | undefined (default: **3000**)
- iconCopy: null | undefined (default: **copy svg icon**)
- iconSuccess: null | undefined (default: **check svg icon**)
- textCopy: string | null | undefined (default: **"copy"**)
- textSuccess: string | null | undefined (default: **"copied"**)