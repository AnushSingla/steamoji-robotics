<script lang="ts">
	import GlassPanel from '$lib/components/GlassPanel.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import * as Select from '$lib/components/ui/select/index.js';

	let formData = $state({
		role: '',
		name: '',
		grade: '',
		teamRole: '',
		experience: '',
		interest: ''
	});

	function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		// Create email body with form data
		const emailBody = `
Hello Steamoji Robotics Team,

I am interested in learning more about your VEX V5 robotics program. Here are my details:

Role: ${formData.role}
Name: ${formData.name}
${formData.role === 'student' ? `Grade: ${formData.grade}` : ''}
${formData.teamRole ? `Preferred Team Role: ${formData.teamRole}` : ''}

Past Robotics Experience:
${formData.experience || 'None specified'}

Areas of Interest in Robotics:
${formData.interest || 'None specified'}

Please contact me with more information about your programs.

Thank you!
		`.trim();

		// Create mailto link
		const subject = encodeURIComponent('Inquiry about Steamoji Robotics Program');
		const body = encodeURIComponent(emailBody);
		const mailtoLink = `mailto:contact@steamojibelredrobotics.org?subject=${subject}&body=${body}`;

		// Open email client
		window.location.href = mailtoLink;
	}

	function onRoleChange(value: string | undefined) {
		formData.role = value || '';
		// Clear grade and team role if switching to parent
		if (formData.role === 'parent') {
			formData.grade = '';
		}
		// Clear team role when switching roles to reset the options
		formData.teamRole = '';
	}

	function onTeamRoleChange(value: string | undefined) {
		formData.teamRole = value || '';
	}
</script>

<svelte:head>
	<title>Contact Us - Steamoji Robotics</title>
	<meta
		name="description"
		content="Get in touch with Steamoji Robotics. Contact us to learn more about our VEX V5 competitive robotics programs."
	/>
</svelte:head>

<div class="bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
	<div class="container mx-auto px-4 pt-32 pb-16 min-h-screen">
		<div class="max-w-2xl mx-auto">
			<!-- Header -->
			<div class="text-center mb-12">
				<h1 class="text-4xl md:text-5xl font-display font-bold text-white mb-4">
					Contact <span class="text-accentYellow">Us</span>
				</h1>
				<p class="text-lg text-slate-300 max-w-lg mx-auto">
					Interested in joining our VEX V5 robotics program? Fill out the form below and we'll get back to you!
				</p>
			</div>

			<!-- Contact Form -->
			<GlassPanel class="p-8">
				<form onsubmit={handleSubmit} class="space-y-6">
					<!-- Role Selection -->
					<div class="space-y-2">
						<Label for="role" class="text-white font-medium">I am a:</Label>
						<Select.Root type="single" onValueChange={onRoleChange}>
							<Select.Trigger class="w-full bg-white/10 border-white/20 text-white">
								{formData.role ? (formData.role === 'student' ? 'Student' : 'Parent/Guardian') : 'Select your role'}
							</Select.Trigger>
							<Select.Content class="bg-slate-900 border-white/20">
								<Select.Item value="student" class="text-white hover:bg-white/10">Student</Select.Item>
								<Select.Item value="parent" class="text-white hover:bg-white/10">Parent/Guardian</Select.Item>
							</Select.Content>
						</Select.Root>
					</div>

					<!-- Name -->
					<div class="space-y-2">
						<Label for="name" class="text-white font-medium">Name *</Label>
						<Input
							id="name"
							bind:value={formData.name}
							placeholder="Enter your full name"
							required
							class="bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:border-accentYellow"
						/>
					</div>

					<!-- Grade (only for students) -->
					{#if formData.role === 'student'}
						<div class="space-y-2">
							<Label for="grade" class="text-white font-medium">Grade *</Label>
							<Input
								id="grade"
								bind:value={formData.grade}
								placeholder="e.g., 9th, 10th, 11th, 12th"
								required
								class="bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:border-accentYellow"
							/>
						</div>
					{/if}

					<!-- Team Role -->
					{#if formData.role}
						<div class="space-y-2">
							<Label for="teamRole" class="text-white font-medium">
								{formData.role === 'student' ? 'Preferred Team Role' : 'How would you like to help?'}
							</Label>
							<Select.Root type="single" onValueChange={onTeamRoleChange}>
								<Select.Trigger class="w-full bg-white/10 border-white/20 text-white">
									{#if formData.teamRole}
										{#if formData.role === 'student'}
											{formData.teamRole === 'build' ? 'Build Team' : formData.teamRole === 'programming' ? 'Programming' : 'Engineering Notebook'}
										{:else}
											{formData.teamRole === 'coach' ? 'Coach' : formData.teamRole === 'volunteer' ? 'Volunteer Helper' : 'Technical Mentor'}
										{/if}
									{:else}
										{formData.role === 'student' ? 'Select a team role' : 'Select how you\'d like to help'}
									{/if}
								</Select.Trigger>
								<Select.Content class="bg-slate-900 border-white/20">
									{#if formData.role === 'student'}
										<Select.Item value="build" class="text-white hover:bg-white/10">Build Team</Select.Item>
										<Select.Item value="programming" class="text-white hover:bg-white/10">Programming</Select.Item>
										<Select.Item value="notebook" class="text-white hover:bg-white/10">Engineering Notebook</Select.Item>
									{:else if formData.role === 'parent'}
										<Select.Item value="coach" class="text-white hover:bg-white/10">Coach</Select.Item>
										<Select.Item value="volunteer" class="text-white hover:bg-white/10">Volunteer Helper</Select.Item>
										<Select.Item value="mentor" class="text-white hover:bg-white/10">Technical Mentor</Select.Item>
									{/if}
								</Select.Content>
							</Select.Root>
						</div>
					{/if}

					<!-- Past Robotics Experience -->
					<div class="space-y-2">
						<Label for="experience" class="text-white font-medium">Past Robotics Experience</Label>
						<Textarea
							id="experience"
							bind:value={formData.experience}
							placeholder="Tell us about any previous robotics experience (FTC, FRC, VEX IQ, programming, etc.) or write 'None' if this is your first time."
							rows={4}
							class="bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:border-accentYellow resize-none"
						/>
					</div>

					<!-- Robotics Interest -->
					<div class="space-y-2">
						<Label for="interest" class="text-white font-medium">Areas of Interest in Robotics</Label>
						<Textarea
							id="interest"
							bind:value={formData.interest}
							placeholder="What aspects of robotics interest you most? (e.g., programming, mechanical design, electronics, competition strategy, etc.)"
							rows={4}
							class="bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:border-accentYellow resize-none"
						/>
					</div>

					<!-- Submit Button -->
					<div class="pt-4">
						<Button
							type="submit"
							variant="secondary"
							size="lg"
							disabled={!formData.role || !formData.name || (formData.role === 'student' && !formData.grade)}
							class="w-full bg-white text-blue-950"
						>
							Send Contact Request
						</Button>
						<p class="text-sm text-slate-400 mt-3 text-center">
							This will open your email client with your information pre-filled
						</p>
					</div>
				</form>
			</GlassPanel>

			<!-- Contact Info -->
			<div class="mt-12 text-center">
				<GlassPanel class="p-6">
					<h3 class="text-xl font-display font-bold text-white mb-4">Other Ways to Reach Us</h3>
					<div class="space-y-2 text-slate-300">
						<p>
							<span class="font-semibold text-accentYellow">Email:</span>
							<a href="mailto:contact@steamojibelredrobotics.org" class="hover:text-accentYellow transition-colors">
								contact@steamojibelredrobotics.org
							</a>
						</p>
						<p>
							<span class="font-semibold text-accentYellow">Location:</span>
							Bellevue, WA
						</p>
					</div>
				</GlassPanel>
			</div>
		</div>
	</div>
</div>