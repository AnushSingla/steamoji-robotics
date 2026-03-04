<script lang="ts">
	interface Props {
		class?: string;
		children?: any;
	}

	let { class: className = '', children }: Props = $props();
</script>

<div
	class="bg-white/5 dark:bg-white/10 backdrop-blur-md border border-white/10 dark:border-white/20 rounded-xl shadow-xl {className}"
>
	{@render children?.()}
</div>
