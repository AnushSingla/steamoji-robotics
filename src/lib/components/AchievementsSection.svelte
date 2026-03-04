<script lang="ts">
	import GlassPanel from './GlassPanel.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import { Trophy, Medal, Star, Target, ArrowRight, Users } from '@lucide/svelte';

	interface Props {
		data: {
			teams: Promise<{ teams: any[] }>;
			awards: Promise<{ awards: any[] }>;
		};
	}

	let { data }: Props = $props();

	const testimonials = [
		{
			name: 'Alex Chen',
			role: 'Team Captain, 1234A',
			quote:
				'This program taught me not just about robotics, but about leadership, teamwork, and perseverance. The skills I learned here are invaluable.',
			achievement: 'Excellence Award Winner'
		},
		{
			name: 'Sarah Kim',
			role: 'Lead Programmer, 1234B',
			quote:
				"The competitive environment pushed me to become a better programmer and problem solver. I'm now studying Computer Engineering at UW.",
			achievement: 'Programming Skills Award'
		}
	];
</script>

<section class="relative overflow-hidden py-20">
	<!-- Background gradient -->
	<div
		class="from-accent-red/5 to-primary-blue/5 absolute inset-0 bg-gradient-to-tr via-transparent"
	></div>

	<div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<!-- Section Header -->
		<div class="mb-16 text-center">
			<Badge
				variant="outline"
				class="border-accent-red/30 text-accent-red mb-4 px-4 py-2 text-sm font-medium"
			>
				ACHIEVEMENTS
			</Badge>
			<h2 class="font-display mb-6 text-3xl text-white sm:text-4xl lg:text-5xl">
				Proven Track Record
			</h2>
			<p class="mx-auto max-w-3xl text-xl leading-relaxed text-gray-300">
				Our teams have consistently demonstrated excellence in competition, earning recognition for
				technical innovation, design quality, and competitive performance.
			</p>
		</div>

		<!-- Stats Grid -->
		<!-- Stats Grid -->
		<!-- <div class="mb-16 flex justify-center">
			<div class="mx-auto grid max-w-7xl grid-cols-2 gap-6 lg:grid-cols-3">
				{#await Promise.all([data.teams, data.awards])}
					<GlassPanel class="p-8 text-center">
						<div class="font-display text-accent-yellow mb-3 text-4xl font-bold lg:text-5xl">
							—
						</div>
						<div class="mb-2 font-medium text-white">Total Matches Won</div>
						<div class="text-sm text-gray-400">Across all competitions</div>
					</GlassPanel>
					<GlassPanel class="p-8 text-center">
						<div class="font-display text-accent-yellow mb-3 text-4xl font-bold lg:text-5xl">
							—
						</div>
						<div class="mb-2 font-medium text-white">Win Rate</div>
						<div class="text-sm text-gray-400">Current season average</div>
					</GlassPanel>
					<GlassPanel class="p-8 text-center">
						<div class="font-display text-accent-yellow mb-3 text-4xl font-bold lg:text-5xl">
							—
						</div>
						<div class="mb-2 font-medium text-white">Awards Earned</div>
						<div class="text-sm text-gray-400">Since program inception</div>
					</GlassPanel>
				{:then [teamsData, awardsData]}
					<GlassPanel class="hover:border-accent-yellow/30 group p-8 text-center transition-all duration-300">
						<div class="font-display text-accent-yellow mb-3 text-4xl font-bold transition-transform group-hover:scale-110 lg:text-5xl">
							0
						</div>
						<div class="mb-2 font-medium text-white">Total Matches Won</div>
						<div class="text-sm text-gray-400">Across all competitions</div>
					</GlassPanel>
					<GlassPanel class="hover:border-accent-yellow/30 group p-8 text-center transition-all duration-300">
						<div class="font-display text-accent-yellow mb-3 text-4xl font-bold transition-transform group-hover:scale-110 lg:text-5xl">
							TBD
						</div>
						<div class="mb-2 font-medium text-white">Win Rate</div>
						<div class="text-sm text-gray-400">Current season average</div>
					</GlassPanel>
					<GlassPanel class="hover:border-accent-yellow/30 group p-8 text-center transition-all duration-300">
						<div class="font-display text-accent-yellow mb-3 text-4xl font-bold transition-transform group-hover:scale-110 lg:text-5xl">
							{awardsData?.awards?.length || 0}
						</div>
						<div class="mb-2 font-medium text-white">Awards Earned</div>
						<div class="text-sm text-gray-400">Since program inception</div>
					</GlassPanel>
				{:catch error}
					<GlassPanel class="p-8 text-center">
						<div class="font-display text-accent-yellow mb-3 text-4xl font-bold lg:text-5xl">
							—
						</div>
						<div class="mb-2 font-medium text-white">Loading...</div>
						<div class="text-sm text-gray-400">Failed to load data</div>
					</GlassPanel>
				{/await}
			</div>
		</div> -->
		<!-- Achievements Grid - Currently empty as teams are just starting -->
		<div class="mb-16 text-center">
			<GlassPanel class="p-12 max-w-2xl mx-auto">
				<Trophy class="h-16 w-16 mx-auto mb-6 text-accent-yellow opacity-50" />
				<h3 class="font-display text-2xl text-white mb-4">Building Our Legacy</h3>
				<p class="text-gray-300 leading-relaxed">
					Our teams are ready to compete and earn their first awards in the upcoming season. 
					Stay tuned for updates on our achievements and accolades!
				</p>
			</GlassPanel>
		</div>

		<!-- Student Testimonials
		<div class="mb-16">
			<div class="text-center mb-12">
				<h3 class="font-display text-3xl text-white mb-4">Student Voices</h3>
				<p class="text-gray-300 max-w-2xl mx-auto">
					Hear from our team members about their experiences and achievements in competitive robotics.
				</p>
			</div>

			<div class="grid md:grid-cols-2 gap-8">
				{#each testimonials as testimonial}
					<GlassPanel class="p-8 group hover:border-primary-blue/30 transition-all duration-300">
						<div class="flex items-start mb-6">
							<div class="w-12 h-12 rounded-full bg-primary-blue/20 flex items-center justify-center mr-4 flex-shrink-0">
								<Users class="w-6 h-6 text-primary-blue" />
							</div>
							<div>
								<h4 class="font-display text-lg text-white mb-1">
									{testimonial.name}
								</h4>
								<p class="text-accent-yellow text-sm mb-1">
									{testimonial.role}
								</p>
								<Badge variant="outline" class="border-accent-red/30 text-accent-red text-xs">
									{testimonial.achievement}
								</Badge>
							</div>
						</div>
						<blockquote class="text-gray-300 italic leading-relaxed">
							"{testimonial.quote}"
						</blockquote>
					</GlassPanel>
				{/each}
			</div>
		</div>
 -->
		<!-- Call to Action -->
		<div class="text-center">
			<GlassPanel class="inline-block p-8">
				<h3 class="font-display mb-4 text-2xl text-white">Join Our Legacy of Excellence</h3>
				<p class="mb-6 max-w-md text-gray-300">
					Be part of a program that develops both technical skills and character, preparing you for
					success in STEM and beyond.
				</p>
				<div class="flex flex-col justify-center gap-4 sm:flex-row">
					<Button href="/teams" class="bg-accent-red hover:bg-accent-red/90 px-8 py-3 text-white">
						Join a Team
						<ArrowRight class="ml-2 h-4 w-4" />
					</Button>
					<Button
						variant="outline"
						href="/about"
						class="border-primary-blue/30 text-primary-blue hover:bg-primary-blue/10 px-8 py-3"
					>
						Our Story
					</Button>
				</div>
			</GlassPanel>
		</div>
	</div>
</section>
