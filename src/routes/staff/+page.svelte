<script lang="ts">
	import GlassPanel from '$lib/components/GlassPanel.svelte';
	import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
	import { Avatar, AvatarFallback } from '$lib/components/ui/avatar';
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import { Mail, Linkedin, Award, Users, Code, Wrench, Trophy, BookOpen } from '@lucide/svelte';

	const mentors = [
		{
			name: 'Anubhav Swami',
			role: 'CEO',
			email: 'anubhavs@stemlearnings.com',
			bio: '',
			color: 'yellow',
			initials: 'AS'
		},
		{
			name: 'Dhruv Iyengar',
			role: 'President',
			email: 'dhruv@steamojibelredrobotics.org',
            bio: '',
			color: 'red',
			initials: 'DI'
		},
		{
			name: 'Jash Vohra',
			role: 'President',
			email: 'jash@steamojibelredrobotics.org',
            bio: '',
			color: 'blue',
			initials: 'JV'
		}
	];

	const studentBoard = [
		{
			name: 'Kaihan Yang',
			role: 'Vice President',
            bio: '',
			color: 'blue',
			initials: 'KY'
		},
        {
			name: 'Max Wu',
			role: 'Vice President',
            bio: '',
			color: 'red',
			initials: 'MW'
		},
		        {
			name: 'Pratham Koka',
			role: 'Parts Manager',
            bio: '',
			color: 'red',
			initials: 'PK'
		},
        {
			name: 'Chandan Chengavala',
			role: 'Public Relations | Programming Advisor',
            bio: '',
			color: 'yellow',
			initials: 'CC'
		},
        {
			name: 'Arvind Srinivasan',
			role: 'Notebook Advisor',
            bio: '',
			color: 'white',
			initials: 'AS'
		},

	];

	const departments = [
		{
			name: 'Executive Leadership',
			description: 'Program oversight, strategic planning, and organizational development',
			icon: Trophy,
			color: 'accent-yellow',
			staff: 3
		},
		{
			name: 'Student Board',
			description: 'Student-led governance, team coordination, and peer leadership',
			icon: Users,
			color: 'primary-blue',
			staff: 4
		}
	];

	function getColorClasses(color: string) {
		switch (color) {
			case 'yellow':
				return {
					border: 'border-accent-yellow/30',
					text: 'text-accent-yellow',
					bg: 'bg-accent-yellow/10'
				};
			case 'red':
				return {
					border: 'border-accent-red/30',
					text: 'text-accent-red',
					bg: 'bg-accent-red/10'
				};
			case 'blue':
				return {
					border: 'border-primary-blue/30',
					text: 'text-primary-blue',
					bg: 'bg-primary-blue/10'
				};
			case 'pink':
				return {
					border: 'border-accent-pink/30',
					text: 'text-accent-pink',
					bg: 'bg-accent-pink/10'
				};
			default:
				return {
					border: 'border-gray-600/30',
					text: 'text-gray-300',
					bg: 'bg-gray-600/10'
				};
		}
	}
</script>

<svelte:head>
	<title>Leadership - Steamoji Robotics</title>
	<meta
		name="description"
		content="Meet the adult mentors, executives, and student board members who lead Steamoji Robotics VEX V5 program."
	/>
</svelte:head>

<section class="relative w-full">
	<!-- Background gradient - covers full page -->
	<div
		class="from-primary-blue/10 to-accent-red/10 fixed inset-0 -z-10 h-full w-full bg-gradient-to-br via-transparent"
	></div>

	<div class="min-h-screen pb-20 pt-32">
		<div class="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<!-- Header -->
			<div class="mb-16 text-center">
				<Badge
					variant="outline"
					class="border-accent-yellow/30 text-accent-yellow mb-4 px-4 py-2 text-sm font-medium"
				>
					LEADERSHIP TEAM
				</Badge>
				<h1 class="font-display mb-6 text-4xl text-white md:text-5xl lg:text-6xl">
					Program Leadership
				</h1>
				<p class="mx-auto max-w-3xl text-xl leading-relaxed text-gray-300">
					Meet the dedicated mentors and student leaders who guide our VEX V5 robotics program and
					support our competitive teams.
				</p>
			</div>

			<!-- Department Overview -->
			<div class="mb-16 grid gap-6 md:grid-cols-2 lg:grid-cols-2">
				{#each departments as dept}
					<GlassPanel
						class="hover:border-accent-yellow/30 group p-6 text-center transition-all duration-300"
					>
						<div
							class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-800/50 transition-transform group-hover:scale-110"
						>
							<svelte:component this={dept.icon} class="text-accent-yellow h-8 w-8" />
						</div>
						<h3
							class="font-display group-hover:text-accent-yellow mb-2 text-lg text-white transition-colors"
						>
							{dept.name}
						</h3>
						<p class="mb-3 text-sm text-gray-300">
							{dept.description}
						</p>
						<Badge variant="outline" class="border-accent-yellow/30 text-accent-yellow">
							{dept.staff} Members
						</Badge>
					</GlassPanel>
				{/each}
			</div>

			<!-- Adult Mentors & Executives Section -->
			<div class="mb-20">
				<div class="mb-12 text-center">
					<h2 class="font-display mb-4 text-3xl text-white md:text-4xl">Mentors & Executives</h2>
					<p class="mx-auto max-w-2xl text-lg text-gray-300">
						Experienced professionals providing strategic guidance and organizational leadership
					</p>
				</div>

				<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
					{#each mentors as member}
						{@const colors = getColorClasses(member.color)}
						<GlassPanel class="group p-6 hover:{colors.border} transition-all duration-300">
							<div class="mb-6 text-center">
								<!-- Avatar -->
								<Avatar
									class="mx-auto mb-4 h-20 w-20 {colors.bg} ring-2 ring-{member.color === 'yellow'
										? 'accent-yellow'
										: member.color === 'red'
											? 'accent-red'
											: member.color === 'blue'
												? 'primary-blue'
												: 'accent-pink'}/30"
								>
									<AvatarFallback class="text-xl font-bold {colors.text}">
										{member.initials}
									</AvatarFallback>
								</Avatar>

								<h3
									class="font-display group-hover:text-accent-yellow mb-1 text-xl text-white transition-colors"
								>
									{member.name}
								</h3>
								<p class="{colors.text} mb-2 text-sm font-medium">
									{member.role}
								</p>
							</div>

							<p class="mb-4 text-center text-sm leading-relaxed text-gray-300">
								{member.bio}
							</p>

							<div class="text-center">
								<a
									href="mailto:{member.email}"
									class="hover:text-accent-yellow text-gray-400 transition-colors"
								>
									<Mail class="mx-auto h-5 w-5" />
								</a>
							</div>
						</GlassPanel>
					{/each}
				</div>
			</div>

			<!-- Student Board Section -->
			<div class="mb-16">
				<div class="mb-12 text-center">
					<h2 class="font-display mb-4 text-3xl text-white md:text-4xl">Student Board</h2>
					<p class="mx-auto max-w-2xl text-lg text-gray-300">
						Student leaders driving team coordination, technical excellence, and community
						engagement
					</p>
				</div>

				<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
					{#each studentBoard as member}
						{@const colors = getColorClasses(member.color)}
						<GlassPanel class="group p-4 hover:{colors.border} transition-all duration-300">
							<div class="flex flex-col items-center text-center">
								<!-- Avatar -->
								<Avatar
									class="mb-3 h-12 w-12 {colors.bg} ring-2 ring-{member.color === 'yellow'
										? 'accent-yellow'
										: member.color === 'red'
											? 'accent-red'
											: member.color === 'blue'
												? 'primary-blue'
												: 'accent-pink'}/30"
								>
									<AvatarFallback class="text-sm font-bold {colors.text}">
										{member.initials}
									</AvatarFallback>
								</Avatar>

								<!-- Name & Role -->
								<h3
									class="font-display group-hover:text-accent-yellow mb-1 text-base text-white transition-colors"
								>
									{member.name}
								</h3>
								<p class="{colors.text} mb-3 text-xs font-medium">
									{member.role}
								</p>

								<!-- Short Bio -->
								<p class="mb-3 line-clamp-3 text-xs leading-relaxed text-gray-300">
									{member.bio}
								</p>
							</div>
						</GlassPanel>
					{/each}
				</div>
			</div>

			<!-- Call to Action -->
			<div class="text-center">
				<GlassPanel class="inline-block p-8">
					<h2 class="font-display mb-4 text-3xl text-white">Join Our Leadership Team</h2>
					<p class="mb-6 max-w-md text-gray-300">
						Interested in mentoring our teams or joining our student board? We welcome passionate
						individuals who want to support competitive robotics.
					</p>
					<div class="flex flex-col justify-center gap-4 sm:flex-row">
						<Button
							size="lg"
							class="bg-accent-yellow text-primary-blue hover:bg-accent-yellow/90 border-0 font-semibold"
							href="mailto:contact@steamojibelredrobotics.org"
						>
							<Users class="mr-2 h-5 w-5" />
							Get Involved
						</Button>
						<Button
							size="lg"
							variant="outline"
							class="border-white/30 font-semibold text-white hover:bg-white/10"
							href="mailto:dhruv@steamojibelredrobotics.org"
						>
							<Mail class="mr-2 h-5 w-5" />
							Contact Leadership
						</Button>
					</div>
				</GlassPanel>
			</div>
		</div>
	</div>
</section>
