<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Switch } from '$lib/components/ui/switch';
	import { Menu, X, Moon, Sun } from '@lucide/svelte';
	import { mode, toggleMode } from 'mode-watcher';
	import GlassPanel from './GlassPanel.svelte';
	
	let mobileMenuOpen = $state(false);
	
	const navigation = [
		{ name: 'About', href: '/about' },
		{ name: 'Teams', href: '/teams' },
		{ name: 'Camps', href: '/camps' },
		{ name: 'Staff', href: '/staff' },
		{name: 'Blog', href: '/blog' },
		{name: 'Calendar', href: '/calendar' },
	];
</script>

<nav class="fixed top-0 left-0 right-0 z-50 p-6">
	<GlassPanel class="max-w-7xl mx-auto">
		<div class="flex justify-between items-center h-16 px-6">
			<!-- Logo -->
			<div class="flex-shrink-0">
				<a href="/" class="flex items-center space-x-2 transition-all-smooth hover:scale-105">
					<enhanced:img 
						src="/static/logo.jpeg" 
						alt="Steamoji Robotics Logo" 
						class="w-8 h-8 rounded-lg object-cover shadow-2xl"
					/>
					<span class="font-display md:text-2xl text-white">Steamoji</span>
					<span class="font-display md:text-2xl text-yellow-400">Robotics</span>
				</a>
			</div>
			
			<!-- Desktop Navigation -->
			<div class="hidden md:flex items-center space-x-8">
				<div class="flex items-center space-x-6">
					{#each navigation as item, i}
						<a 
							href={item.href} 
							class="text-white/80 hover:text-yellow-400 px-3 py-2 rounded-lg text-md font-medium transition-all-smooth hover:bg-white/10 relative group animate-fade-in-up animate-delay-{(i + 1) * 100}"
						>
							{item.name}
							<span class="absolute -bottom-1 left-3 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-[calc(100%-1.5rem)]"></span>
						</a>
					{/each}
				</div>
				
				
				<!-- CTA Button -->
				<Button 
					class="font-medium bg-accent-yellow text-primary-blue hover:bg-accent-yellow/90 border-0"
                    href="/contact"
				>
					Join Us
				</Button>
			</div>
			
			<!-- Mobile menu button -->
			<div class="md:hidden flex items-center space-x-2">

				
				<!-- Menu Toggle -->
				<button
					onclick={() => mobileMenuOpen = !mobileMenuOpen}
					class="inline-flex items-center justify-center p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
				>
					{#if mobileMenuOpen}
						<X class="h-6 w-6" />
					{:else}
						<Menu class="h-6 w-6" />
					{/if}
				</button>
			</div>
		</div>
	</GlassPanel>
	
	<!-- Mobile Navigation -->
	{#if mobileMenuOpen}
		<div class="md:hidden mt-2">
			<GlassPanel class="max-w-7xl mx-auto">
				<div class="px-6 py-4 space-y-3">
					{#each navigation as item}
						<a 
							href={item.href} 
							class="text-white/80 hover:text-white block px-3 py-2 rounded-lg text-base font-medium transition-all hover:bg-white/10"
							onclick={() => mobileMenuOpen = false}
						>
							{item.name}
						</a>
					{/each}
					<div class="pt-2">
						<Button 
							class="w-full font-medium bg-accent-yellow text-primary-blue hover:bg-accent-yellow/90 border-0"
							href="/contact"
						>
							Join Us
						</Button>
					</div>
				</div>
			</GlassPanel>
		</div>
	{/if}
</nav>
