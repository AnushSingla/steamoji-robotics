import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex, escapeSvelte } from "mdsvex"
import { bundledLanguages, getSingletonHighlighter } from "shiki"
import rehypeUnwrapImages from "rehype-unwrap-images"
import remarkToc from "remark-toc"
import rehypeSlug from "rehype-slug"

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
	extensions: [".md"],
	highlight: {
		highlighter: async (code, lang = "text") => {
			const highlighter = await getSingletonHighlighter({
				themes: ["one-dark-pro"],
				langs: Object.keys(bundledLanguages),
			})
			const html = escapeSvelte(highlighter.codeToHtml(code, { lang, theme: "one-dark-pro" }))
			return `{@html \`${html}\` }`
		},
	},
	remarkPlugins: [[remarkToc, { tight: true }]],
	rehypePlugins: [rehypeUnwrapImages, rehypeSlug],
}


/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	extensions: [".svelte", ".md"],
	preprocess: [vitePreprocess(), mdsvex(mdsvexOptions)],

	kit: {
		// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://svelte.dev/docs/kit/adapters for more information about adapters.
		adapter: adapter(),
		paths: {
			relative: false, // Required for PostHog session replay to work correctly
		},
	}
};

export default config;
