<script lang="ts">
	import { Card, CardContent } from '$lib/components/ui/card';
	import { Avatar, AvatarFallback } from '$lib/components/ui/avatar';
	import { Badge } from '$lib/components/ui/badge';
	import { Star, Quote } from '@lucide/svelte';
	
	const testimonials = [
		{
			name: 'Sarah Johnson',
			role: 'Parent of Emma (Age 9)',
			content: 'Steamoji has transformed how my daughter approaches problem-solving. She comes home excited about robotics and engineering, and I can see her confidence growing every week. The facilitators are amazing!',
			rating: 5,
			location: 'Newcastle',
			program: 'Physical Computing'
		},
		{
			name: 'Michael Chen',
			role: 'Parent of Alex (Age 12)',
			content: 'My son has been attending Steamoji for two years now. He has built incredible projects and learned skills I never imagined. The Build to Solve approach really works - he thinks like an engineer now.',
			rating: 5,
			location: 'Redmond',
			program: 'Engineering & Fabrication'
		},
		{
			name: 'Lisa Rodriguez',
			role: 'Parent of Sofia (Age 7)',
			content: 'The progress reports and videos they send are fantastic. I love seeing Sofia explain her projects - she is so articulate about complex concepts. Steamoji has exceeded all my expectations.',
			rating: 5,
			location: 'Klahanie',
			program: 'Digital Arts'
		},
		{
			name: 'David Park',
			role: 'Parent of twins Jake & Maya (Age 10)',
			content: 'Both my kids have different interests - Jake loves robotics and Maya prefers digital design. Steamoji accommodates both perfectly. The curriculum is flexible yet structured.',
			rating: 5,
			location: 'Newcastle',
			program: 'Multiple Pathways'
		}
	];
	
	const studentTestimonials = [
		{
			name: 'Emma',
			age: 9,
			content: 'I built a robot that can follow lines and avoid obstacles! My friends think it is so cool. I want to be a robotics engineer when I grow up.',
			achievement: 'Built Line-Following Robot',
			program: 'Physical Computing'
		},
		{
			name: 'Alex',
			age: 12,
			content: 'Learning CAD design was awesome. I designed and 3D printed a phone stand for my mom. She uses it every day and tells everyone I made it!',
			achievement: '3D Printed Custom Design',
			program: 'Fabrication'
		},
		{
			name: 'Sofia',
			age: 7,
			content: 'I made an animated story about a friendly robot. The facilitators helped me add sound effects and music. My family watched it like a real movie!',
			achievement: 'Created Animated Film',
			program: 'Digital Arts'
		}
	];
</script>

<section class="py-20 bg-white">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<!-- Section Header -->
		<div class="text-center mb-16">
			<h2 class="font-display text-3xl sm:text-4xl lg:text-5xl text-primary-blue mb-4">
				TESTIMONIALS
			</h2>
			<p class="text-xl text-gray-600 max-w-3xl mx-auto">
				Hear from parents and students who have experienced the Steamoji difference. 
				Real stories from real families building tomorrow's innovators.
			</p>
		</div>
		
		<!-- Parent Testimonials -->
		<div class="mb-20">
			<h3 class="font-display text-2xl text-accent-red text-center mb-8">
				From Steamoji Parents:
			</h3>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
				{#each testimonials as testimonial}
					<Card class="bg-gradient-to-br from-gray-50 to-white border border-gray-200 hover:shadow-lg transition-all duration-300">
						<CardContent class="p-6">
							<!-- Rating Stars -->
							<div class="flex items-center mb-4">
								{#each Array(testimonial.rating) as _}
									<Star class="h-4 w-4 fill-accent-yellow text-accent-yellow" />
								{/each}
							</div>
							
							<!-- Quote -->
							<div class="relative mb-6">
								<Quote class="absolute -top-2 -left-2 h-8 w-8 text-accent-yellow/30" />
								<p class="text-gray-700 italic pl-6">
									"{testimonial.content}"
								</p>
							</div>
							
							<!-- Author Info -->
							<div class="flex items-center justify-between">
								<div class="flex items-center">
									<Avatar class="h-10 w-10 mr-3">
										<AvatarFallback class="bg-primary-blue text-white font-semibold">
											{testimonial.name.split(' ').map(n => n[0]).join('')}
										</AvatarFallback>
									</Avatar>
									<div>
										<p class="font-semibold text-gray-900">{testimonial.name}</p>
										<p class="text-sm text-gray-600">{testimonial.role}</p>
									</div>
								</div>
								<div class="text-right">
									<Badge variant="secondary" class="bg-accent-yellow/20 text-primary-blue mb-1">
										{testimonial.location}
									</Badge>
									<p class="text-xs text-gray-500">{testimonial.program}</p>
								</div>
							</div>
						</CardContent>
					</Card>
				{/each}
			</div>
		</div>
		
		<!-- Student Testimonials -->
		<div>
			<h3 class="font-display text-2xl text-accent-pink text-center mb-8">
				From Steamoji Apprentices:
			</h3>
			<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
				{#each studentTestimonials as student}
					<Card class="bg-gradient-to-br from-accent-yellow/5 via-accent-red/5 to-accent-pink/5 border-2 border-gray-200 hover:border-primary-blue/30 hover:shadow-lg transition-all duration-300">
						<CardContent class="p-6 text-center">
							<!-- Avatar -->
							<Avatar class="h-16 w-16 mx-auto mb-4 border-4 border-white shadow-lg">
								<AvatarFallback class="bg-gradient-to-br from-accent-yellow to-accent-red text-white font-bold text-lg">
									{student.name[0]}
								</AvatarFallback>
							</Avatar>
							
							<!-- Student Info -->
							<h4 class="font-display text-xl text-primary-blue mb-1">{student.name}</h4>
							<p class="text-sm text-gray-600 mb-4">Age {student.age}</p>
							
							<!-- Achievement Badge -->
							<Badge class="bg-accent-yellow text-primary-blue font-semibold mb-4">
								<span class="mr-1">🏆</span>
								{student.achievement}
							</Badge>
							
							<!-- Quote -->
							<p class="text-gray-700 italic mb-4">
								"{student.content}"
							</p>
							
							<!-- Program -->
							<Badge variant="outline" class="border-primary-blue/30 text-primary-blue">
								{student.program}
							</Badge>
						</CardContent>
					</Card>
				{/each}
			</div>
		</div>
		
		<!-- CTA Section -->
		<div class="mt-16 text-center">
			<div class="bg-gradient-to-r from-primary-blue to-primary-blue/90 rounded-2xl p-8 text-white">
				<h3 class="font-display text-2xl mb-4">
					Ready to Create Your Own Success Story?
				</h3>
				<p class="text-gray-200 mb-6 max-w-2xl mx-auto">
					Join hundreds of families who have discovered the transformative power of hands-on STEAM learning. 
					Your child's innovation journey starts here.
				</p>
				<div class="flex flex-col sm:flex-row gap-4 justify-center">
					<button class="bg-accent-yellow text-primary-blue px-8 py-4 rounded-lg font-semibold hover:bg-accent-yellow/90 transition-colors">
						<span class="mr-2">❤</span>
						Book Your Free Trial Now
					</button>
					<button class="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary-blue transition-colors">
						Download Family Guide
					</button>
				</div>
			</div>
		</div>
	</div>
</section>
