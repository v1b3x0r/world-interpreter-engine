<script lang="ts">
	import type { RenderedEvent } from '$lib/composables/scenarios/types';
	import { EVENT_TYPE_MAP } from '$lib/composables/scenarios/event-types';

	let { event, highlighted = false }: { event: RenderedEvent; highlighted?: boolean } = $props();

	const meta = $derived(EVENT_TYPE_MAP[event.type]);
</script>

<div
	class="flex items-start gap-3 rounded-lg px-3 py-2"
	style="background: {highlighted
		? 'rgba(34,197,94,0.05)'
		: event.severity === 'warning'
			? 'rgba(251,191,36,0.04)'
			: event.severity === 'critical'
				? 'rgba(239,68,68,0.04)'
				: 'rgba(255,255,255,0.02)'};"
	role="listitem"
>
	<span class="min-w-[3rem] pt-0.5 font-mono text-[11px] text-(--wl-text-muted)">
		{event.timestamp}
	</span>
	<span class="pt-0.5 text-sm">
		{meta?.icon ?? '●'}
	</span>
	<span
		class="flex-1 text-sm"
		style="color: {event.severity === 'warning'
			? 'var(--wl-warning)'
			: event.severity === 'critical'
				? 'var(--wl-critical)'
				: 'var(--wl-text)'};"
	>
		{event.text}
	</span>
</div>
