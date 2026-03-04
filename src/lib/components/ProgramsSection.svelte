<script lang="ts">
	import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import { ArrowRight, Cpu, Wrench, Code, Palette } from '@lucide/svelte';
	
	const programs = [
		{
			title: 'Engineering',
			description: 'Physics, Mathematics, Designing with Constraints, Mechanical Systems',
			icon: Wrench,
			color: 'text-accent-red',
			bgColor: 'bg-accent-red/10',
			borderColor: 'border-accent-red/20',
			skills: ['Physics', 'Mathematics', 'Design', 'Mechanical Systems']
		},
		{
			title: 'Fabrication',
			description: 'Computer-Aided Design, Concepting, Prototyping, 3D Printing, Laser Cutting',
			icon: Cpu,
			color: 'text-accent-yellow',
			bgColor: 'bg-accent-yellow/10',
			borderColor: 'border-accent-yellow/20',
			skills: ['CAD Design', 'Prototyping', '3D Printing', 'Laser Cutting']
		},
		{
			title: 'Physical Computing',
			description: 'Coding, Electronics, Robotics, Systems Integration',
			icon: Code,
			color: 'text-primary-blue',
			bgColor: 'bg-primary-blue/10',
			borderColor: 'border-primary-blue/20',
			skills: ['Coding', 'Electronics', 'Robotics', 'Integration']
		},
		{
			title: 'Digital Arts',
			description: 'Graphic Design, Illustration, Animation, Image & Video Editing, Sound Design',
			icon: Palette,
			color: 'text-accent-pink',
			bgColor: 'bg-accent-pink/10',
			borderColor: 'border-accent-pink/20',
			skills: ['Graphic Design', 'Animation', 'Video Editing', 'Sound Design']
		}
	];
</script>

<section class="py-20 bg-gray-50">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<!-- Section Header -->
		<div class="text-center mb-16">
			<h2 class="font-display text-3xl sm:text-4xl lg:text-5xl text-primary-blue mb-4">
				SKILL PATHWAYS
			</h2>
			<p class="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
				A New Learning Experience designed to fill the gap in structured STEAM education.
				Our 400-hour curriculum spans five years, providing kids with essential 21st-century skills.
			</p>
			<div class="inline-flex items-center bg-accent-yellow/20 px-6 py-3 rounded-full">
				<span class="font-display text-primary-blue font-semibold">Build to Solve™</span>
				<span class="ml-2 text-lg">🚀</span>
			</div>
		</div>
		
		<!-- Programs Grid -->
		<div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
			{#each programs as program}
				<Card class="group hover:shadow-xl transition-all duration-300 border-2 {program.borderColor} {program.bgColor} hover:scale-105">
					<CardHeader class="pb-4">
						<div class="flex items-center justify-between mb-4">
							<div class="p-3 rounded-lg {program.bgColor} border {program.borderColor}">
								<svelte:component this={program.icon} class="h-8 w-8 {program.color}" />
							</div>
							<ArrowRight class="h-5 w-5 text-gray-400 group-hover:text-primary-blue group-hover:translate-x-1 transition-all" />
						</div>
						<CardTitle class="font-display text-2xl {program.color}">
							{program.title}
						</CardTitle>
						<CardDescription class="text-gray-600 text-base">
							{program.description}
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div class="flex flex-wrap gap-2">
							{#each program.skills as skill}
								<Badge variant="secondary" class="bg-white/80 text-gray-700 hover:bg-white">
									{skill}
								</Badge>
							{/each}
						</div>
					</CardContent>
				</Card>
			{/each}
		</div>
		
		<!-- CTA Section -->
		<div class="text-center bg-white rounded-2xl p-8 shadow-lg border">
			<h3 class="font-display text-2xl text-primary-blue mb-4">
				Ready to Start Your Child's STEAM Journey?
			</h3>
			<p class="text-gray-600 mb-6 max-w-2xl mx-auto">
				From coding and robotics to animation and AI, Steamoji prepares students to tackle global challenges while staying ahead of the curve.
			</p>
			<div class="flex flex-col sm:flex-row gap-4 justify-center">
				<Button size="lg" class="bg-accent-yellow text-primary-blue hover:bg-accent-yellow/90 font-semibold">
					<span class="mr-2">❤</span>
					Book Your Free Trial
					<ArrowRight class="ml-2 h-5 w-5" />
				</Button>
				<Button size="lg" variant="outline" class="border-primary-blue text-primary-blue hover:bg-primary-blue hover:text-white">
					Learn More About Curriculum
				</Button>
			</div>
		</div>
	</div>
</section>
