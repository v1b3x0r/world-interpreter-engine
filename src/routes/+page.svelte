<script lang="ts">
	import {
		appStore,
		getActiveScenario,
		getOutput,
		navigateTo,
		goToEditor,
	} from '$lib/composables/stores.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import ScenarioPicker from '$lib/components/ScenarioPicker.svelte';
	import Timeline from '$lib/components/Timeline.svelte';
	import Editor from '$lib/components/Editor.svelte';
	import LocaleSwitcher from '$lib/components/LocaleSwitcher.svelte';
	import { m } from '$lib/paraglide/messages.js';

	const jsonLdDescription =
		'Open-source semantic layer engine that transforms IoT events, sensor data, and system logs into human-readable narratives. Same events, different interpreters, different stories.';

	const title = $derived(m.meta_title());
	const description = $derived(m.meta_description());
	const url = 'https://worldlog.dev';
	const ogImage = `${url}/og.png`;
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={url} />

	<!-- Open Graph -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content={url} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={ogImage} />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="@v1b3x0r" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={ogImage} />

	<!-- SEO hints -->
	<meta name="robots" content="index, follow" />
	<meta name="author" content="v1b3x0r" />
	<meta
		name="keywords"
		content="world log, event interpreter, IoT narrative, semantic layer, smart home, sensor data, open source, event-driven, DreamFlow"
	/>

	<!-- JSON-LD Structured Data -->
	{@html `<script type="application/ld+json">${JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'SoftwareApplication',
		name: 'World Log Engine',
		description: jsonLdDescription,
		url,
		applicationCategory: 'DeveloperApplication',
		operatingSystem: 'Any',
		license: 'https://opensource.org/licenses/MIT',
		author: {
			'@type': 'Person',
			name: 'v1b3x0r',
			url: 'https://x.com/v1b3x0r',
		},
		offers: {
			'@type': 'Offer',
			price: '0',
			priceCurrency: 'USD',
		},
	})}</script>`}
</svelte:head>

<!-- Locale switcher — fixed top-right on all views -->
<div class="fixed top-4 right-4 z-50">
	<LocaleSwitcher />
</div>

{#if appStore.view === 'hero'}
	<Hero />
{:else if appStore.view === 'picker'}
	<ScenarioPicker />
{:else if appStore.view === 'timeline'}
	{@const activeScenario = getActiveScenario()}
	{@const output = getOutput()}
	<div class="flex min-h-screen flex-col px-6 py-8" style="background: var(--wl-bg);">
		<button
			class="mb-6 cursor-pointer self-start text-sm text-(--wl-text-muted) transition-opacity hover:opacity-80"
			onclick={() => navigateTo('picker')}
		>
			{m.timeline_back()}
		</button>

		<div class="mb-6 flex items-center gap-3">
			<span class="text-2xl">{activeScenario.icon}</span>
			<div>
				<h2 class="text-lg font-semibold text-(--wl-text)">{activeScenario.name}</h2>
				<p class="text-xs text-(--wl-text-muted)">{activeScenario.story}</p>
			</div>
		</div>

		<div class="mx-auto w-full max-w-xl flex-1">
			<Timeline events={output} />
		</div>

		<div
			class="mx-auto mt-8 flex w-full max-w-xl items-center justify-between border-t pt-4"
			style="border-color: var(--wl-border);"
		>
			<span class="text-xs text-(--wl-text-muted)">
				{m.timeline_hint()}
			</span>
			<button
				class="cursor-pointer rounded-lg border border-(--wl-border-accent) bg-(--wl-accent-glow) px-5 py-2 text-sm font-medium text-(--wl-accent) transition-opacity hover:opacity-80"
				onclick={() => goToEditor()}
			>
				{m.timeline_cta_editor()}
			</button>
		</div>
	</div>
{:else if appStore.view === 'editor'}
	<Editor />
{/if}
