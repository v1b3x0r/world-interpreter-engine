<script lang="ts">
	import {
		appStore,
		getActiveScenario,
		getOutput,
		getScenarioListForLocale,
		selectScenario,
		toggleJson,
		resetInterpreter,
		navigateTo,
	} from '$lib/composables/stores.svelte';
	import { EVENT_TYPES } from '$lib/composables/scenarios/event-types';
	import { render } from '$lib/composables/engine';
	import Timeline from './Timeline.svelte';
	import TemplateField from './TemplateField.svelte';
	import VariableChips from './VariableChips.svelte';
	import LocaleSwitcher from './LocaleSwitcher.svelte';
	import { m } from '$lib/paraglide/messages.js';

	const activeScenario = $derived(getActiveScenario());
	const output = $derived(getOutput());

	// Preview for ALL template types — fill in placeholders for types missing from scenario events
	const fullPreview = $derived.by(() => {
		const coveredTypes = new Set(output.map((e) => e.type));
		const placeholders = EVENT_TYPES.filter((et) => !coveredTypes.has(et.type)).map((et) => ({
			type: et.type,
			timestamp: '--:--',
			actor: 'Someone',
			device: 'Device',
			zone: 'Zone',
			duration_min: 30,
		}));
		if (placeholders.length === 0) return output;
		const interpreter = {
			name: 'editor',
			tone: activeScenario.interpreter.tone,
			map: appStore.editorMap,
		} as const;
		return [...output, ...render(placeholders, interpreter)];
	});

	function handleInsert(variable: string) {
		const activeEl = document.activeElement;
		if (activeEl instanceof HTMLInputElement) {
			const start = activeEl.selectionStart ?? activeEl.value.length;
			const end = activeEl.selectionEnd ?? start;
			const before = activeEl.value.slice(0, start);
			const after = activeEl.value.slice(end);
			const newVal = before + variable + after;

			const typeAttr = activeEl.closest('[data-type]')?.getAttribute('data-type');
			if (typeAttr) {
				appStore.editorMap[typeAttr] = newVal;
			}

			requestAnimationFrame(() => {
				activeEl.focus();
				activeEl.setSelectionRange(start + variable.length, start + variable.length);
			});
		}
	}
</script>

<div class="flex h-screen flex-col md:flex-row" style="background: var(--wl-bg);">
	<!-- Sidebar: horizontal strip on mobile, vertical column on desktop -->
	<div
		class="flex shrink-0 gap-1 overflow-x-auto border-b px-3 py-2 md:w-50 md:flex-col md:overflow-x-visible md:overflow-y-auto md:border-r md:border-b-0 md:p-4"
		style="border-color: var(--wl-border); background: rgba(0,0,0,0.15);"
	>
		<div class="hidden text-[10px] uppercase tracking-widest text-(--wl-text-muted) md:mb-3 md:block">
			{m.editor_sidebar_worlds()}
		</div>

		<!-- Back button (mobile: inline, desktop: bottom) -->
		<button
			class="shrink-0 cursor-pointer rounded-md px-2 py-1.5 text-xs text-(--wl-text-muted) transition-opacity hover:opacity-80 md:hidden"
			onclick={() => navigateTo('hero')}
		>
			◂
		</button>

		{#each getScenarioListForLocale() as scenario (scenario.id)}
			<button
				class="flex shrink-0 cursor-pointer items-center gap-1.5 rounded-md px-2.5 py-1.5 text-left text-sm transition-colors md:mb-1 md:gap-2 md:px-3 md:py-2"
				style={appStore.activeScenarioId === scenario.id
					? `background: ${scenario.accent.replace(',1)', ',0.08)')}; border: 1px solid ${scenario.accent.replace(',1)', ',0.2)')}; color: ${scenario.accent};`
					: 'opacity: 0.4; border: 1px solid transparent;'}
				onclick={() => selectScenario(scenario.id)}
			>
				<span class="text-base">{scenario.icon}</span>
				<span class="hidden md:inline">{scenario.name}</span>
			</button>
		{/each}

		<!-- Desktop-only controls -->
		<div class="my-3 hidden h-px md:block" style="background: var(--wl-border);"></div>

		<button
			class="hidden cursor-pointer px-3 py-2 text-left text-xs text-(--wl-text-muted) transition-opacity hover:opacity-80 md:block"
			onclick={toggleJson}
			aria-expanded={appStore.showJson}
		>
			{appStore.showJson ? m.editor_json_hide() : m.editor_json_show()}
		</button>

		<button
			class="hidden cursor-pointer px-3 py-2 text-left text-xs text-(--wl-text-muted) transition-opacity hover:opacity-80 md:block"
			onclick={resetInterpreter}
		>
			{m.editor_reset()}
		</button>

		<div class="mt-auto hidden flex-col gap-2 md:flex">
			<a
				href="https://github.com/v1b3x0r/world-interpreter-engine"
				target="_blank"
				rel="noopener noreferrer"
				class="rounded-md border px-3 py-2 text-center text-xs font-medium transition-opacity hover:opacity-80"
				style="border-color: var(--wl-border-accent); color: var(--wl-accent);"
			>
				{m.editor_star_github()}
			</a>
			<button
				class="cursor-pointer text-xs text-(--wl-text-muted) transition-opacity hover:opacity-80"
				onclick={() => navigateTo('hero')}
			>
				{m.editor_back()}
			</button>
		</div>
	</div>

	<!-- Main content: stacked on mobile, side-by-side on desktop -->
	<div class="flex min-h-0 flex-1 flex-col md:flex-row">
		<!-- Templates panel -->
		<div class="flex-1 overflow-y-auto border-b p-4 md:border-r md:border-b-0 md:p-5" style="border-color: var(--wl-border);">
			<div class="mb-4 text-[10px] uppercase tracking-widest text-(--wl-text-muted)">
				{m.editor_templates_label()}
			</div>

			<div class="flex flex-col gap-2">
				{#each EVENT_TYPES as meta (meta.type)}
					<div data-type={meta.type}>
						<TemplateField
							{meta}
							value={appStore.editorMap[meta.type] ?? ''}
							onchange={(val) => {
								appStore.editorMap[meta.type] = val;
							}}
						/>
					</div>
				{/each}
			</div>

			<div class="mt-5">
				<VariableChips oninsert={handleInsert} />
			</div>

			{#if appStore.showJson}
				<div class="mt-5">
					<div class="mb-2 text-[10px] uppercase tracking-widest text-(--wl-text-muted)">
						{m.editor_raw_json_label()}
					</div>
					<pre
						class="overflow-auto rounded-lg p-4 font-mono text-xs text-(--wl-text-muted)"
						style="background: rgba(0,0,0,0.3);"
					>{JSON.stringify({ events: activeScenario.events, interpreter: { map: appStore.editorMap } }, null, 2)}</pre>
				</div>
			{/if}
		</div>

		<!-- Live Preview -->
		<div class="min-h-0 flex-1 overflow-y-auto p-4 md:w-95 md:flex-none md:p-5" style="background: rgba(0,0,0,0.1);">
			<div class="mb-4 flex items-center justify-between">
				<div class="text-[10px] uppercase tracking-widest text-(--wl-text-muted)">
					{m.editor_preview_label()}
				</div>
				<LocaleSwitcher />
			</div>
			<Timeline events={fullPreview} animate={false} />
		</div>
	</div>
</div>
