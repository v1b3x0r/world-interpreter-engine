<script lang="ts">
	import type { RenderedEvent } from '$lib/composables/scenarios/types';
	import { EVENT_TYPE_MAP } from '$lib/composables/scenarios/event-types';

	let { event, highlighted = false }: { event: RenderedEvent; highlighted?: boolean } = $props();

	const meta = $derived(EVENT_TYPE_MAP[event.type]);
	const borderColor = $derived(
		event.severity === 'critical'
			? 'border-l-red-500'
			: event.severity === 'warning'
				? 'border-l-amber-400'
				: 'border-l-emerald-500/30'
	);
</script>

<div
	class="flex items-start gap-3 rounded-lg border-l-[3px] px-4 py-3 {borderColor}"
	style="background: {highlighted ? 'rgba(34,197,94,0.05)' : 'rgba(255,255,255,0.02)'};"
	role="listitem"
>
	<span class="min-w-[3rem] pt-0.5 font-mono text-[11px] text-[var(--wl-text-muted)]">
		{event.timestamp}
	</span>
	<span class="pt-0.5 text-sm">
		{meta?.icon ?? '●'}
	</span>
	<span class="flex-1 text-sm text-[var(--wl-text)]">
		{event.text}
	</span>
</div>
