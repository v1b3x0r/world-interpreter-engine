<script lang="ts">
	import { fade } from 'svelte/transition';
	import ParticleCanvas from './ParticleCanvas.svelte';
	import { goToEditor } from '$lib/composables/stores.svelte';
	import { m } from '$lib/paraglide/messages.js';

	const prefersReducedMotion =
		typeof window !== 'undefined'
			? window.matchMedia('(prefers-reduced-motion: reduce)').matches
			: false;
</script>

<section class="relative flex min-h-screen flex-col items-center justify-center px-6">
	<ParticleCanvas />

	<!-- Green radial glow -->
	<div
		class="pointer-events-none absolute h-[400px] w-[500px] rounded-full opacity-30"
		style="background: radial-gradient(circle, rgba(34,197,94,0.12) 0%, transparent 70%);"
	></div>

	<!-- Sub-brand -->
	<span
		class="relative mb-4 text-[10px] uppercase tracking-[3px]"
		style="color: rgba(34,197,94,0.6);"
		in:fade={{ duration: prefersReducedMotion ? 0 : 400 }}
	>
		{m.hero_brand()}
	</span>

	<!-- Headline -->
	<h1
		class="wl-glow relative mb-3 text-center text-5xl font-extrabold leading-tight tracking-tight text-(--wl-text) md:text-6xl"
		style="letter-spacing: -1px;"
		in:fade={{ duration: prefersReducedMotion ? 0 : 400, delay: 100 }}
	>
		{m.hero_headline()}
	</h1>

	<!-- Subtitle -->
	<p
		class="relative mb-10 max-w-md text-center text-sm text-(--wl-text-muted)"
		style="opacity: 0.7;"
		in:fade={{ duration: prefersReducedMotion ? 0 : 400, delay: 200 }}
	>
		{m.hero_description()}
	</p>

	<!-- CTAs -->
	<div
		class="relative flex gap-3"
		in:fade={{ duration: prefersReducedMotion ? 0 : 400, delay: 300 }}
	>
		<a
			href="https://github.com/v1b3x0r/world-interpreter-engine"
			target="_blank"
			rel="noopener noreferrer"
			class="rounded-xl border px-7 py-3 font-semibold transition-opacity hover:opacity-80"
			style="border-color: var(--wl-border-accent); background: var(--wl-accent-glow); color: var(--wl-accent);"
		>
			{m.hero_cta_star()}
		</a>
		<button
			class="cursor-pointer rounded-xl border border-(--wl-border) bg-transparent px-7 py-3 text-(--wl-text-muted) transition-opacity hover:opacity-80"
			onclick={() => goToEditor('home')}
		>
			{m.hero_cta_editor()}
		</button>
	</div>

	<!-- Scroll hint -->
	<div
		class="absolute bottom-8 text-xs text-(--wl-text-muted)"
		style="opacity: 0.4;"
		in:fade={{ duration: prefersReducedMotion ? 0 : 400, delay: 600 }}
	>
		{m.hero_scroll_hint()}
	</div>
</section>
