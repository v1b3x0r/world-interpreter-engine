<script lang="ts">
	import { fly } from 'svelte/transition';
	import type { RenderedEvent } from '$lib/composables/scenarios/types';
	import TimelineEvent from './TimelineEvent.svelte';

	let {
		events,
		animate = true,
	}: {
		events: RenderedEvent[];
		animate?: boolean;
	} = $props();

	const prefersReducedMotion =
		typeof window !== 'undefined'
			? window.matchMedia('(prefers-reduced-motion: reduce)').matches
			: false;

	const shouldAnimate = $derived(animate && !prefersReducedMotion);
</script>

<div role="list" class="relative flex flex-col gap-0">
	<!-- Vertical line -->
	<div
		class="absolute top-0 left-[23px] h-full w-px"
		style="background: linear-gradient(to bottom, var(--wl-accent), transparent);"
		aria-hidden="true"
	></div>

	{#each events as event, i (event.timestamp + event.type + i)}
		<div class="relative flex items-start gap-4 py-2">
			<!-- Dot -->
			<div class="relative z-10 mt-2.5 flex h-[14px] w-[14px] shrink-0 items-center justify-center" aria-hidden="true">
				<div
					class="h-2.5 w-2.5 rounded-full"
					style="background: {event.severity === 'warning' || event.severity === 'critical'
						? 'var(--wl-warning)'
						: 'var(--wl-accent)'}; box-shadow: 0 0 6px {event.severity === 'warning' || event.severity === 'critical'
						? 'rgba(251,191,36,0.4)'
						: 'rgba(34,197,94,0.3)'};"
				></div>
			</div>

			<!-- Event content -->
			<div class="flex-1">
				{#if shouldAnimate}
					<div transition:fly={{ y: 8, duration: 250, delay: i * 80 }}>
						<TimelineEvent {event} />
					</div>
				{:else}
					<TimelineEvent {event} />
				{/if}
			</div>
		</div>
	{/each}
</div>
