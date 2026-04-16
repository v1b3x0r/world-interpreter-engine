// src/lib/composables/scenarios/index.ts
import type { Scenario } from './types';

const sharedEvents = [
	{ type: 'presence.arrived', timestamp: '2024-01-15T08:00:00Z', actor: 'Charlie' },
	{ type: 'session.start', timestamp: '2024-01-15T08:05:00Z', device: 'tv' },
	{ type: 'session.end', timestamp: '2024-01-15T08:35:00Z', device: 'tv', duration_min: 30 },
	{ type: 'cycle.complete', timestamp: '2024-01-15T09:00:00Z', zone: 'lawn', duration_min: 25 },
	{ type: 'routine.hit', timestamp: '2024-01-15T09:30:00Z', actor: 'Charlie' },
	{ type: 'anomaly', timestamp: '2024-01-15T10:00:00Z', device: 'sensor-1', severity: 'warning' as const },
	{ type: 'recovery', timestamp: '2024-01-15T10:05:00Z', device: 'sensor-1' },
	{ type: 'presence.left', timestamp: '2024-01-15T18:00:00Z', actor: 'Charlie' },
];

export const scenarios: Record<string, Scenario> = {
	home: {
		id: 'home',
		name: 'Home',
		icon: '🏠',
		description: 'Smart home events interpreted in warm, everyday language',
		story: 'A day in a connected home — arrivals, routines, and small moments made readable.',
		events: sharedEvents,
		interpreter: {
			name: 'home',
			tone: 'warm',
			map: {
				'presence.arrived': '{actor} กลับบ้านแล้ว',
				'presence.left': '{actor} ออกจากบ้านแล้ว',
				'session.start': '{device} เริ่มทำงาน',
				'session.end': '{device} ปิดแล้ว · {duration_min} นาที',
				'cycle.complete': 'สนามหญ้าได้น้ำแล้ว · {duration_min} นาที',
				'routine.hit': '{actor} ทำตามตารางเรียบร้อย',
				'anomaly': '{device} ผิดปกติ',
				'recovery': '{device} กลับมาปกติแล้ว',
			},
		},
	},
	rover: {
		id: 'rover',
		name: 'Rover',
		icon: '🚀',
		description: 'Same events re-cast as a Mars habitat mission log',
		story: 'Crew telemetry from an off-world habitat — every event a mission-critical dispatch.',
		events: sharedEvents,
		interpreter: {
			name: 'rover',
			tone: 'mission',
			map: {
				'presence.arrived': 'Crew member {actor} re-entered habitat',
				'presence.left': 'Crew member {actor} departed habitat',
				'session.start': 'Subsystem {device} activated',
				'session.end': 'Subsystem {device} shutdown · {duration_min} min',
				'cycle.complete': 'Hydration cycle complete · {duration_min} min',
				'routine.hit': '{actor} — scheduled routine confirmed',
				'anomaly': 'ALERT: {device} anomaly detected',
				'recovery': '{device} nominal — anomaly resolved',
			},
		},
	},
	cyberpunk: {
		id: 'cyberpunk',
		name: 'Cyberpunk',
		icon: '⚡',
		description: 'Gritty, terse readouts for a neon-drenched future',
		story: 'Node signals from the grid — terse, electric, alive.',
		events: sharedEvents,
		interpreter: {
			name: 'cyberpunk',
			tone: 'glitch',
			map: {
				'presence.arrived': '>> identity {actor} detected',
				'presence.left': '>> identity {actor} signal lost',
				'session.start': '⚡ node[{device}] online',
				'session.end': '⚡ node[{device}] offline :: {duration_min}m',
				'cycle.complete': '~~ green patch hydrated ({duration_min}m)',
				'routine.hit': '// routine {actor} — checksum OK',
				'anomaly': '!! {device} FAULT — severity flagged',
				'recovery': '// {device} — fault cleared',
			},
		},
	},
};
