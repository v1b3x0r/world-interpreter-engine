// src/lib/composables/stores.svelte.ts
import { scenarios } from './scenarios';
import { render } from './engine';
import type { RenderedEvent } from './scenarios/types';

export type AppView = 'hero' | 'picker' | 'timeline' | 'editor';

export let view = $state<AppView>('hero');
export let activeScenarioId = $state<string>('home');
export let editorMap = $state<Record<string, string>>({ ...scenarios.home.interpreter.map });
export let showJson = $state<boolean>(false);

export const activeScenario = $derived(scenarios[activeScenarioId]);
export const output: RenderedEvent[] = $derived(
	render(activeScenario.events, { name: 'editor', tone: activeScenario.interpreter.tone, map: editorMap })
);

export function selectScenario(id: string) {
	activeScenarioId = id;
	editorMap = { ...scenarios[id].interpreter.map };
}

export function navigateTo(target: AppView, scenarioId?: string) {
	if (scenarioId) {
		selectScenario(scenarioId);
	}
	view = target;
}

export function goToEditor(scenarioId?: string) {
	selectScenario(scenarioId ?? activeScenarioId);
	view = 'editor';
}

export function toggleJson() {
	showJson = !showJson;
}

export function resetInterpreter() {
	editorMap = { ...activeScenario.interpreter.map };
}
