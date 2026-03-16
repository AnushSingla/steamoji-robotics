<script lang="ts">
	import GlassPanel from '$lib/components/GlassPanel.svelte';
	
	import { Trophy, Users, Target, Zap } from '@lucide/svelte';
</script>

<svelte:head>
	<title>About - VEX V5 Robotics Showcase</title>
	<meta name="description" content="Learn about our VEX V5 competitive robotics program, our mission, and what makes our teams successful." />
</svelte:head>

<section class="min-h-screen py-20 pt-32">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<!-- Hero Section -->
		<div class="text-center mb-16">
			<GlassPanel class="p-8 max-w-4xl mx-auto">
				<h1 class="font-display text-4xl sm:text-5xl lg:text-6xl mb-6 text-white">
					About Our <span class="text-accent-yellow">VEX V5</span> Program
				</h1>
				<p class="text-xl text-gray-300 leading-relaxed">
					We're a competitive VEX V5 robotics program dedicated to excellence in engineering, 
					programming, and teamwork. Our teams compete at the highest levels while fostering 
					innovation and STEM education.
				</p>
			</GlassPanel>
		</div>

		<!-- Mission & Values -->
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
			<GlassPanel class="p-8">
				<div class="flex items-center space-x-3 mb-6">
					<Target class="h-8 w-8 text-accent-yellow" />
					<h2 class="font-display text-2xl text-white">Our Mission</h2>
				</div>
				<p class="text-gray-300 leading-relaxed mb-4">
					To inspire and prepare the next generation of engineers, programmers, and innovators 
					through competitive robotics. We believe in hands-on learning, creative problem-solving, 
					and building skills that extend far beyond the competition field.
				</p>
				<p class="text-gray-300 leading-relaxed">
					Every robot we build, every challenge we tackle, and every competition we enter 
					serves to develop critical thinking, teamwork, and technical expertise in our students.
				</p>
			</GlassPanel>

			<GlassPanel class="p-8">
				<div class="flex items-center space-x-3 mb-6">
					<Zap class="h-8 w-8 text-[var(--color-accent-red)]" />
					<h2 class="font-display text-2xl text-white">What We Do</h2>
				</div>
				<div class="space-y-4">
					<div class="flex items-start space-x-3">
						<div class="w-2 h-2 bg-[var(--color-accent-yellow)] rounded-full mt-2 flex-shrink-0"></div>
						<div>
							<h3 class="font-semibold text-white mb-1">Design & Build</h3>
							<p class="text-sm text-gray-300">Engineer innovative robots for VEX V5 competitions</p>
						</div>
					</div>
					<div class="flex items-start space-x-3">
						<div class="w-2 h-2 bg-[var(--color-accent-red)] rounded-full mt-2 flex-shrink-0"></div>
						<div>
							<h3 class="font-semibold text-white mb-1">Program & Code</h3>
							<p class="text-sm text-gray-300">Develop autonomous and driver control programs</p>
						</div>
					</div>
					<div class="flex items-start space-x-3">
						<div class="w-2 h-2 bg-[var(--color-accent-pink)] rounded-full mt-2 flex-shrink-0"></div>
						<div>
							<h3 class="font-semibold text-white mb-1">Compete & Excel</h3>
							<p class="text-sm text-gray-300">Participate in regional, state, and world championships</p>
						</div>
					</div>
					<div class="flex items-start space-x-3">
						<div class="w-2 h-2 bg-[var(--color-accent-yellow)] rounded-full mt-2 flex-shrink-0"></div>
						<div>
							<h3 class="font-semibold text-white mb-1">Learn & Grow</h3>
							<p class="text-sm text-gray-300">Develop 21st-century skills and STEM expertise</p>
						</div>
					</div>
				</div>
			</GlassPanel>
		</div>

		<!-- Core Values -->
		<div class="mb-16">
			<GlassPanel class="p-8">
				<h2 class="font-display text-3xl text-white text-center mb-8">Core Values</h2>
				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
					<div class="text-center">
						<div class="w-16 h-16 bg-[var(--color-accent-yellow)]/20 rounded-full flex items-center justify-center mx-auto mb-4">
							<Trophy class="h-8 w-8 text-[var(--color-accent-yellow)]" />
						</div>
						<h3 class="font-display text-lg mb-2" style="color: var(--color-accent-yellow);">Excellence</h3>
						<p class="text-sm text-gray-300">Striving for the highest standards in everything we do</p>
					</div>
					<div class="text-center">
						<div class="w-16 h-16 bg-[var(--color-accent-red)]/20 rounded-full flex items-center justify-center mx-auto mb-4">
							<Users class="h-8 w-8 text-[var(--color-accent-red)]" />
						</div>
						<h3 class="font-display text-lg mb-2" style="color: var(--color-accent-red);">Teamwork</h3>
						<p class="text-sm text-gray-300">Collaboration and mutual support drive our success</p>
					</div>
					<div class="text-center">
						<div class="w-16 h-16 bg-[var(--color-accent-pink)]/20 rounded-full flex items-center justify-center mx-auto mb-4">
							<Zap class="h-8 w-8 text-[var(--color-accent-pink)]" />
						</div>
						<h3 class="font-display text-lg mb-2" style="color: var(--color-accent-pink);">Innovation</h3>
						<p class="text-sm text-gray-300">Creative solutions and continuous improvement</p>
					</div>
					<div class="text-center">
						<div class="w-16 h-16 bg-[var(--color-accent-yellow)]/20 rounded-full flex items-center justify-center mx-auto mb-4">
							<Target class="h-8 w-8 text-[var(--color-accent-yellow)]" />
						</div>
						<h3 class="font-display text-lg mb-2" style="color: var(--color-accent-yellow);">Focus</h3>
						<p class="text-sm text-gray-300">Dedication to our goals and continuous learning</p>
					</div>
				</div>
			</GlassPanel>
		</div>

		<!-- Competition History -->
         		<!--
        <div class="mb-16">
			<GlassPanel class="p-8">
                
				<h2 class="font-display text-3xl text-white text-center mb-8">Competition Highlights</h2>
				<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
					<Card class="bg-white/5 border-white/10">
						<CardHeader>
							<CardTitle class="text-white flex items-center space-x-2">
								<Trophy class="h-5 w-5 text-[var(--color-accent-yellow)]" />
								<span>2023-2024 Season</span>
							</CardTitle>
						</CardHeader>
						<CardContent class="space-y-3">
							<div class="flex justify-between items-center">
								<span class="text-gray-300">World Championship</span>
								<Badge variant="secondary" class="bg-[var(--color-accent-yellow)]/20 text-[var(--color-accent-yellow)]">Qualified</Badge>
							</div>
							<div class="flex justify-between items-center">
								<span class="text-gray-300">State Championship</span>
								<Badge variant="secondary" class="bg-[var(--color-accent-red)]/20 text-[var(--color-accent-red)]">1st Place</Badge>
							</div>
							<div class="flex justify-between items-center">
								<span class="text-gray-300">Excellence Award</span>
								<Badge variant="secondary" class="bg-[var(--color-accent-pink)]/20 text-[var(--color-accent-pink)]">Winner</Badge>
							</div>
						</CardContent>
					</Card>

					<Card class="bg-white/5 border-white/10">
						<CardHeader>
							<CardTitle class="text-white flex items-center space-x-2">
								<Trophy class="h-5 w-5 text-[var(--color-accent-red)]" />
								<span>2022-2023 Season</span>
							</CardTitle>
						</CardHeader>
						<CardContent class="space-y-3">
							<div class="flex justify-between items-center">
								<span class="text-gray-300">Regional Champions</span>
								<Badge variant="secondary" class="bg-[var(--color-accent-yellow)]/20 text-[var(--color-accent-yellow)]">Multiple</Badge>
							</div>
							<div class="flex justify-between items-center">
								<span class="text-gray-300">Skills Champion</span>
								<Badge variant="secondary" class="bg-[var(--color-accent-red)]/20 text-[var(--color-accent-red)]">Regional</Badge>
							</div>
							<div class="flex justify-between items-center">
								<span class="text-gray-300">Design Award</span>
								<Badge variant="secondary" class="bg-[var(--color-accent-pink)]/20 text-[var(--color-accent-pink)]">State</Badge>
							</div>
						</CardContent>
					</Card>

					<Card class="bg-white/5 border-white/10">
						<CardHeader>
							<CardTitle class="text-white flex items-center space-x-2">
								<Trophy class="h-5 w-5 text-[var(--color-accent-pink)]" />
								<span>Overall Stats</span>
							</CardTitle>
						</CardHeader>
						<CardContent class="space-y-3">
							<div class="flex justify-between items-center">
								<span class="text-gray-300">Total Awards</span>
								<Badge variant="secondary" class="bg-[var(--color-accent-yellow)]/20 text-[var(--color-accent-yellow)]">25+</Badge>
							</div>
							<div class="flex justify-between items-center">
								<span class="text-gray-300">Competitions</span>
								<Badge variant="secondary" class="bg-[var(--color-accent-red)]/20 text-[var(--color-accent-red)]">45+</Badge>
							</div>
							<div class="flex justify-between items-center">
								<span class="text-gray-300">Years Active</span>
								<Badge variant="secondary" class="bg-[var(--color-accent-pink)]/20 text-[var(--color-accent-pink)]">3</Badge>
							</div>
						</CardContent>
					</Card>
				</div>
			</GlassPanel>
		</div>
    -->
	</div>
</section>