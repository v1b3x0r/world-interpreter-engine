<script lang="ts">
	import { VARIABLES } from '$lib/composables/scenarios/event-types';

	let { oninsert }: { oninsert: (variable: string) => void } = $props();
</script>

<div class="flex flex-wrap gap-1.5">
	{#each VARIABLES as v (v.name)}
		<button
			class="cursor-pointer rounded border px-2 py-0.5 font-mono text-[11px] transition-colors hover:border-(--wl-border-accent) hover:bg-(--wl-accent-glow)"
			style="border-color: rgba(99,102,241,0.2); background: rgba(99,102,241,0.08); color: #a5b4fc;"
			title={v.description}
			aria-label="Insert {v.name}"
			onclick={() => oninsert(v.name)}
		>
			{v.name}
		</button>
	{/each}
</div>
