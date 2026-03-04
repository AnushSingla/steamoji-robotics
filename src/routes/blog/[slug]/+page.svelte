<script lang="ts">
	import { formatDate } from "$lib/utils";
	import { url, title } from "$lib/config";
	import GlassPanel from '$lib/components/GlassPanel.svelte';
	export let data;
</script>

<!-- SEO -->
<svelte:head>
	<title>{data.meta.title}</title>

	<link rel="canonical" href={`${url}${data.url}`} />
	<meta name="description" content={data.meta.description} />

	<meta property="og:type" content="article" />
	<meta property="og:url" content={`${url}${data.url}`} />
	<meta property="og:title" content={data.meta.title} />
	<meta property="og:description" content={data.meta.description} />
	<meta property="og:site_name" content={title} />
	<meta property="og:image" content={data.meta.image} />

	<meta name="twitter:site" content="@YouTwitterHandle" />
	<meta name="twitter:creator" content="@YouTwitterHandle" />
	<meta name="twitter:title" content={data.meta.title} />
	<meta name="twitter:description" content={data.meta.description} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:image:src" content={data.meta.image} />
	<meta name="twitter:widgets:new-embed-design" content="on" />

	<meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
	<meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)" />
</svelte:head>

<div class="min-h-screen py-20 pt-32">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<article class="max-w-4xl mx-auto">
			<!-- Title Section with Featured Image -->
			<div class="text-center mb-16">
				<GlassPanel class="overflow-hidden">
					{#if data.meta.image}
						<img src={data.meta.image} alt={data.meta.title} class="w-full h-64 object-cover" />
					{/if}
					<div class="p-8">
						<h1 class="font-display text-4xl sm:text-5xl lg:text-6xl mb-6 text-white">
							{data.meta.title}
						</h1>
						<p class="text-xl text-gray-300 leading-relaxed mb-4">
							Published on {formatDate(data.meta.date)}
						</p>
						
						<!-- Tags -->
						{#if data.meta.categories && data.meta.categories.length > 0}
							<div class="flex flex-wrap gap-2 justify-center">
								{#each data.meta.categories as category}
									<span class="px-3 py-1 bg-accent-yellow/20 text-accent-yellow rounded-full text-sm">
										#{category}
									</span>
								{/each}
							</div>
						{/if}
					</div>
				</GlassPanel>
			</div>

			<!-- Post Content -->
			<div class="prose prose-lg prose-invert max-w-none">
				<svelte:component this={data.content} />
			</div>
		</article>
	</div>
</div>