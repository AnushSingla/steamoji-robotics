<script lang="ts">
	import GlassPanel from '$lib/components/GlassPanel.svelte';
	import { page } from '$app/state';
</script>

<svelte:head>
	<title>{page.status} | {page.error?.message ?? 'Error'} | Steamoji Robotics</title>
	<meta name="robots" content="noindex, nofollow" />
	<meta name="description" content={page.error?.message ?? 'An unexpected error occurred.'} />
	<meta property="og:title" content={`Error ${page.status} | Steamoji Robotics`} />
	<meta property="og:description" content={page.error?.message ?? 'An unexpected error occurred.'} />
	<meta property="og:type" content="website" />
	<meta property="og:image" content="/static/logo.jpeg" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={`Error ${page.status} | Steamoji Robotics`} />
	<meta name="twitter:description" content={page.error?.message ?? 'An unexpected error occurred.'} />
	<meta name="twitter:image" content="/static/logo.jpeg" />
</svelte:head>

<div class="flex min-h-screen items-center justify-center bg-transparent">
	<GlassPanel class="max-w-lg w-full p-8 text-center">
		<h1 class="font-display text-3xl md:text-7xl text-accent-yellow mb-2">
			{page.status}
		</h1>
		<p class="text-lg text-white mb-4">
			{page.error?.message ?? 'An unexpected error occurred.'}
		</p>
		<a href="/" class="inline-block mt-4 font-medium text-primary bg-accent-yellow px-5 py-2 rounded-lg shadow hover:bg-accent-yellow/90 transition">
			Go Home
		</a>
	</GlassPanel>
</div>
