<script lang="ts">
	import { AlertCircle, RefreshCw } from '@lucide/svelte';
	import { Button } from '$lib/components/ui/button';

	interface Props {
		title?: string;
		message?: string;
		onRetry?: () => void;
		compact?: boolean;
	}

	let { 
		title = 'Oops! Something went wrong',
		message = 'Failed to load data', 
		onRetry, 
		compact = false 
	}: Props = $props();
</script>

{#if compact}
	<div class="flex items-center justify-center space-x-2 text-red-400 p-4">
		<AlertCircle class="h-4 w-4" />
		<span class="text-sm">{message}</span>
		{#if onRetry}
			<Button
				variant="ghost"
				size="sm"
				onclick={onRetry}
				class="text-red-400 hover:text-red-300 hover:bg-red-500/10"
			>
				<RefreshCw class="h-3 w-3" />
			</Button>
		{/if}
	</div>
{:else}
	<div class="text-center">
		<AlertCircle class="h-12 w-12 text-red-400 mx-auto mb-4" />
		<h3 class="text-lg font-semibold text-white mb-2">{title}</h3>
		<p class="text-gray-400 mb-6">{message}</p>
		{#if onRetry}
			<Button
				variant="outline"
				onclick={onRetry}
				class="border-red-400/30 text-red-400 hover:bg-red-500/10 hover:border-red-400/50"
			>
				<RefreshCw class="mr-2 h-4 w-4" />
				Try Again
			</Button>
		{/if}
	</div>
{/if}
