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

<div role="list" class="flex flex-col gap-2">
	{#each events as event, i (event.timestamp + event.type + i)}
		{#if shouldAnimate}
			<div transition:fly={{ y: 8, duration: 250, delay: i * 80 }}>
				<TimelineEvent {event} />
			</div>
		{:else}
			<TimelineEvent {event} />
		{/if}
	{/each}
</div>
