// src/lib/composables/stores.svelte.ts
import { getScenarios, getScenarioList } from './scenarios';
import { getLocale } from '$lib/paraglide/runtime';
import { render } from './engine';
import type { RenderedEvent, Scenario } from './scenarios/types';

export type AppView = 'hero' | 'timeline' | 'editor';

const store = $state({
	view: 'hero' as AppView,
	activeScenarioId: 'home',
	editorMap: {} as Record<string, string>,
	showJson: false,
});

// Initialize editorMap from default scenario
$effect.root(() => {
	const scenarios = getScenarios(getLocale());
	if (Object.keys(store.editorMap).length === 0) {
		store.editorMap = { ...scenarios.home.interpreter.map };
	}
});

export const appStore = store;

export function getActiveScenario(): Scenario {
	const scenarios = getScenarios(getLocale());
	return scenarios[store.activeScenarioId];
}

export function getOutput(): RenderedEvent[] {
	const scenario = getActiveScenario();
	return render(scenario.events, {
		name: 'editor',
		tone: scenario.interpreter.tone,
		map: store.editorMap,
	});
}

export function getScenarioListForLocale(): Scenario[] {
	return getScenarioList(getLocale());
}

export function selectScenario(id: string) {
	const scenarios = getScenarios(getLocale());
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
	const scenarios = getScenarios(getLocale());
	store.editorMap = { ...scenarios[store.activeScenarioId].interpreter.map };
}
