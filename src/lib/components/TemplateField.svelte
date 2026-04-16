<script lang="ts">
	import type { EventTypeMeta } from '$lib/composables/scenarios/types';

	let {
		meta,
		value,
		onchange,
	}: {
		meta: EventTypeMeta;
		value: string;
		onchange: (val: string) => void;
	} = $props();

	let focused = $state(false);
</script>

<div class="flex items-center gap-2">
	<div class="flex min-w-[120px] items-center gap-1.5">
		<span class="text-sm">{meta.icon}</span>
		<span class="text-xs text-(--wl-text-muted)">{meta.label}</span>
	</div>
	<input
		type="text"
		{value}
		class="flex-1 rounded-md border bg-transparent px-2.5 py-1.5 text-sm text-(--wl-text) outline-none transition-colors"
		style="border-color: {focused ? 'var(--wl-border-accent)' : 'var(--wl-border)'}; background: {focused ? 'rgba(34,197,94,0.03)' : 'rgba(255,255,255,0.02)'};"
		onfocus={() => (focused = true)}
		onblur={() => (focused = false)}
		oninput={(e) => onchange(e.currentTarget.value)}
	/>
</div>
