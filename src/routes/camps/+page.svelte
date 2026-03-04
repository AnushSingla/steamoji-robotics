<script lang="ts">
	import GlassPanel from '$lib/components/GlassPanel.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import { Calendar, MapPin, Clock } from '@lucide/svelte';

	const camps = [
		{   slug: "summer-robotics",
			title: "Summer Robotics Intensive",
			description: "A deep dive into advanced robotics manufacturing and programming for competition-ready students.",
			date: "April 15 - April 20",
			location: "IIIT Delhi",
			time: "9:00 AM - 3:00 PM",
			category: "Advanced"
		},
		{   slug: "ai-innovation",
			title: "AI & Innovation Camp",
			description: "Learn the fundamentals of Artificial Intelligence and how to integrate smart sensors into your builds.",
			date: "May 5 - May 10",
			location: "Chandigarh University",
			time: "10:00 AM - 4:00 PM",
			category: "Beginner Friendly"
		}
	];
</script>

<svelte:head>
	<title>Camps | Steamoji Robotics</title>
</svelte:head>

<div class="min-h-screen pt-32 pb-20 px-6">
	<div class="max-w-7xl mx-auto">
		<div class="text-center mb-16 animate-fade-in-up">
			<h1 class="text-4xl md:text-6xl font-display text-white mb-6">
				Build the Future: <span class="text-yellow-400">Join Our Camps</span>
			</h1>
			<p class="text-white/70 text-lg max-w-2xl mx-auto">
				Hands-on STEM experiences where imagination meets engineering. Reserve your spot today!
			</p>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
			{#each camps as camp, i}
				<div class="animate-fade-in-up" style="animation-delay: {(i + 1) * 150}ms">
					<GlassPanel class="h-full p-8 flex flex-col hover:scale-[1.02] transition-all duration-300">
						<div class="flex justify-between items-start mb-6">
							<Badge class="bg-yellow-400 text-black border-0">{camp.category}</Badge>
						</div>
						
						<h3 class="text-2xl font-display text-white mb-4">{camp.title}</h3>
						<p class="text-white/70 mb-8 flex-grow leading-relaxed">
							{camp.description}
						</p>

						<div class="space-y-4 mb-8">
							<div class="flex items-center text-white/80 gap-3">
								<Calendar class="w-5 h-5 text-yellow-400" />
								<span>{camp.date}</span>
							</div>
							<div class="flex items-center text-white/80 gap-3">
								<Clock class="w-5 h-5 text-yellow-400" />
								<span>{camp.time}</span>
							</div>
							<div class="flex items-center text-white/80 gap-3">
								<MapPin class="w-5 h-5 text-yellow-400" />
								<span>{camp.location}</span>
							</div>
						</div>
                        <Button 
                         href="/camps/{camp.slug}" 
                         variant="outline"
                        class="flex-1 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black font-bold py-4"
                         >Know More
                      </Button>
                      <br>

						<Button 
							href="/contact"
							class="w-full bg-yellow-400 text-black hover:bg-yellow-500 font-bold py-6 text-lg"
						>
							Enroll Now
						</Button>
					</GlassPanel>
				</div>
			{/each}
		</div>
	</div>
</div>