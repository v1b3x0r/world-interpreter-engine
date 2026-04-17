import type { Scenario } from './types';
import { home } from './home';
import { cafe } from './cafe';
import { factory } from './factory';
import { farm } from './farm';
import { space } from './space';
import { hospital } from './hospital';
import { car } from './car';
import { humanoid } from './humanoid';

const allScenarios: Record<string, Record<string, Scenario>> = {
	home,
	cafe,
	factory,
	farm,
	hospital,
	space,
	car,
	humanoid,
};

const orderedIds = ['home', 'cafe', 'factory', 'farm', 'hospital', 'space', 'car', 'humanoid'];

function resolve(locale: string): string {
	return locale in (allScenarios.home ?? {}) ? locale : 'en';
}

export function getScenarios(locale: string): Record<string, Scenario> {
	const loc = resolve(locale);
	return Object.fromEntries(orderedIds.map((id) => [id, allScenarios[id][loc]]));
}

export function getScenarioList(locale: string): Scenario[] {
	const loc = resolve(locale);
	return orderedIds.map((id) => allScenarios[id][loc]);
}
