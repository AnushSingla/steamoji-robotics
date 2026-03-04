<script lang="ts">
	import GlassPanel from './GlassPanel.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import { Cpu, Wrench, Zap, Target, ArrowRight, Code, Award, Users } from '@lucide/svelte';

	// Accept data as a prop, similar to HeroSection
	interface Props {
		data: {
			teams: Promise<{ teams: any[] }>;
			awards: Promise<{ awards: any[] }>;
		};
	}
	let { data }: Props = $props();

	const features = [
		{
			title: 'VEX V5 Platform',
			description: 'State-of-the-art VEX V5 robotics kits with advanced sensors and motors for competitive excellence.',
			icon: Cpu,
			color: 'text-accent-red'
		},
		{
			title: 'Engineering Design',
			description: 'Learn mechanical engineering principles, CAD design, and iterative prototyping processes.',
			icon: Wrench,
			color: 'text-accent-yellow'
		},
		{
			title: 'Programming',
			description: 'Master C++ and VEXcode programming for autonomous routines and driver control.',
			icon: Code,
			color: 'text-primary-blue'
		},
		{
			title: 'Competition Ready',
			description: 'Train for VEX Robotics Competition with game strategy, alliance building, and scouting.',
			icon: Target,
			color: 'text-accent-pink'
		}
	];
</script>

<section class="py-20 relative overflow-hidden">
	<!-- Background gradient -->
	<div class="absolute inset-0 bg-gradient-to-br from-primary-blue/5 via-transparent to-accent-red/5"></div>
	
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
		<!-- Section Header -->
		<div class="text-center mb-16">
			<Badge variant="outline" class="mb-4 px-4 py-2 text-sm font-medium border-accent-yellow/30 text-accent-yellow">
				VEX V5 ROBOTICS
			</Badge>
			<h2 class="font-display text-3xl sm:text-4xl lg:text-5xl text-white mb-6">
				Competitive Robotics Excellence
			</h2>
			<p class="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
				Our VEX V5 robotics program combines cutting-edge technology with proven engineering methodologies 
				to prepare students for success in competitive robotics and future STEM careers.
			</p>
		</div>

		<!-- Stats Grid (from data prop, similar to HeroSection) -->
		{#await Promise.all([data.teams, data.awards])}
			<div class="grid grid-cols-1 gap-6 mb-16">
				<GlassPanel class="text-center p-6">
					<div class="text-gray-400 text-base">Loading stats...</div>
				</GlassPanel>
			</div>
		{:then [teamsData, awardsData]}
			{@const activeTeams = teamsData?.teams?.length || 0}
			{@const totalStudents = teamsData?.teams?.reduce((total, team) => total + (team.members?.length || 0), 0) || 0}
			{@const yearsStrong = 1}
			{@const totalAwards = awardsData?.awards?.length || 0}
			
			{@const visibleStats = [
				{ value: activeTeams, label: 'Active Teams', color: 'text-accent-yellow', show: activeTeams > 0 },
				{ value: totalStudents, label: 'Students', color: 'text-red-400', show: totalStudents > 0 },
				{ value: yearsStrong, label: 'Years Strong', color: 'text-pink-400', show: yearsStrong > 0 },
				{ value: totalAwards, label: 'Awards', color: 'text-accent-yellow', show: totalAwards > 0 }
			].filter(stat => stat.show)}
			
			{@const gridCols = visibleStats.length === 1 ? 'grid-cols-1' : 
							   visibleStats.length === 2 ? 'grid-cols-1 sm:grid-cols-2' :
							   visibleStats.length === 3 ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3' :
							   'grid-cols-2 md:grid-cols-4'}
			
			<div class="grid {gridCols} gap-6 mb-16">
				{#each visibleStats as stat}
					<GlassPanel class="text-center p-6">
						<div class="text-3xl font-display font-bold {stat.color} mb-2">{stat.value}</div>
						<div class="text-sm text-gray-300 font-medium">{stat.label}</div>
					</GlassPanel>
				{/each}
			</div>
		{:catch error}
			<div class="grid grid-cols-1 gap-6 mb-16">
				<GlassPanel class="text-center p-6">
					<div class="text-red-400 text-base">Failed to load stats</div>
				</GlassPanel>
			</div>
		{/await}

		<!-- Features Grid -->
		<div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
			{#each features as feature}
				<GlassPanel class="p-8 text-center group hover:border-accent-yellow/30 transition-all duration-300">
					<div class="w-16 h-16 mx-auto mb-6 rounded-full bg-gray-800/50 flex items-center justify-center group-hover:bg-gray-700/50 transition-colors">
						<feature.icon class={`w-8 h-8 ${feature.color}`} />
					</div>
					<h3 class="font-display text-xl text-white mb-4 group-hover:text-accent-yellow transition-colors">
						{feature.title}
					</h3>
					<p class="text-gray-300 leading-relaxed">
						{feature.description}
					</p>
				</GlassPanel>
			{/each}
		</div>

		<!-- Call to Action -->
		<div class="text-center">
			<GlassPanel class="inline-block p-8">
				<h3 class="font-display text-2xl text-white mb-4">
					Ready to Join Our Teams?
				</h3>
				<p class="text-gray-300 mb-6 max-w-md">
					Experience the excitement of competitive robotics and develop skills that will last a lifetime.
				</p>
				<div class="flex flex-col sm:flex-row gap-4 justify-center">
					<Button href="/teams" class="bg-accent-red hover:bg-accent-red/90 text-white px-8 py-3">
						View Our Teams
						<ArrowRight class="w-4 h-4 ml-2" />
					</Button>
					<Button variant="outline" href="/about" class="border-accent-yellow/30 text-accent-yellow hover:bg-accent-yellow/10 px-8 py-3">
						Learn More
					</Button>
				</div>
			</GlassPanel>
		</div>
	</div>
</section>
