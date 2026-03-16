<script lang="ts">
	import HeroSection from '$lib/components/HeroSection.svelte';
	import RoboticsSection from '$lib/components/RoboticsSection.svelte';
	import CompetitionSection from '$lib/components/CompetitionSection.svelte';
	import AchievementsSection from '$lib/components/AchievementsSection.svelte';
	
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>Steamoji Robotics - VEX V5 Competitive Robotics | Bellevue, WA</title>
	<meta name="image" content="/static/logo.jpeg" />
	<meta name="twitter:image" content="/static/logo.jpeg" />
	<meta
		name="description"
		content="Steamoji Robotics is a premier VEX V5 competitive robotics program in Bellevue, WA. Training the next generation of engineers and innovators through STEAM education and competitive robotics."
	/>
	<meta
		name="keywords"
		content="VEX V5, competitive robotics, STEAM education, robotics teams, engineering, Bellevue, Washington, VEX Robotics Competition"
	/>
</svelte:head>

<HeroSection {data} />
<RoboticsSection {data}/>
<CompetitionSection {data} />
<AchievementsSection {data} />
