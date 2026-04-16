import type { Scenario } from './types';

export const home: Scenario = {
	id: 'home',
	name: 'บ้าน',
	icon: '🏠',
	description: 'ไฟฟ้าเล่าว่าใครทำอะไร เมื่อไหร่',
	story: 'พ่อออกไปก่อน แม่ยังไม่กลับ มีอะไรบางอย่างในครัว…',
	events: [
		{ type: 'routine.hit', timestamp: '06:32', actor: 'พ่อ' },
		{ type: 'session.start', timestamp: '06:32', device: 'กาต้มน้ำ' },
		{ type: 'session.end', timestamp: '06:44', device: 'กาต้มน้ำ', duration_min: 12 },
		{ type: 'presence.left', timestamp: '07:15', actor: 'พ่อ' },
		{ type: 'session.start', timestamp: '08:40', device: 'ทีวีห้องนั่งเล่น' },
		{ type: 'anomaly', timestamp: '09:02', zone: 'ห้องครัว', severity: 'warning' },
		{ type: 'recovery', timestamp: '09:10', zone: 'ห้องครัว' },
		{ type: 'session.end', timestamp: '09:45', device: 'ทีวีห้องนั่งเล่น', duration_min: 65 },
		{ type: 'presence.arrived', timestamp: '10:20', actor: 'แม่' },
	],
	interpreter: {
		name: 'บ้าน',
		tone: 'warm',
		map: {
			'presence.arrived': '{actor} กลับบ้านแล้ว',
			'presence.left': '{actor} ออกจากบ้านแล้ว',
			'session.start': '{device} เริ่มทำงาน',
			'session.end': '{device} ปิดแล้ว · {duration_min} นาที',
			anomaly: '⚠ มีการใช้ไฟที่ไม่รู้จัก · {zone}',
			recovery: 'กลับสู่ปกติแล้ว · {zone}',
			'routine.hit': '{actor} ทำกิจวัตรตามปกติ',
			'routine.missed': '{actor} ยังไม่ทำกิจวัตรเช้า',
			'cycle.complete': '{device} เสร็จแล้ว · {duration_min} นาที',
			'threshold.crossed': '{zone} เกินเกณฑ์แล้ว',
		},
	},
};
