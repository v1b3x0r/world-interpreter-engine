<script lang="ts">
	import { onMount } from 'svelte';
	import { render } from '$lib/composables/engine';
	import { getScenarios } from '$lib/composables/scenarios';
	import { getLocale } from '$lib/paraglide/runtime';
	import { m } from '$lib/paraglide/messages.js';

	type DemoRow = {
		icon: string;
		name: string;
		accent: string;
		text: string;
	};

	const prefersReducedMotion =
		typeof window !== 'undefined'
			? window.matchMedia('(prefers-reduced-motion: reduce)').matches
			: false;

	const demoScenarioIds = ['home', 'hospital', 'car', 'humanoid', 'space'] as const;

	const demoRows = $derived.by(() => {
		const scenarios = getScenarios(getLocale());
		const rows: DemoRow[] = [];
		for (const id of demoScenarioIds) {
			const s = scenarios[id];
			const arriveEvent = s.events.find((e) => e.type === 'presence.arrived');
			if (!arriveEvent) continue;
			const rendered = render([arriveEvent], s.interpreter)[0];
			rows.push({
				icon: s.icon,
				name: s.name,
				accent: s.accent,
				text: rendered.text,
			});
		}
		return rows;
	});

	const sampleEvent = $derived.by(() => {
		const scenarios = getScenarios(getLocale());
		const e = scenarios.home.events.find((ev) => ev.type === 'presence.arrived');
		return e ? JSON.stringify(e, null, 2) : '';
	});

	let sectionEl: HTMLElement;
	let visibleCount = $state(prefersReducedMotion ? 5 : 0);

	onMount(async () => {
		if (prefersReducedMotion) return;

		const { gsap } = await import('gsap');
		const { ScrollTrigger } = await import('gsap/ScrollTrigger');
		gsap.registerPlugin(ScrollTrigger);

		ScrollTrigger.create({
			trigger: sectionEl,
			start: 'top top',
			end: `+=${demoScenarioIds.length * 300}`,
			pin: true,
			scrub: 0.5,
			onUpdate: (self) => {
				visibleCount = Math.min(
					demoScenarioIds.length,
					Math.floor(self.progress * (demoScenarioIds.length + 1))
				);
			},
		});

		return () => {
			ScrollTrigger.getAll().forEach((t) => t.kill());
		};
	});
</script>

<section
	bind:this={sectionEl}
	class="flex min-h-screen flex-col items-center justify-center px-6"
	style="background: var(--wl-bg);"
>
	<h2 class="mb-2 text-center text-2xl font-bold text-(--wl-text) md:text-3xl">
		{m.hero_demo_title()}
	</h2>
	<p class="mb-8 text-center text-sm italic text-(--wl-text-muted)" style="opacity: 0.6;">
		{m.hero_demo_tagline()}
	</p>

	<!-- Raw event -->
	<div class="mb-6 w-full max-w-lg">
		<pre
			class="overflow-x-auto rounded-lg p-4 font-mono text-xs text-(--wl-text-muted)"
			style="background: rgba(255,255,255,0.02); border: 1px solid var(--wl-border);"
		>{sampleEvent}</pre>
	</div>

	<!-- Interpreter outputs -->
	<div class="flex w-full max-w-lg flex-col gap-2">
		{#each demoRows as row, i (row.name)}
			{#if i < visibleCount}
				<div
					class="flex items-center gap-3 rounded-lg border-l-[3px] px-4 py-3 transition-all duration-300"
					style="
						border-left-color: {row.accent};
						background: {row.accent.replace(',1)', ',0.04)')};
					"
				>
					<span class="text-lg">{row.icon}</span>
					<div>
						<div class="text-[10px] font-semibold uppercase tracking-wider" style="color: {row.accent};">
							{row.name}
						</div>
						<div class="text-sm text-(--wl-text)">{row.text}</div>
					</div>
				</div>
			{/if}
		{/each}
	</div>
</section>
