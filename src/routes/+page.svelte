<script lang="ts">
	import {
		view,
		activeScenario,
		output,
		navigateTo,
		goToEditor,
	} from '$lib/composables/stores.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import ScenarioPicker from '$lib/components/ScenarioPicker.svelte';
	import Timeline from '$lib/components/Timeline.svelte';
	import Editor from '$lib/components/Editor.svelte';
</script>

{#if view === 'hero'}
	<Hero />
{:else if view === 'picker'}
	<ScenarioPicker />
{:else if view === 'timeline'}
	<div class="flex min-h-screen flex-col px-6 py-8" style="background: var(--wl-bg);">
		<button
			class="mb-6 cursor-pointer self-start text-sm text-(--wl-text-muted) transition-opacity hover:opacity-80"
			onclick={() => navigateTo('picker')}
		>
			◂ เลือกใหม่
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
				raw events → ถูกแปลงเป็นเรื่องด้วย interpreter
			</span>
			<button
				class="cursor-pointer rounded-lg border border-(--wl-border-accent) bg-(--wl-accent-glow) px-5 py-2 text-sm font-medium text-(--wl-accent) transition-opacity hover:opacity-80"
				onclick={() => goToEditor()}
			>
				ลองแก้ Interpreter →
			</button>
		</div>
	</div>
{:else if view === 'editor'}
	<Editor />
{/if}
