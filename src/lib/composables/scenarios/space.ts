import type { Scenario } from './types';

export const space: Scenario = {
	id: 'space',
	name: 'สถานีอวกาศ',
	icon: '🚀',
	description: 'ออกซิเจน พลังงาน ลูกเรือ — จักรวาลไม่เคยเงียบ',
	story: 'Crew ตื่น O₂ stable แต่ reactor มี spike…',
	events: [
		{ type: 'presence.arrived', timestamp: '06:00', actor: 'Crew Alpha' },
		{ type: 'routine.hit', timestamp: '06:15', actor: 'O₂ system' },
		{ type: 'session.start', timestamp: '07:00', device: 'Lab Module' },
		{ type: 'anomaly', timestamp: '08:30', zone: 'Reactor Bay', severity: 'critical' },
		{ type: 'recovery', timestamp: '08:45', zone: 'Reactor Bay' },
		{ type: 'cycle.complete', timestamp: '11:00', device: 'Experiment Pod', duration_min: 240 },
		{ type: 'session.start', timestamp: '12:00', device: 'Comms Array' },
		{ type: 'session.end', timestamp: '12:30', device: 'Comms Array', duration_min: 30 },
	],
	interpreter: {
		name: 'Mission Control',
		tone: 'mission',
		map: {
			'presence.arrived': '{actor} — shift started',
			'presence.left': '{actor} — off duty',
			'session.start': '{device} online',
			'session.end': '{device} shutdown · {duration_min}min logged',
			anomaly: '🔴 ALERT: {zone} — anomaly detected',
			recovery: '✓ {zone} — nominal',
			'routine.hit': '{actor} — check complete',
			'routine.missed': '⚠ {actor} — missed scheduled check',
			'cycle.complete': '{device} — cycle complete · {duration_min}min',
			'threshold.crossed': '{zone} — threshold exceeded',
		},
	},
};
