<script lang="ts">
    import GlassPanel from '$lib/components/GlassPanel.svelte';
    import { Button } from '$lib/components/ui/button/index.js';
    import { Input } from '$lib/components/ui/input/index.js';
    import { Label } from '$lib/components/ui/label/index.js';
    import { Textarea } from '$lib/components/ui/textarea/index.js';
    import Checkbox from '$lib/components/ui/checkbox/checkbox.svelte';
    import * as Select from '$lib/components/ui/select/index.js';

    let formData = $state({
        studentName: '',
        studentGrade: '',
        studentSchool: '',
        interestedTeam: '',
        experience: '',
        courses: '',
        bootcampIQ: false,
        bootcampV5: false,
        location: '',
        parentFirstName: '',
        parentLastName: '',
        parentEmail: '',
        parentPhone: ''
    });

    const teams = [
        { value: "iq-elementary", label: "2026-2027 VEX IQ Elementary School Team (Grades 4-5)" },
        { value: "iq-middle", label: "2026-2027 VEX IQ Middle School Team (Grades 6-7)" },
        { value: "v5-middle", label: "2026-2027 VEX V5 Middle School Team (Grades 7-8)" },
        { value: "v5-high", label: "2026-2027 VEX V5 High School Team (Grades 9-12)" }
    ];

    function handleSubmit(event: SubmitEvent) {
        event.preventDefault();
        
        const emailBody = `
Competition Team Interest Form
------------------------------
Student Name: ${formData.studentName}
Grade (Fall 2026): ${formData.studentGrade}
Current School: ${formData.studentSchool}

Competition Team Interests:
${teams.find(t => t.value === formData.interestedTeam)?.label || 'None selected'}

Prior Experience:
${formData.experience || 'None specified'}

Related Courses:
${formData.courses || 'None specified'}

Bootcamps Completed:
- VEX IQ Track: ${formData.bootcampIQ ? 'Yes' : 'No'}
- VEX V5 Track: ${formData.bootcampV5 ? 'Yes' : 'No'}

Preferred Location: ${formData.location === 'bellevue' ? 'Bellevue/Bothell' : 'Not selected'}

Parent Information:
Name: ${formData.parentFirstName} ${formData.parentLastName}
Email: ${formData.parentEmail}
Phone: ${formData.parentPhone}
        `.trim();

        const subject = encodeURIComponent(`Competition Team Inquiry: ${formData.studentName}`);
        const body = encodeURIComponent(emailBody);
        window.location.href = `mailto:contact@steamojibelredrobotics.org?subject=${subject}&body=${body}`;
    }

    function onTeamChange(value: string | undefined) {
        formData.interestedTeam = value || '';
    }
</script>

<svelte:head>
    <title>Competition Team Interest - Steamoji Robotics</title>
</svelte:head>

<div class="bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 min-h-screen">
    <div class="container mx-auto px-4 pt-32 pb-16">
        <div class="max-w-2xl mx-auto">
            <div class="text-center mb-12">
                <h1 class="text-4xl md:text-5xl font-display font-bold text-white mb-4">
                    Competition <span class="text-yellow-400">Teams</span>
                </h1>
                <p class="text-lg text-slate-300">
                    Interested in joining? Fill out the form below for information on the 2026-2027 season.
                </p>
            </div>

            <GlassPanel class="p-8">
                <form onsubmit={handleSubmit} class="space-y-8">
                    
                    <div class="space-y-4">
                        <Label class="text-white text-lg font-bold">Competition Team Interests *</Label>
                        <Select.Root type="single" onValueChange={onTeamChange}>
                            <Select.Trigger class="w-full bg-white/10 border-white/20 text-white">
                                {formData.interestedTeam ? teams.find(t => t.value === formData.interestedTeam)?.label : 'Select a team level'}
                            </Select.Trigger>
                            <Select.Content class="bg-slate-900 border-white/20">
                                {#each teams as team}
                                    <Select.Item value={team.value} class="text-white">{team.label}</Select.Item>
                                {/each}
                            </Select.Content>
                        </Select.Root>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="space-y-2">
                            <Label for="studentName" class="text-white">Student's Name *</Label>
                            <Input id="studentName" bind:value={formData.studentName} required class="bg-white/10 border-white/20 text-white" />
                        </div>
                        <div class="space-y-2">
                            <Label for="grade" class="text-white">Student's Grade (Fall 2026) *</Label>
                            <Input id="grade" bind:value={formData.studentGrade} required class="bg-white/10 border-white/20 text-white" />
                        </div>
                    </div>

                    <div class="space-y-2">
                        <Label for="school" class="text-white">Student's Current School *</Label>
                        <Input id="school" bind:value={formData.studentSchool} required class="bg-white/10 border-white/20 text-white" />
                    </div>

                    <div class="space-y-4">
                        <div class="space-y-2">
                            <Label for="experience" class="text-white">Prior Robotics & Coding Experience</Label>
                            <Textarea id="experience" bind:value={formData.experience} placeholder="Tell us about your background..." class="bg-white/10 border-white/20 text-white resize-none" />
                        </div>
                        <div class="space-y-2">
                            <Label for="courses" class="text-white">Related Courses Taken to Date</Label>
                            <Input id="courses" bind:value={formData.courses} placeholder="List any STEM or coding courses" class="bg-white/10 border-white/20 text-white" />
                        </div>
                    </div>

                    <div class="space-y-4">
                        <Label class="text-white font-bold">Previous Bootcamps Completed</Label>
                        <div class="flex flex-col space-y-3">
                            <div class="flex items-center space-x-3">
                                <Checkbox id="iq" bind:checked={formData.bootcampIQ} />
                                <Label for="iq" class="text-slate-300">Competitive Robotics Bootcamp - VEX IQ track</Label>
                            </div>
                            <div class="flex items-center space-x-3">
                                <Checkbox id="v5" bind:checked={formData.bootcampV5} />
                                <Label for="v5" class="text-slate-300">Competitive Robotics Bootcamp - VEX V5 track</Label>
                            </div>
                        </div>
                    </div>

                    <div class="space-y-4 border-t border-white/10 pt-6">
                        <Label class="text-white font-bold">Preferred Location</Label>
                        <div class="flex items-center space-x-3">
                            <Checkbox id="loc" bind:checked={() => formData.location === 'bellevue', (v) => formData.location = v ? 'bellevue' : ''} />
                            <Label for="loc" class="text-slate-300">Bellevue / Bothell</Label>
                        </div>
                    </div>

                    <div class="space-y-4 border-t border-white/10 pt-6">
                        <Label class="text-white text-lg font-bold">Parent Information</Label>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input placeholder="First Name *" bind:value={formData.parentFirstName} required class="bg-white/10 border-white/20 text-white" />
                            <Input placeholder="Last Name *" bind:value={formData.parentLastName} required class="bg-white/10 border-white/20 text-white" />
                        </div>
                        <Input type="email" placeholder="Email *" bind:value={formData.parentEmail} required class="bg-white/10 border-white/20 text-white" />
                        <Input type="tel" placeholder="Phone # *" bind:value={formData.parentPhone} required class="bg-white/10 border-white/20 text-white" />
                    </div>

                    <div class="pt-4">
                        <Button type="submit" class="w-full bg-yellow-400 text-black font-bold py-6 text-lg hover:bg-yellow-500">
                            Submit Interest
                        </Button>
                        <p class="text-xs text-slate-400 mt-4 text-center">
                            We'll send you information on how to get started to join our teams.
                        </p>
                    </div>
                </form>
            </GlassPanel>
        </div>
    </div>
</div>