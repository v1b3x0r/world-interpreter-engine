<script lang="ts">
	let lines = $state<string[]>([]);
</script>

<div class="space-y-2">
	{#each lines as line (line)}
		<div class="rounded border border-neutral-800 bg-neutral-900 px-4 py-2 text-sm">
			{line}
		</div>
	{/each}
</div>
