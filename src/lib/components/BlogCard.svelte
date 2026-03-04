<script lang="ts">import { formatDate } from "$lib/utils.js";
import { title, description, url } from "$lib/config";
export let post;
</script>

<svelte:head>
	<title>{title}</title>

	<meta name="description" content={description} />

	<meta property="og:type" content="article" />
	<meta property="og:url" content={`${url}/blog`} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:site_name" content={title} />
	<meta property="og:image" content="/blog-banner.webp" />

	<meta name="twitter:site" content="@McBride1105" />
	<meta name="twitter:creator" content="@McBride1105" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:image:src" content="/blog-banner.webp" />
	<meta name="twitter:widgets:new-embed-design" content="on" />

	<meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
	<meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)" />
</svelte:head>

{#key post.slug}
	<a class="card card-hover overflow-hidden w-full max-w-4xl mt-4" href={`/blog/${post.slug}`}>
		<header class="mb-4">
			{#if post.image}
				<img src={post.image} alt="blog banner" class="w-full h-64 object-cover rounded-sm"/>
			{/if}
		</header>

		<div class="p-4">
			<h3 class="h3 text-4xl mb-4" data-toc-ignore>{post.title}</h3>
			<article class="mb-4">
				<p>
					{post.description}
				</p>
			</article>
			
			<!-- Tags -->
			{#if post.categories && post.categories.length > 0}
				<div class="flex flex-wrap gap-2">
					{#each post.categories as category}
						<span class="px-2 py-1 bg-primary text-white rounded-full text-xs font-medium">
							#{category}
						</span>
					{/each}
				</div>
			{/if}
		</div>
		<hr class="opacity-50 mx-4" />
		<footer class="p-4 flex justify-start items-center space-x-4">
			<div class="flex-auto flex justify-between items-center">
				<h6 class="font-semibold" data-toc-ignore>By Steamoji</h6>
				<small>On {formatDate(post.date)}</small>
			</div>
		</footer>
	</a>
{/key}