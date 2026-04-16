<script lang="ts">
	import { fly, fade } from 'svelte/transition';
	import { render } from '$lib/composables/engine';
	import { scenarios } from '$lib/composables/scenarios';
	import { navigateTo, goToEditor } from '$lib/composables/stores.svelte';
	import TimelineEvent from './TimelineEvent.svelte';

	const homeEvents = scenarios.home.events.slice(0, 4);
	const homePreview = render(homeEvents, scenarios.home.interpreter);

	const punchEvent = scenarios.home.events.find((e) => e.type === 'presence.arrived')!;
	const punchHome = render([punchEvent], scenarios.home.interpreter)[0];
	const punchSpace = render([punchEvent], scenarios.space.interpreter)[0];

	let showPunch = $state(false);

	$effect(() => {
		const timer = setTimeout(() => {
			showPunch = true;
		}, homeEvents.length * 400 + 800);
		return () => clearTimeout(timer);
	});

	const prefersReducedMotion =
		typeof window !== 'undefined'
			? window.matchMedia('(prefers-reduced-motion: reduce)').matches
			: false;
</script>

<div
	class="flex min-h-screen flex-col items-center justify-center px-6"
	style="background: var(--wl-bg);"
>
	<div
		class="pointer-events-none absolute h-[400px] w-[500px] rounded-full opacity-30"
		style="background: radial-gradient(circle, rgba(34,197,94,0.08) 0%, transparent 70%);"
	></div>

	<h1
		class="wl-glow relative mb-2 text-3xl font-bold text-[var(--wl-text)]"
		in:fade={{ duration: prefersReducedMotion ? 0 : 300 }}
	>
		ทุกสิ่งมีเรื่องเล่า
	</h1>
	<p class="relative mb-10 text-sm text-[var(--wl-text-muted)]">
		raw events → human stories
	</p>

	<div class="relative mb-8 w-full max-w-md">
		{#each homePreview as event, i (i)}
			<div
				class="mb-2"
				in:fly={{ y: 12, duration: prefersReducedMotion ? 0 : 300, delay: i * 400 }}
			>
				<TimelineEvent {event} />
			</div>
		{/each}
	</div>

	{#if showPunch}
		<div
			class="relative mb-10 flex w-full max-w-lg gap-4"
			in:fade={{ duration: prefersReducedMotion ? 0 : 200 }}
		>
			<div class="wl-card flex-1 p-4">
				<div class="mb-2 text-xs text-[var(--wl-text-muted)]">🏠 บ้าน</div>
				<div class="text-sm text-[var(--wl-text)]">{punchHome.text}</div>
			</div>
			<div class="wl-card flex-1 p-4">
				<div class="mb-2 text-xs text-[var(--wl-text-muted)]">🚀 อวกาศ</div>
				<div class="text-sm text-[var(--wl-text)]">{punchSpace.text}</div>
			</div>
		</div>
	{/if}

	<div class="relative flex gap-3">
		<button
			class="cursor-pointer rounded-xl border border-[var(--wl-border-accent)] bg-[var(--wl-accent-glow)] px-7 py-3 font-semibold text-[var(--wl-accent)] transition-opacity hover:opacity-80"
			onclick={() => navigateTo('picker')}
		>
			เลือกโลกที่อยากฟัง →
		</button>
		<button
			class="cursor-pointer rounded-xl border border-[var(--wl-border)] bg-transparent px-7 py-3 text-[var(--wl-text-muted)] transition-opacity hover:opacity-80"
			onclick={() => goToEditor('home')}
		>
			เปิด Editor เลย
		</button>
	</div>
	<div class="mt-2 flex gap-12 text-[10px] text-[var(--wl-text-muted)]">
		<span>ยังไม่รู้จัก? เริ่มจากตรงนี้</span>
		<span>รู้แล้ว? ข้ามไปเล่นเลย</span>
	</div>
</div>
