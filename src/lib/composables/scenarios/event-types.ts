// src/lib/composables/scenarios/event-types.ts
import type { EventTypeMeta } from './types';

export const EVENT_TYPES: EventTypeMeta[] = [
	{ type: 'presence.arrived', icon: '👤', label: 'Person arrived' },
	{ type: 'presence.left', icon: '🚶', label: 'Person left' },
	{ type: 'session.start', icon: '⚡', label: 'Device started' },
	{ type: 'session.end', icon: '⏹', label: 'Device stopped' },
	{ type: 'anomaly', icon: '⚠️', label: 'Anomaly detected' },
	{ type: 'recovery', icon: '✅', label: 'Back to normal' },
	{ type: 'routine.hit', icon: '🔁', label: 'Routine on schedule' },
	{ type: 'routine.missed', icon: '❌', label: 'Routine missed' },
	{ type: 'cycle.complete', icon: '🔄', label: 'Cycle complete' },
	{ type: 'threshold.crossed', icon: '📊', label: 'Threshold crossed' },
];

export const EVENT_TYPE_MAP: Record<string, EventTypeMeta> = Object.fromEntries(
	EVENT_TYPES.map((et) => [et.type, et])
);

export const VARIABLES = [
	{ name: '{actor}', description: 'ชื่อคน / ผู้กระทำ' },
	{ name: '{device}', description: 'ชื่ออุปกรณ์' },
	{ name: '{zone}', description: 'พื้นที่ / โซน' },
	{ name: '{duration_min}', description: 'ระยะเวลา (นาที)' },
];
