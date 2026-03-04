<script lang="ts">
	interface Props {
		size?: 'sm' | 'md' | 'lg';
		text?: string;
	}

	let { size = 'md', text = 'Loading...' }: Props = $props();
	
	const sizeClasses = {
		sm: 'h-4 w-4',
		md: 'h-8 w-8',
		lg: 'h-12 w-12'
	};
</script>

<div class="flex items-center justify-center space-x-2">
	<div class="animate-spin rounded-full border-2 border-gray-600 border-t-yellow-400 {sizeClasses[size]}"></div>
	<span class="text-gray-400 text-sm">{text}</span>
</div>

<style>
	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}
	
	.animate-spin {
		animation: spin 1s linear infinite;
	}
</style>
