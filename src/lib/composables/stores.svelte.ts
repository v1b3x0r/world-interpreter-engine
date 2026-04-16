// src/lib/composables/stores.svelte.ts
import { scenarios } from './scenarios';
import { render } from './engine';
import type { RenderedEvent, Scenario } from './scenarios/types';

export type AppView = 'hero' | 'picker' | 'timeline' | 'editor';

// Reactive state — use object to avoid "cannot export reassigned $state"
const store = $state({
	view: 'hero' as AppView,
	activeScenarioId: 'home',
	editorMap: { ...scenarios.home.interpreter.map } as Record<string, string>,
	showJson: false,
});

export const appStore = store;

// Derived values exposed as getter functions (Svelte 5 forbids exporting $derived from modules)
export function getActiveScenario(): Scenario {
	return scenarios[store.activeScenarioId];
}

export function getOutput(): RenderedEvent[] {
	const scenario = scenarios[store.activeScenarioId];
	return render(scenario.events, {
		name: 'editor',
		tone: scenario.interpreter.tone,
		map: store.editorMap,
	});
}

// Actions
export function selectScenario(id: string) {
	store.activeScenarioId = id;
	store.editorMap = { ...scenarios[id].interpreter.map };
}

export function navigateTo(target: AppView, scenarioId?: string) {
	if (scenarioId) {
		selectScenario(scenarioId);
	}
	store.view = target;
}

export function goToEditor(scenarioId?: string) {
	selectScenario(scenarioId ?? store.activeScenarioId);
	store.view = 'editor';
}

export function toggleJson() {
	store.showJson = !store.showJson;
}

export function resetInterpreter() {
	const scenario = scenarios[store.activeScenarioId];
	store.editorMap = { ...scenario.interpreter.map };
}
