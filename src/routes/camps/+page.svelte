<script lang="ts">
	import GlassPanel from '$lib/components/GlassPanel.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import { Calendar, MapPin, Clock, DollarSignIcon } from '@lucide/svelte';

	const camps = [
		{
		slug: "vex-iq robotics bootcamp",
		id: "vex-iq-preseason-2026",
		title: "VEX IQ Pre-Season Robotics Bootcamp",
		subtitle:"A Three-Week Foundational Competition Intensive Bootcamp for ",
		price: "$649/week", 
		duration: "Mon-Fri, 9:00am - 3:00pm",
		 bundlePrice: "$1,849",
		tags: ["Competitive", "Python", "Engineering"],
		description: [" Building Competitive Thinkers." , " Training Future Engineers." ," Establishing Elite Habits Early."],
       
        pillars: [
            "Movement & Mobility Mastery",
            "Scoring Systems Engineering",
            "Python Programming & Autonomous Strategy"
        ]
    },
		{
		slug: "vex-v5 bootcamp",
        id: "vex-v5-preseason-2026",
        title: "VEX V5 Bootcamp",
        subtitle: "A Three-Week High-Performance Competition Intensive Bootcamp for",
        price: "$649/week",
        bundlePrice: "$1,849",
        bundleSavings: "Save $98",
        duration: "Mon-Fri, 9:00am - 3:00pm",
        tags: ["Advanced", "C++", "VRC", "CAD"],
        description: ["Designed for high-level competition performance",
			"Competitive robotics excellence is not built during the season." ,
			          "It is built before the season begins." ,
					  
					   ] ,
        outcomes: [
            "Modular C++ Codebase (PROS)",
            "Structurally Optimized Robot",
            "Autonomous Routines Tested",
            "Clear Team Role Clarity"
        ]
    }
	];
</script>

<svelte:head>
	<title>Camps | Steamoji Robotics</title>
</svelte:head>

<div class="min-h-screen pt-32 pb-20 px-6">
	<div class="max-w-7xl mx-auto">
		<div class="text-center mb-16 ">
			<h1 class="text-4xl md:text-6xl font-display text-white mb-6">
				Build the Future: <span class="text-yellow-400">Join Our Camps</span>
			</h1>
			<p class="text-white/70 text-lg max-w-2xl mx-auto">
				Hands-on STEM experiences where imagination meets engineering. Reserve your spot today!
			</p>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
			{#each camps as camp (camp.slug)}
				<div>
					<GlassPanel class="h-full p-8 flex flex-col">
						<div class="flex justify-between items-start mb-6">
							
						</div>
						
						<h3 class="text-2xl font-display text-white mb-4">{camp.title}</h3>
						
						<p class="text-white/70 mb-8 flex-grow leading-relaxed">
							{camp.subtitle}
						</p>
						<ul class="space-y-4">
                           {#each camp.description as bullet}
                         <li class="flex items-start gap-3">
                           <span class="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-yellow-400"></span>
                           
                           <span class="text-gray-300 text-lg leading-relaxed">
                           <strong class="text-white">{bullet.split('.')[0]}</strong>
                           {bullet.split('.')[1]}
                           </span>
                        </li>
                           {/each}
                         </ul>
                        <br>
						<div class="space-y-4 mb-8">
							<div class="flex items-center text-white/80 gap-3">
								<Calendar class="w-5 h-5 text-yellow-400" />
								<span>{camp.duration}</span>
							</div>
							<div class="flex items-center text-white/80 gap-3">
								
							</div>
							<div class="flex items-center text-white/80 gap-3">
							   <div class="space-y-8">
                                    <h2 class="text-2xl font-display text-white flex items-center gap-2">
                                        Pricing
                                    </h2>
									<ul  class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
										<li class="text-xl text-white flex items-center gap-2">{camp.price}</li>
										
										

									</ul>
									<h2 class="text-2xl font-display text-white ">
                                         Bundle Pricing
                                    </h2>
									<ul  class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
										<li class="text-xl text-white flex items-center gap-2">{camp.bundlePrice}</li>
										
										

									</ul>
									
								</div>
								
								
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