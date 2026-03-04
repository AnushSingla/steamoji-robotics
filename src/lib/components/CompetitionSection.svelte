<script lang="ts">
	import GlassPanel from './GlassPanel.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import { Trophy, Calendar, MapPin, Users, ArrowRight, Award } from '@lucide/svelte';
	import LoadingSpinner from './LoadingSpinner.svelte';
	import ErrorState from './ErrorState.svelte';
	import { invalidate } from '$app/navigation';
	import type { EventsLoadingState } from '$lib/utils/events';

	interface Props {
		data: {
			eventsState: Promise<EventsLoadingState>;
			awards: Promise<{ awards: any[] }>;
		};
	}

	let { data }: Props = $props();

	const retryLoad = () => {
		invalidate('/api/events');
		invalidate('/api/awards');
	};

	function formatDate(iso: string) {
		const date = new Date(iso);
		return date.toLocaleDateString('en-US', {
			weekday: 'long',
			month: 'long',
			day: 'numeric',
			year: 'numeric'
		});
	}

	// Convert calendar events back to API format for display
	function calendarEventToDisplayEvent(calendarEvent: any) {
		return {
			name: calendarEvent.title,
			start: calendarEvent.start,
			end: calendarEvent.end,
			location: {
				venue: calendarEvent.extendedProps.location.split(' - ')[0] || 'Venue TBD',
				city: calendarEvent.extendedProps.location.split(' - ')[1]?.split(', ')[0] || 'City TBD',
				region: calendarEvent.extendedProps.location.split(', ')[1] || 'Region TBD'
			},
			teams: calendarEvent.extendedProps.teams || [],
			level: calendarEvent.extendedProps.program || 'Regional'
		};
	}
</script>

<section class="relative overflow-hidden py-20">
	<!-- Background pattern -->
	<div class="absolute inset-0 opacity-5">
		<div
			class="absolute inset-0"
			style="background-image: radial-gradient(circle at 2px 2px, white 1px, transparent 0); background-size: 40px 40px;"
		></div>
	</div>

	<div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<!-- Section Header -->
		<div class="mb-16 text-center">
			<Badge
				variant="outline"
				class="border-primary-blue/30 text-primary-blue mb-4 px-4 py-2 text-sm font-medium"
			>
				COMPETITION SEASON
			</Badge>
			<h2 class="font-display mb-6 text-3xl text-white sm:text-4xl lg:text-5xl">
				Compete at the Highest Level
			</h2>
			<p class="mx-auto max-w-3xl text-xl leading-relaxed text-gray-300">
				Our teams compete in VEX Robotics Competitions throughout the Pacific Northwest, striving
				for excellence and sportsmanship at every event.
			</p>
		</div>

		<div class="grid gap-12 lg:grid-cols-2">
			<!-- Upcoming Events -->
			<div>
				<div class="mb-8 flex items-center">
					<Calendar class="text-accent-yellow mr-3 h-6 w-6" />
					<h3 class="font-display text-2xl text-white">Upcoming Events</h3>
				</div>

				<div class="space-y-6">
					{#await data.eventsState}
						<GlassPanel class="p-6">
							<LoadingSpinner size="md" text="Loading upcoming events..." />
						</GlassPanel>
					{:then eventsState}
						{#if eventsState.isLoading}
							<GlassPanel class="p-6">
								<LoadingSpinner size="md" text="Loading upcoming events..." />
							</GlassPanel>
						{:else if eventsState.error}
							<ErrorState 
								message={eventsState.error.message} 
								onRetry={retryLoad}
								compact={true}
							/>
						{:else}
							{@const upcomingEvents = eventsState.events.filter(event => new Date(event.start) >= new Date()).slice(0, 3).map(calendarEventToDisplayEvent)}
							{#if upcomingEvents.length === 0}
								<GlassPanel class="p-6">
									<div class="text-center text-gray-400">
										<Calendar class="h-8 w-8 mx-auto mb-2 opacity-50" />
										<p class="text-sm">No upcoming events scheduled</p>
									</div>
								</GlassPanel>
							{:else}
								{#each upcomingEvents as event}
									<GlassPanel class="hover:border-accent-yellow/30 group p-6 transition-all duration-300">
										<div class="mb-4 flex items-start justify-between">
											<div>
												<h4
													class="font-display group-hover:text-accent-yellow mb-2 text-lg text-white transition-colors"
												>
													{event.name}
												</h4>
												<div class="mb-1 flex items-center text-sm text-gray-300">
													<Calendar class="mr-2 h-4 w-4" />
													{formatDate(event.start)}
												</div>
												<div class="flex items-center text-sm text-gray-300">
													<MapPin class="mr-2 h-4 w-4" />
													{event.location.venue}, {event.location.city}, {event.location.region}
												</div>
											</div>
											<Badge
												class={event.level === 'World' || event.level === 'Signature'
													? 'bg-accent-red text-white'
													: 'bg-primary-blue/20 text-primary-blue'}
											>
												{event.level}
											</Badge>
										</div>
										{#if event.teams && event.teams.length > 0}
											<div>
												<div class="text-accent-yellow mb-2 flex items-center">
													<Users class="mr-2 h-4 w-4" />
													<span class="text-sm font-medium">Teams Competing</span>
												</div>
												<div class="flex flex-wrap gap-2">
													{#each event.teams as team}
														<Badge
															variant="outline"
															class="border border-[#ffcc34]/30 text-xs text-[#ffcc34]"
														>
															{team}
														</Badge>
													{/each}
												</div>
											</div>
										{/if}
									</GlassPanel>
								{/each}
							{/if}
						{/if}
					{:catch error}
						<ErrorState 
							message="Failed to load upcoming events" 
							onRetry={retryLoad}
							compact={true}
						/>
					{/await}
				</div>
			</div>

			<!-- Recent Achievements -->
			<div>
				<div class="mb-8 flex items-center">
					<Trophy class="text-accent-red mr-3 h-6 w-6" />
					<h3 class="font-display text-2xl text-white">Recent Awards</h3>
				</div>

				<div class="space-y-6">
					{#await data.awards}
						<GlassPanel class="p-6">
							<LoadingSpinner size="md" text="Loading recent awards..." />
						</GlassPanel>
					{:then awardsData}
						{@const recentAwards = awardsData?.awards?.slice(0, 4) || []}
						{#if recentAwards.length === 0}
							<GlassPanel class="p-6">
								<div class="text-center text-gray-400">
									<Trophy class="h-8 w-8 mx-auto mb-2 opacity-50" />
									<p class="text-sm">No recent awards to display</p>
								</div>
							</GlassPanel>
						{:else}
							{#each recentAwards as award}
								<GlassPanel class="hover:border-accent-red/30 group p-6 transition-all duration-300">
									<div class="flex items-start">
										<div
											class="bg-accent-red/20 group-hover:bg-accent-red/30 mr-4 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full transition-colors"
										>
											<Award class="text-accent-red h-6 w-6" />
										</div>
										<div class="flex-1">
											<h4
												class="font-display group-hover:text-accent-red mb-2 text-lg text-white transition-colors"
											>
												{award.title}
											</h4>
											<p class="mb-1 text-sm text-gray-300">
												{award.event}
											</p>
											<div class="flex items-center justify-between">
												<span class="text-accent-yellow text-sm font-medium">
													{award.team}
												</span>
												<span class="text-xs text-gray-400">
													{formatDate(award.date)}
												</span>
											</div>
										</div>
									</div>
								</GlassPanel>
							{/each}
						{/if}
					{:catch error}
						<ErrorState 
							message="Failed to load recent awards" 
							onRetry={retryLoad}
							compact={true}
						/>
					{/await}
				</div>

				<!-- View All Button -->
				<div class="mt-8">
					<Button
						href="/teams"
						variant="outline"
						class="border-accent-red/30 text-accent-red hover:bg-accent-red/10 w-full"
					>
						View All Team Awards
						<ArrowRight class="ml-2 h-4 w-4" />
					</Button>
				</div>
				
			</div>

			<!-- View Calendar Button -->
			<div class="lg:col-span-2">
				<div class="mt-8 text-center">
					<Button
						size="lg"
						href="/calendar"
						class="bg-accent-yellow text-primary-blue hover:bg-accent-yellow/90 px-10 py-4 font-semibold text-lg shadow-xl"
					>
						View Calendar
						<Calendar class="ml-2 h-5 w-5" />
					</Button>
				</div>
			</div>

		</div>
	</div>
</section>
