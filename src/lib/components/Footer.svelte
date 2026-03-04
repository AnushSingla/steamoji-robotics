<script lang="ts">
	import { Github, Mail, MapPin, Phone } from '@lucide/svelte';
</script>

<footer class="mt-20 border-t border-gray-800/50 bg-gray-900/50 backdrop-blur-md">
	<div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
		<div class="grid grid-cols-1 gap-8 md:grid-cols-3">
			<!-- Logo and Mission -->
			<div class="col-span-1 md:col-span-2">
				<div class="mb-4 flex items-center">
					<span class="font-display text-2xl text-white">Steamoji</span>
					<span class="font-display text-accent-yellow ml-1 text-2xl">Robotics</span>
				</div>
				<p class="mb-6 leading-relaxed text-gray-300">
					Developing the next generation of engineers and innovators through competitive VEX V5
					robotics and comprehensive STEAM education.
				</p>
				<div class="space-y-2 text-sm text-gray-300">
					<div class="flex items-center">
						<MapPin class="text-accent-yellow mr-2 h-4 w-4" />
						<span>1805 136th PL NE Suite 201, Bellevue, WA 98033</span>
					</div>
					<div class="flex items-center">
						<Mail class="text-accent-yellow mr-2 h-4 w-4" />
						<a
							href="mailto:contact@steamojibelredrobotics.org"
							class="hover:text-accent-yellow transition-colors"
						>
							contact@steamojibelredrobotics.org
						</a>
					</div>
				</div>
			</div>

			<!-- Quick Links -->
			<div class="flex justify-start text-left md:justify-end">
				<div>
					<h3 class="mb-4 text-lg font-semibold text-white">Navigation</h3>
					<ul class="space-y-2 text-gray-300">
						<li><a href="/" class="hover:text-accent-yellow transition-colors">Home</a></li>
						<li>
							<a href="/about" class="hover:text-accent-yellow transition-colors">About Us</a>
						</li>
						<li>
							<a href="/teams" class="hover:text-accent-yellow transition-colors">Our Teams</a>
						</li>
						<li>
							<a href="/staff" class="hover:text-accent-yellow transition-colors">Leadership</a>
						</li>
					</ul>
				</div>
			</div>

			<!-- Programs -->
			<!-- <div>
				<h3 class="font-semibold text-lg mb-4 text-white">Programs</h3>
				<ul class="space-y-2 text-gray-300">
					<li><span class="text-gray-400">VEX V5 Robotics</span></li>
					<li><span class="text-gray-400">Engineering Design</span></li>
					<li><span class="text-gray-400">Programming</span></li>
					<li><span class="text-gray-400">Competition Prep</span></li>
					<li><span class="text-gray-400">Mentorship</span></li>
				</ul>
			</div> -->
		</div>

		<!-- Bottom section -->
		<div class="mt-8 border-t border-gray-800/50 pt-8">
			<div class="flex flex-col items-center justify-between md:flex-row">
				<div class="mb-4 text-sm text-gray-400 md:mb-0">
					© 2025 Stem Learnings Solutions LLC. All rights reserved.
				</div>
				<div class="flex items-center space-x-6">
					<a
						href="https://www.chandanc.me"
						target="_blank"
						class="hover:text-accent-yellow text-gray-400 transition-colors"
						aria-label="GitHub"
					>
						<!-- <Github class="w-5 h-5" /> -->
						<p class="mb-4 text-sm md:mb-0">Chandan C.</p>
					</a>
				</div>
			</div>
		</div>
	</div>
</footer>
