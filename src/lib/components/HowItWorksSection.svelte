<script lang="ts">
	import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';
	import { Calendar, CreditCard, Wrench, Mail } from '@lucide/svelte';
	
	const steps = [
		{
			number: '1',
			title: 'Book Sessions Online',
			description: 'Book sessions at home or on the go with our Parent App. Book up to a year in advance for ultimate flexibility and convenience.',
			icon: Calendar,
			color: 'text-accent-yellow',
			bgColor: 'bg-accent-yellow/10',
			borderColor: 'border-accent-yellow/30'
		},
		{
			number: '2',
			title: 'Badge-In',
			description: 'Your child uses a unique badge to start their session—and earns Oji coins in the process!',
			icon: CreditCard,
			color: 'text-accent-red',
			bgColor: 'bg-accent-red/10',
			borderColor: 'border-accent-red/30'
		},
		{
			number: '3',
			title: 'Project Work Time',
			description: 'Our knowledgeable facilitators will have everything set up on arrival, so your child wastes no time getting started.',
			icon: Wrench,
			color: 'text-primary-blue',
			bgColor: 'bg-primary-blue/10',
			borderColor: 'border-primary-blue/30'
		},
		{
			number: '4',
			title: 'Badge Out & Parent Email',
			description: 'Upon project completion, a facilitator will do a brief video interview with your child to discuss what they accomplished and learned. On badge out, the video is sent to you.',
			icon: Mail,
			color: 'text-accent-pink',
			bgColor: 'bg-accent-pink/10',
			borderColor: 'border-accent-pink/30'
		}
	];
</script>

<section class="py-20 bg-white">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<!-- Section Header -->
		<div class="text-center mb-16">
			<h2 class="font-display text-3xl sm:text-4xl lg:text-5xl text-primary-blue mb-4">
				HOW IT WORKS
			</h2>
			<p class="text-xl text-gray-600 max-w-3xl mx-auto">
				Our streamlined process ensures your child gets the most out of every session while keeping you informed every step of the way.
			</p>
		</div>
		
		<!-- Steps Grid -->
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
			{#each steps as step, index}
				<div class="relative">
					<!-- Connector Line (hidden on mobile, shown on larger screens) -->
					{#if index < steps.length - 1}
						<div class="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-gray-300 to-transparent transform translate-x-4 z-0"></div>
					{/if}
					
					<Card class="relative z-10 text-center hover:shadow-lg transition-all duration-300 border-2 {step.borderColor} {step.bgColor}">
						<CardHeader class="pb-4">
							<!-- Step Number Badge -->
							<div class="mx-auto mb-4 w-16 h-16 rounded-full {step.bgColor} border-2 {step.borderColor} flex items-center justify-center">
								<span class="font-display text-2xl font-bold {step.color}">
									{step.number}
								</span>
							</div>
							
							<!-- Icon -->
							<div class="mx-auto mb-4 p-3 rounded-lg {step.bgColor} border {step.borderColor} w-fit">
								<svelte:component this={step.icon} class="h-8 w-8 {step.color}" />
							</div>
							
							<CardTitle class="font-display text-xl {step.color}">
								{step.title}
							</CardTitle>
						</CardHeader>
						<CardContent>
							<CardDescription class="text-gray-600 text-sm leading-relaxed">
								{step.description}
							</CardDescription>
						</CardContent>
					</Card>
				</div>
			{/each}
		</div>
		
		<!-- Additional Info -->
		<div class="mt-16 text-center">
			<div class="bg-gradient-to-r from-accent-yellow/20 via-accent-red/20 to-accent-pink/20 rounded-2xl p-8 border border-gray-200">
				<h3 class="font-display text-2xl text-primary-blue mb-4">
					Ready to Experience the Steamoji Difference?
				</h3>
				<p class="text-gray-600 mb-6 max-w-2xl mx-auto">
					Join thousands of families who have discovered the power of hands-on STEAM learning. 
					Your child's innovation journey starts with a single session.
				</p>
				<div class="flex flex-wrap gap-2 justify-center mb-6">
					<Badge class="bg-white text-primary-blue border border-primary-blue/20">
						<span class="mr-1">🏆</span>
						Award-Winning Curriculum
					</Badge>
					<Badge class="bg-white text-primary-blue border border-accent-yellow/20">
						<span class="mr-1">👥</span>
						Expert Facilitators
					</Badge>
					<Badge class="bg-white text-primary-blue border border-accent-red/20">
						<span class="mr-1">🎯</span>
						Personalized Learning
					</Badge>
					<Badge class="bg-white text-primary-blue border border-accent-pink/20">
						<span class="mr-1">📱</span>
						Parent Updates
					</Badge>
				</div>
			</div>
		</div>
	</div>
</section>
