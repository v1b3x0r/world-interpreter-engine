import type { Scenario } from './types';

export const farm: Scenario = {
	id: 'farm',
	name: 'ฟาร์ม',
	icon: '🌾',
	description: 'น้ำ แดด ดิน — ไร่เล่าว่ามันเป็นยังไง',
	story: 'แดดออก น้ำไหล ดินชุ่ม แต่ปั๊มมีปัญหา…',
	events: [
		{ type: 'routine.hit', timestamp: '05:00', actor: 'ระบบรดน้ำ' },
		{ type: 'session.start', timestamp: '05:00', device: 'ปั๊มน้ำ' },
		{ type: 'cycle.complete', timestamp: '05:40', device: 'ปั๊มน้ำ', duration_min: 40 },
		{ type: 'threshold.crossed', timestamp: '11:00', zone: 'แปลงผัก', severity: 'warning' },
		{ type: 'session.start', timestamp: '13:00', device: 'ปั๊มน้ำ' },
		{ type: 'anomaly', timestamp: '13:15', zone: 'ปั๊มน้ำ', severity: 'warning' },
		{ type: 'recovery', timestamp: '13:30', zone: 'ปั๊มน้ำ' },
		{ type: 'cycle.complete', timestamp: '14:00', device: 'ปั๊มน้ำ', duration_min: 60 },
	],
	interpreter: {
		name: 'ฟาร์ม',
		tone: 'calm',
		map: {
			'presence.arrived': '{actor} มาถึงไร่แล้ว',
			'presence.left': '{actor} กลับจากไร่แล้ว',
			'session.start': '{device} เริ่มทำงาน',
			'session.end': '{device} หยุดแล้ว · {duration_min} นาที',
			anomaly: '⚠ {zone} มีปัญหา',
			recovery: '{zone} กลับมาปกติ',
			'routine.hit': '{actor} ทำงานตามเวลา',
			'routine.missed': '{actor} ยังไม่ทำงาน',
			'cycle.complete': '{device} รอบนี้เสร็จ · {duration_min} นาที',
			'threshold.crossed': '{zone} อุณหภูมิสูงเกินไป',
		},
	},
};
