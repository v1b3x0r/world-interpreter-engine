// src/lib/composables/scenarios/types.ts

export type Severity = 'normal' | 'warning' | 'critical';

export type WorldEvent = {
	type: string;
	timestamp: string;
	actor?: string;
	device?: string;
	zone?: string;
	duration_min?: number;
	severity?: Severity;
};

export type InterpreterTone = 'warm' | 'mission' | 'industrial' | 'glitch' | 'calm';

export type Interpreter = {
	name: string;
	tone: InterpreterTone;
	map: Record<string, string>;
};

export type Scenario = {
	id: string;
	name: string;
	icon: string;
	description: string;
	story: string;
	events: WorldEvent[];
	interpreter: Interpreter;
};

export type EventTypeMeta = {
	type: string;
	icon: string;
	label: string;
};

export type RenderedEvent = {
	text: string;
	type: string;
	timestamp: string;
	severity: Severity;
};
