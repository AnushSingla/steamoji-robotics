<script lang="ts">
	import GlassPanel from '$lib/components/GlassPanel.svelte';
	import RoboticsCalendar from '$lib/components/RoboticsCalendar.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>Calendar - VEX V5 Robotics Showcase</title>
	<meta name="description" content="Stay updated with the latest news, insights, and updates from our VEX V5 robotics teams." />
</svelte:head>

<section class="min-h-screen py-20 pt-32">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<!-- Hero Section -->
		<div class="text-center mb-16">
			<GlassPanel class="p-8 max-w-4xl mx-auto">
				<h1 class="font-display text-4xl sm:text-5xl lg:text-6xl mb-6 text-white">
					Team <span class="text-accent-yellow">Calendar</span>
				</h1>
				<p class="text-xl text-gray-300 leading-relaxed">
					Stay up to date with upcoming competitions, events, and important dates for our VEX V5 robotics teams.
				</p>
			</GlassPanel>
		</div>

		<!-- Calendar -->
		<section class="mb-16">
			<RoboticsCalendar eventsState={data.eventsState} />
		</section>
	</div>
</section>