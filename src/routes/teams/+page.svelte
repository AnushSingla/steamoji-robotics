<script lang="ts">
	import GlassPanel from '$lib/components/GlassPanel.svelte';
	import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
	import ErrorState from '$lib/components/ErrorState.svelte';
	import {
		Trophy,
		Users,
		Calendar,
		Award,
		Target,
		ArrowRight,
		Zap,
		Code,
		Wrench
	} from '@lucide/svelte';
	import { invalidate } from '$app/navigation';

	interface Props {
		data: {
			teams: Promise<{ teams: any[] }>;
			events: Promise<{ events: any[] }>;
		};
	}

	let { data }: Props = $props();

	const retryLoadTeams = () => {
		invalidate('/api/teams');
	};

	const retryLoadEvents = () => {
		invalidate('/api/events');
	};
</script>

<svelte:head>
	<title>Teams - VEX V5 Robotics Showcase</title>
	<meta
		name="description"
		content="Meet our competitive VEX V5 robotics teams, their achievements, and the talented students who make up our program."
	/>
</svelte:head>

<section class="min-h-screen py-20 pt-32">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<!-- Hero Section -->
		<div class="mb-16 text-center">
			<GlassPanel class="mx-auto max-w-4xl p-8">
				<h1 class="font-display mb-6 text-4xl text-white sm:text-5xl lg:text-6xl">
					Our <span style="color: var(--color-accent-yellow);">VEX</span> Teams
				</h1>
				<p class="mb-6 text-xl leading-relaxed text-gray-300">
					Meet the talented students and competitive teams that represent our robotics program at
					regional, state, and world championship levels.
				</p>
				<div class="flex flex-wrap justify-center gap-4 text-sm">
					{#await data.teams}
						<LoadingSpinner size="sm" text="Loading stats..." />
					{:then teamsData}
						{#if teamsData?.teams}
							{@const v5Teams = teamsData.teams.filter((team: any) => team.type === 'V5')}
							{@const iqTeams = teamsData.teams.filter((team: any) => team.type === 'IQ')}
							{@const totalMembers = v5Teams.reduce((total: number, team: any) => total + (team.members?.length || 0), 0)}
							{@const totalAwards = teamsData.teams.reduce((total: number, team: any) => total + (team.achievements?.length || 0), 0)}
							<Badge variant="secondary" class="bg-yellow-500/20 text-yellow-400">{v5Teams.length} V5 Teams</Badge>
							<Badge variant="secondary" class="bg-purple-500/20 text-purple-400">{iqTeams.length} IQ Teams</Badge>
							<Badge variant="secondary" class="bg-red-500/20 text-red-400">{totalMembers} Team Members</Badge>
							<Badge variant="secondary" class="bg-pink-500/20 text-pink-400">{totalAwards} Awards</Badge>
						{:else}
							<Badge variant="secondary" class="bg-red-500/20 text-red-400">No teams data</Badge>
						{/if}
					{:catch error}
						<Badge variant="secondary" class="bg-red-500/20 text-red-400">Failed to load data</Badge>
					{/await}
				</div>
			</GlassPanel>
		</div>

		<!-- Season Overview -->
		<div class="mb-16">
			<GlassPanel class="p-8">
				<div class="grid grid-cols-1 gap-8 text-center md:grid-cols-3">
					<div>
						<div
							class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-yellow-500/20"
						>
							<Trophy class="h-8 w-8 text-yellow-400" />
						</div>
						<h3 class="font-display mb-2 text-xl text-white">2025-2026 Season</h3>
						<p class="text-sm text-gray-300">Push Back</p>
					</div>
					<div>
						<div
							class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/20"
						>
							<Target class="h-8 w-8 text-red-400" />
						</div>
						<h3 class="font-display mb-2 text-xl text-white">Next Competition</h3>
						{#await data.events}
							<LoadingSpinner size="sm" text="Loading..." />
						{:then eventsData}
							{@const nextEvent = eventsData?.events?.filter((event: any) => new Date(event.start) >= new Date())?.sort((a: any, b: any) => new Date(a.start).getTime() - new Date(b.start).getTime())[0]}
							{#if nextEvent}
								<p class="text-sm text-gray-300">{nextEvent.name}</p>
							{:else}
								<p class="text-sm text-gray-400">No upcoming events</p>
							{/if}
						{:catch error}
							<p class="text-sm text-red-400">Failed to load</p>
						{/await}
					</div>
					<div>
						<div
							class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-pink-500/20"
						>
							<Award class="h-8 w-8 text-pink-400" />
						</div>
						<h3 class="font-display mb-2 text-xl text-white">Season Highlights</h3>
						<p class="text-sm text-gray-300">TBD</p>
					</div>
				</div>
			</GlassPanel>
		</div>

		<!-- V5 Teams Grid -->
		<div class="mb-12">
			<div class="mb-6">
				<h2 class="font-display text-3xl text-white mb-2">VEX V5 Teams</h2>
				<p class="text-gray-300">Our competitive high school robotics teams</p>
			</div>
			<div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
				{#await data.teams}
					<div class="col-span-full">
						<GlassPanel class="p-8">
							<LoadingSpinner size="lg" text="Loading team information..." />
						</GlassPanel>
					</div>
				{:then teamsData}
					{@const v5Teams = teamsData?.teams?.filter((team: any) => team.type === 'V5') || []}
					{#if v5Teams.length > 0}
						{#each v5Teams as team}
						<GlassPanel class="p-6">
							<Card class="border-none bg-transparent shadow-none">
								<CardHeader>
									<div class="mb-4 flex items-start justify-between">
										<div>
											<CardTitle class="font-display mb-2 text-2xl text-white">
												{team.name}
											</CardTitle>
											<div class="flex items-center space-x-3 text-sm text-gray-300">
												<span
													class="rounded bg-{team.color || 'yellow'}-500/20 px-2 py-1 font-mono font-bold text-{team.color || 'yellow'}-400"
												>
													{team.id}
												</span>
												<span>•</span>
												<span>{team.location}</span>
											</div>
										</div>
									</div>
									{#if team.description}
									<p class="text-sm leading-relaxed text-gray-300">
										{team.description}
									</p>
									{/if}
								</CardHeader>

								<CardContent class="space-y-6">
									<!-- Robot Info -->
									<div class="rounded-lg bg-white/5 p-4">
										<div class="flex items-center space-x-2">
											<Wrench class="h-4 w-4 text-yellow-400" />
											<h4 class="font-semibold text-white">Robot: {team.robot?.name || 'Robot'}</h4>
										</div>
									</div>

									<!-- Team Members -->
									<div>
										<div class="mb-3 flex items-center space-x-2">
											<Users class="h-4 w-4 text-red-400" />
											<h4 class="font-semibold text-white">Team Members</h4>
										</div>
										{#if team.members && team.members.length > 0}
											<div class="grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
												{#each team.members as member}
													<div class="flex items-center justify-between rounded bg-white/5 px-3 py-2">
														<div>
															<div class="font-medium text-white">{member.name}</div>
														</div>
														<div class="text-xs text-gray-400">{member.grade}</div>
													</div>
												{/each}
											</div>
										{:else}
											<div class="rounded bg-white/5 px-4 py-3 text-center">
												<p class="text-sm text-gray-400">Coming Soon</p>
											</div>
										{/if}
									</div>

									<!-- Achievements -->
									<div>
										<div class="mb-3 flex items-center space-x-2">
											<Trophy class="h-4 w-4 text-pink-400" />
											<h4 class="font-semibold text-white">Achievements</h4>
										</div>
										<div class="grid grid-cols-1 gap-2">
											{#if team.achievements && team.achievements.length > 0}
												{#each team.achievements as achievement}
													<div class="flex items-center space-x-2 text-sm">
														<div class="h-2 w-2 flex-shrink-0 rounded-full bg-yellow-400"></div>
														<span class="text-gray-300">{achievement}</span>
													</div>
												{/each}
											{:else}
												<div class="text-sm text-gray-400">0 awards - stay tuned for updates!</div>
											{/if}
										</div>
									</div>
								</CardContent>
							</Card>
						</GlassPanel>
						{/each}
					{:else}
						<div class="col-span-full">
							<GlassPanel class="p-8">
								<div class="text-center text-gray-400">
									<Users class="h-12 w-12 mx-auto mb-4 opacity-50" />
									<p>No V5 teams found</p>
								</div>
							</GlassPanel>
						</div>
					{/if}
				{:catch error}
					<div class="col-span-full">
						<ErrorState 
							message="Failed to load team information" 
							onRetry={retryLoadTeams}
						/>
					</div>
				{/await}
			</div>
		</div>

		<!-- IQ Teams Grid -->
		<div class="mb-16">
			<div class="mb-6">
				<h2 class="font-display text-3xl text-white mb-2">VEX IQ Teams</h2>
				<p class="text-gray-300">Our competitive middle school robotics teams</p>
			</div>
			<div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
				{#await data.teams}
					<div class="col-span-full">
						<GlassPanel class="p-8">
							<LoadingSpinner size="lg" text="Loading team information..." />
						</GlassPanel>
					</div>
				{:then teamsData}
					{@const iqTeams = teamsData?.teams?.filter((team: any) => team.type === 'IQ') || []}
					{#if iqTeams.length > 0}
						{#each iqTeams as team}
							<GlassPanel class="p-6">
								<Card class="border-none bg-transparent shadow-none">
									<CardHeader>
										<div class="mb-4 flex items-start justify-between">
											<div>
												<CardTitle class="font-display mb-2 text-2xl text-white">
													{team.name}
												</CardTitle>
												<div class="flex items-center space-x-3 text-sm text-gray-300">
													<span
														class="rounded bg-{team.color || 'yellow'}-500/20 px-2 py-1 font-mono font-bold text-{team.color || 'yellow'}-400"
													>
														{team.id}
													</span>
													<span>•</span>
													<span>{team.location}</span>
												</div>
											</div>
										</div>
										{#if team.description}
										<p class="text-sm leading-relaxed text-gray-300">
											{team.description}
										</p>
										{/if}
									</CardHeader>

									<CardContent class="space-y-6">
										<!-- Robot Info -->
										<div class="rounded-lg bg-white/5 p-4">
											<div class="flex items-center space-x-2">
												<Wrench class="h-4 w-4 text-yellow-400" />
												<h4 class="font-semibold text-white">Robot: {team.robot?.name || 'Robot'}</h4>
											</div>
										</div>

										<!-- Team Members -->
										<div>
											<div class="mb-3 flex items-center space-x-2">
												<Users class="h-4 w-4 text-red-400" />
												<h4 class="font-semibold text-white">Team Members</h4>
											</div>
											{#if team.members && team.members.length > 0}
												<div class="grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
													{#each team.members as member}
														<div class="flex items-center justify-between rounded bg-white/5 px-3 py-2">
															<div>
																<div class="font-medium text-white">{member.name}</div>
															</div>
															<div class="text-xs text-gray-400">{member.grade}</div>
														</div>
													{/each}
												</div>
											{:else}
												<div class="rounded bg-white/5 px-4 py-3 text-center">
													<p class="text-sm text-gray-400">Coming Soon</p>
												</div>
											{/if}
										</div>

										<!-- Achievements -->
										<div>
											<div class="mb-3 flex items-center space-x-2">
												<Trophy class="h-4 w-4 text-pink-400" />
												<h4 class="font-semibold text-white">Achievements</h4>
											</div>
											<div class="grid grid-cols-1 gap-2">
												{#if team.achievements && team.achievements.length > 0}
													{#each team.achievements as achievement}
														<div class="flex items-center space-x-2 text-sm">
															<div class="h-2 w-2 flex-shrink-0 rounded-full bg-yellow-400"></div>
															<span class="text-gray-300">{achievement}</span>
														</div>
													{/each}
												{:else}
													<div class="text-sm text-gray-400">0 awards - stay tuned for updates!</div>
												{/if}
											</div>
										</div>
									</CardContent>
								</Card>
							</GlassPanel>
						{/each}
					{:else}
						<div class="col-span-full">
							<GlassPanel class="p-8">
								<div class="text-center text-gray-400">
									<Users class="h-12 w-12 mx-auto mb-4 opacity-50" />
									<p>No IQ teams found</p>
								</div>
							</GlassPanel>
						</div>
					{/if}
				{:catch error}
					<div class="col-span-full">
						<ErrorState 
							message="Failed to load IQ team information" 
							onRetry={retryLoadTeams}
						/>
					</div>
				{/await}
			</div>
		</div>		<!-- Program Information -->
		<div class="mt-16">
			<GlassPanel class="p-12">
				<div class="mb-8 text-center">
					<h2 class="font-display mb-4 text-3xl text-white">Join Our Program</h2>
					<p class="mx-auto max-w-3xl text-gray-300">
						Interested in becoming part of our competitive VEX V5 robotics program? We welcome
						motivated students who are passionate about engineering, programming, and teamwork.
					</p>
				</div>

				<div class="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
					<div class="text-center">
						<div
							class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-yellow-500/20"
						>
							<Code class="h-8 w-8 text-yellow-400" />
						</div>
						<h3 class="mb-2 font-semibold text-white">Learn Programming</h3>
						<p class="text-sm text-gray-300">
							Master C++ and autonomous programming for competitive robotics
						</p>
					</div>
					<div class="text-center">
						<div
							class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/20"
						>
							<Wrench class="h-8 w-8 text-red-400" />
						</div>
						<h3 class="mb-2 font-semibold text-white">Build Robots</h3>
						<p class="text-sm text-gray-300">
							Design and construct competitive robots using VEX V5 components
						</p>
					</div>
					<div class="text-center">
						<div
							class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-pink-500/20"
						>
							<Trophy class="h-8 w-8 text-pink-400" />
						</div>
						<h3 class="mb-2 font-semibold text-white">Compete & Win</h3>
						<p class="text-sm text-gray-300">
							Participate in tournaments and earn recognition at all levels
						</p>
					</div>
				</div>

				<div class="text-center">
					<Button
						size="lg"
						class="border-0 bg-yellow-500 font-semibold text-blue-900 hover:bg-yellow-400"
						href="mailto:contact@steamojibelredrobotics.org"
					>
						<Users class="mr-2 h-5 w-5" />
						Join Our Team
						<ArrowRight class="ml-2 h-5 w-5" />
					</Button>
				</div>
			</GlassPanel>
		</div>
	</div>
</section>
