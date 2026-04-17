<script lang="ts">
	import { onMount } from 'svelte';
	import { navigateTo, getScenarioListForLocale } from '$lib/composables/stores.svelte';
	import { m } from '$lib/paraglide/messages.js';

	const scenarios = $derived(getScenarioListForLocale());

	let sectionVisible = $state(false);
	let sectionEl: HTMLElement;

	onMount(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) sectionVisible = true;
			},
			{ threshold: 0.2 }
		);
		observer.observe(sectionEl);
		return () => observer.disconnect();
	});
</script>

<section
	bind:this={sectionEl}
	class="flex min-h-screen flex-col items-center justify-center px-6 py-20"
	style="background: var(--wl-bg);"
>
	<h2 class="mb-2 text-center text-2xl font-bold text-(--wl-text) md:text-3xl">
		{m.hero_pattern_title()}
	</h2>
	<p class="mb-12 text-center text-sm text-(--wl-text-muted)" style="opacity: 0.7;">
		{m.hero_pattern_subtitle()}
	</p>

	<div class="mx-auto grid w-full max-w-3xl grid-cols-2 gap-3 md:grid-cols-4">
		{#each scenarios as scenario, i (scenario.id)}
			{@const isSecondRow = i >= 4}
			<button
				class="group cursor-pointer rounded-xl border p-5 text-left transition-all duration-200 hover:scale-[1.02]"
				style="
					border-color: rgba(255,255,255,0.05);
					background: rgba(255,255,255,0.02);
					opacity: {isSecondRow && !sectionVisible ? 0 : 1};
					transform: translateY({isSecondRow && !sectionVisible ? '12px' : '0'});
					transition: opacity 0.4s ease {i * 60}ms, transform 0.4s ease {i * 60}ms, border-color 0.2s, background 0.2s;
				"
				onmouseenter={(e) => {
					e.currentTarget.style.borderColor = scenario.accent.replace(',1)', ',0.3)');
					e.currentTarget.style.background = scenario.accent.replace(',1)', ',0.05)');
				}}
				onmouseleave={(e) => {
					e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
					e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
				}}
				onclick={() => navigateTo('timeline', scenario.id)}
			>
				<div class="mb-2 text-2xl">{scenario.icon}</div>
				<div class="mb-1 text-sm font-semibold text-(--wl-text)">{scenario.name}</div>
				<div class="text-xs leading-relaxed text-(--wl-text-muted)" style="opacity: 0.7;">
					{scenario.description}
				</div>
			</button>
		{/each}
	</div>
</section>
