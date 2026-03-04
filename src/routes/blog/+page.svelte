<script lang="ts">
	import BlogCard from "$lib/components/BlogCard.svelte";
	import GlassPanel from '$lib/components/GlassPanel.svelte';
	export let data;
</script>

<svelte:head>
	<title>Blog - VEX V5 Robotics Showcase</title>
	<meta name="description" content="Stay updated with the latest news, insights, and updates from our VEX V5 robotics teams." />
</svelte:head>

<section class="min-h-screen py-20 pt-32">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<!-- Hero Section -->
		<div class="text-center mb-16">
			<GlassPanel class="p-8 max-w-4xl mx-auto">
				<h1 class="font-display text-4xl sm:text-5xl lg:text-6xl mb-6 text-white">
					Team <span class="text-accent-yellow">Blog</span>
				</h1>
				<p class="text-xl text-gray-300 leading-relaxed">
					Stay updated with the latest news, insights, and updates from our VEX V5 robotics teams.
				</p>
			</GlassPanel>
		</div>

		<!-- Blog Posts -->
		<section class="mb-16">
			{#if data?.posts?.length === 0}
				<div class="text-center text-lg text-gray-400 py-16">
					Blog posts coming soon.
				</div>
			{:else}
				<ul class="flex flex-col items-center">
					{#each data.posts as post}
						<BlogCard {post} />
					{/each}
				</ul>
			{/if}
		</section>
	</div>
</section>