<script lang="ts">
	let { checked = $bindable(false), id, ...rest } = $props();
</script>

<div class="relative flex items-center">
	<input
		type="checkbox"
		{id}
		bind:checked
		class="peer h-5 w-5 cursor-pointer appearance-none rounded border border-white/20 bg-white/10 transition-all checked:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-slate-900"
		{...rest}
	/>
	<svg
		class="pointer-events-none absolute left-1 top-1 h-3 w-3 stroke-black opacity-0 transition-opacity peer-checked:opacity-100"
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		stroke="currentColor"
		stroke-width="4"
	>
		<path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
	</svg>
</div>

<style>
	/* Custom styles to match your theme if needed */
</style>