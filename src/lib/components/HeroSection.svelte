<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { ArrowRight, Trophy, Users, Award, Target } from '@lucide/svelte';
	import GlassPanel from './GlassPanel.svelte';
	import LoadingSpinner from './LoadingSpinner.svelte';
	import ErrorState from './ErrorState.svelte';
	import { invalidate } from '$app/navigation';

	interface Props {
		data: {
			teams: Promise<{ teams: any[] }>;
			awards: Promise<{ awards: any[] }>;
		};
	}

	let { data }: Props = $props();

	const retryLoad = () => {
		invalidate('/api/teams');
		invalidate('/api/awards');
	};
</script>

<section class="relative min-h-screen flex items-center justify-center text-white overflow-hidden">
	<!-- Clean Gradient Background -->
	<div class="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-950 to-slate-900">
		<!-- Subtle overlay pattern -->
		<div class="absolute inset-0 opacity-10">
			<div class="w-full h-full" style="background-image: radial-gradient(circle, rgba(248,203,71,0.1) 1px, transparent 1px); background-size: 60px 60px;"></div>
		</div>
	</div>
	
	<div class="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
		<!-- Main Heading -->
		<div class="mb-16">
			<div class="inline-flex items-center space-x-2 bg-yellow-500/10 border border-yellow-500/20 px-4 py-2 rounded-full mb-8">
				<Trophy class="h-4 w-4 text-yellow-400" />
				<span class="text-sm font-medium text-yellow-400">VEX V5 Championship Teams</span>
			</div>
			
			<h1 class="font-display mb-8 leading-none tracking-tight">
                    <span class="block text-white text-6xl sm:text-7xl lg:text-[9rem] xl:text-[9rem]">Steamoji</span>
    
                    <span class="block  text-red-400 text-5xl sm:text-6xl lg:text-[7.5rem] xl:text-[8.2rem]">
                         Belredplus
                    </span>
           </h1>
			
			<p class="text-xl sm:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto font-light leading-relaxed">
				Building the next generation of engineers through
				<span class="text-yellow-400 font-medium">competitive robotics</span>
			</p>
			
			<div class="flex flex-col sm:flex-row gap-4 justify-center mb-20">
				<Button size="lg" class="font-semibold text-lg px-10 py-4 bg-yellow-500 text-blue-900 hover:bg-yellow-400 border-0 shadow-xl" href="/teams">
					<Users class="mr-2 h-5 w-5" />
					Meet Our Teams
					<ArrowRight class="ml-2 h-5 w-5" />
				</Button>
			</div>
		</div>
		
		<!-- Stats Section -->
		<GlassPanel class="p-8 max-w-full mx-auto">
			{#await Promise.all([data.teams, data.awards])}
				<LoadingSpinner size="lg" text="Loading team stats..." />
			{:then [teamsData, awardsData]}
			   <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-2xl mx-auto">
				   <div class="flex flex-col items-center justify-center">
					   <div class="text-4xl sm:text-5xl font-display text-yellow-400 mb-2">{teamsData?.teams?.length || 0}</div>
					   <div class="text-sm uppercase tracking-wider text-gray-400 font-medium">Active Teams</div>
				   </div>
				   <div class="flex flex-col items-center justify-center">
					   <div class="text-4xl sm:text-5xl font-display text-red-400 mb-2">{teamsData?.teams?.reduce((total, team) => total + (team.members?.length || 0), 0) || 0}</div>
					   <div class="text-sm uppercase tracking-wider text-gray-400 font-medium">Students</div>
				   </div>
				   <div class="flex flex-col items-center justify-center">
					   <div class="text-4xl sm:text-5xl font-display text-pink-400 mb-2">1</div>
					   <div class="text-sm uppercase tracking-wider text-gray-400 font-medium">Years Strong</div>
				   </div>
					<!-- <div class="flex flex-col items-center justify-center">
						<div class="text-4xl sm:text-5xl font-display text-yellow-400 mb-2">{awardsData?.awards?.length || 0}</div>
						<div class="text-sm uppercase tracking-wider text-gray-400 font-medium">Awards Won</div>
					</div> -->
				</div>
			{:catch error}
				<ErrorState 
					message="Failed to load team statistics" 
					onRetry={retryLoad}
					compact={true}
				/>
			{/await}
		</GlassPanel>
		
		<!-- Scroll Indicator -->
		<div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
			<div class="w-6 h-10 border-2 border-gray-500 rounded-full flex justify-center">
				<div class="w-1 h-3 bg-gray-500 rounded-full mt-2 animate-pulse"></div>
			</div>
		</div>
	</div>
</section>

<style>
	@keyframes float {
		0%, 100% {
			transform: translateY(0px);
		}
		50% {
			transform: translateY(-20px);
		}
	}
</style>
