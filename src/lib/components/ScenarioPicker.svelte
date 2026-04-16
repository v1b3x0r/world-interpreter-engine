<script lang="ts">
	import { fade } from 'svelte/transition';
	import { scenarioList } from '$lib/composables/scenarios';
	import { navigateTo, selectScenario } from '$lib/composables/stores.svelte';

	const prefersReducedMotion =
		typeof window !== 'undefined'
			? window.matchMedia('(prefers-reduced-motion: reduce)').matches
			: false;

	function pick(id: string) {
		selectScenario(id);
		navigateTo('timeline');
	}
</script>

<div class="flex min-h-screen flex-col px-6 py-8" style="background: var(--wl-bg);">
	<button
		class="mb-6 cursor-pointer self-start text-sm text-[var(--wl-text-muted)] transition-opacity hover:opacity-80"
		onclick={() => navigateTo('hero')}
	>
		◂ กลับ
	</button>

	<h2 class="mb-2 text-xl font-semibold text-[var(--wl-text)]">เลือกโลกที่อยากฟัง</h2>
	<p class="mb-8 text-sm text-[var(--wl-text-muted)]">
		แต่ละโลกมี events และ interpreter ของตัวเอง
	</p>

	<div class="mx-auto grid w-full max-w-2xl grid-cols-2 gap-px" style="background: var(--wl-border);">
		{#each scenarioList as scenario, i (scenario.id)}
			<button
				class="cursor-pointer p-7 text-left transition-colors hover:bg-[var(--wl-accent-glow)]"
				style="background: var(--wl-bg);"
				in:fade={{ duration: prefersReducedMotion ? 0 : 150, delay: i * 50 }}
				onclick={() => pick(scenario.id)}
			>
				<div class="mb-3 text-3xl">{scenario.icon}</div>
				<div class="mb-1 text-base font-semibold text-[var(--wl-text)]">{scenario.name}</div>
				<div class="text-xs leading-relaxed text-[var(--wl-text-muted)]">{scenario.story}</div>
			</button>
		{/each}
	</div>
</div>
