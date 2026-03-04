<script lang="ts">
	import { page } from '$app/state';
	import GlassPanel from '$lib/components/GlassPanel.svelte';
	import { Button } from '$lib/components/ui/button';
	import { ArrowLeft, CheckCircle2 } from '@lucide/svelte';

	// Svelte 5 way to get the camp ID from the URL
	const slug = $derived(page.params.slug);
	
	// Formatting the slug for display (e.g., "ai-innovation-camp" -> "AI Innovation Camp")
	const displayTitle = $derived(slug.replace(/-/g, ' ').toUpperCase());
</script>

<svelte:head>
	<title>{displayTitle} | Steamoji Robotics</title>
</svelte:head>

<div class="min-h-screen pt-32 pb-20 px-6">
	<div class="max-w-4xl mx-auto">
		<a href="/camps" class="inline-flex items-center text-yellow-400 hover:text-white mb-8 transition-colors">
			<ArrowLeft class="w-5 h-5 mr-2" /> Back to All Camps
		</a>

		<GlassPanel class="p-12">
			<h1 class="text-4xl md:text-6xl font-display text-white mb-8">
				<span class="text-yellow-400">{displayTitle}</span>
			</h1>

			<div class="space-y-8 text-white/80 text-lg leading-relaxed">
				<p>
					Welcome to the dedicated page for the <strong>{displayTitle}</strong>. 
					This program is specifically designed to provide students with 
					hands-on experience in cutting-edge robotics technology.
				</p>

				<h2 class="text-2xl font-display text-white">Program Highlights</h2>
				<ul class="grid grid-cols-1 md:grid-cols-2 gap-4">
					{#each ['Advanced Prototyping', 'Logic Training', 'Team Competition', 'Certificate of Completion'] as item}
						<li class="flex items-center gap-3">
							<CheckCircle2 class="text-yellow-400 w-6 h-6" />
							<span>{item}</span>
						</li>
					{/each}
				</ul>
			</div>

			<div class="mt-12 pt-8 border-t border-white/10 flex justify-between items-center">
				<p class="text-white/60">Ready to start your journey?</p>
				<Button href="/contact" class="bg-yellow-400 text-black px-10 py-6 text-xl font-bold">
					Join This Camp
				</Button>
			</div>
		</GlassPanel>
	</div>
</div>