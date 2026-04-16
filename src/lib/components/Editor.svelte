<script lang="ts">
	import {
		activeScenario,
		activeScenarioId,
		editorMap,
		output,
		showJson,
		selectScenario,
		toggleJson,
		resetInterpreter,
		navigateTo,
	} from '$lib/composables/stores.svelte';
	import { scenarioList } from '$lib/composables/scenarios';
	import { EVENT_TYPES } from '$lib/composables/scenarios/event-types';
	import Timeline from './Timeline.svelte';
	import TemplateField from './TemplateField.svelte';
	import VariableChips from './VariableChips.svelte';

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
				editorMap[typeAttr] = newVal;
			}

			requestAnimationFrame(() => {
				activeEl.focus();
				activeEl.setSelectionRange(start + variable.length, start + variable.length);
			});
		}
	}
</script>

<div class="flex h-screen" style="background: var(--wl-bg);">
	<!-- Sidebar -->
	<div
		class="flex w-[200px] flex-shrink-0 flex-col border-r p-4"
		style="border-color: var(--wl-border); background: rgba(0,0,0,0.15);"
	>
		<div class="mb-3 text-[10px] uppercase tracking-widest text-(--wl-text-muted)">
			▸ Scenarios
		</div>

		{#each scenarioList as scenario (scenario.id)}
			<button
				class="mb-1 flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-left text-sm transition-colors"
				class:text-[var(--wl-accent)]={activeScenarioId === scenario.id}
				style={activeScenarioId === scenario.id
					? 'background: rgba(34,197,94,0.08); border: 1px solid rgba(34,197,94,0.15);'
					: 'opacity: 0.4; border: 1px solid transparent;'}
				onclick={() => selectScenario(scenario.id)}
			>
				<span class="text-base">{scenario.icon}</span>
				<span>{scenario.name}</span>
			</button>
		{/each}

		<div class="my-3 h-px" style="background: var(--wl-border);"></div>

		<button
			class="cursor-pointer px-3 py-2 text-left text-xs text-(--wl-text-muted) transition-opacity hover:opacity-80"
			onclick={toggleJson}
			aria-expanded={showJson}
		>
			⟨/⟩ {showJson ? 'ซ่อน' : 'ดู'} JSON
		</button>

		<button
			class="cursor-pointer px-3 py-2 text-left text-xs text-(--wl-text-muted) transition-opacity hover:opacity-80"
			onclick={resetInterpreter}
		>
			↺ Reset to default
		</button>

		<div class="mt-auto">
			<button
				class="cursor-pointer text-xs text-(--wl-text-muted) transition-opacity hover:opacity-80"
				onclick={() => navigateTo('hero')}
			>
				◂ กลับหน้าแรก
			</button>
		</div>
	</div>

	<!-- Templates panel -->
	<div class="flex-1 overflow-y-auto border-r p-5" style="border-color: var(--wl-border);">
		<div class="mb-4 text-[10px] uppercase tracking-widest text-(--wl-text-muted)">
			▸ Templates — แก้ได้เลย
		</div>

		<div class="flex flex-col gap-2">
			{#each EVENT_TYPES as meta (meta.type)}
				<div data-type={meta.type}>
					<TemplateField
						{meta}
						value={editorMap[meta.type] ?? ''}
						onchange={(val) => {
							editorMap[meta.type] = val;
						}}
					/>
				</div>
			{/each}
		</div>

		<div class="mt-5">
			<VariableChips oninsert={handleInsert} />
		</div>

		{#if showJson}
			<div class="mt-5">
				<div class="mb-2 text-[10px] uppercase tracking-widest text-(--wl-text-muted)">
					▸ Raw JSON
				</div>
				<pre
					class="overflow-auto rounded-lg p-4 font-mono text-xs text-(--wl-text-muted)"
					style="background: rgba(0,0,0,0.3);"
				>{JSON.stringify({ events: activeScenario.events, interpreter: { map: editorMap } }, null, 2)}</pre>
			</div>
		{/if}
	</div>

	<!-- Live Preview -->
	<div class="w-[380px] flex-shrink-0 overflow-y-auto p-5" style="background: rgba(0,0,0,0.1);">
		<div class="mb-4 text-[10px] uppercase tracking-widest text-(--wl-text-muted)">
			▸ Live Preview
		</div>
		<Timeline events={output} animate={false} />
	</div>
</div>
