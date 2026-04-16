import type { Scenario } from './types';

export const hospital: Scenario = {
	id: 'hospital',
	name: 'โรงพยาบาล',
	icon: '🏥',
	description: 'คนไข้ เครื่องมือ ห้องตรวจ — ทุกชีวิตมีจังหวะ',
	story: 'คนไข้ทยอยมา ห้องตรวจเริ่มเปิด เครื่องมอนิเตอร์ส่งสัญญาณ…',
	events: [
		{ type: 'presence.arrived', timestamp: '07:00', actor: 'พยาบาลกะเช้า' },
		{ type: 'routine.hit', timestamp: '07:15', actor: 'ระบบฆ่าเชื้อ' },
		{ type: 'session.start', timestamp: '08:00', device: 'ห้องตรวจ 1' },
		{ type: 'presence.arrived', timestamp: '08:10', actor: 'คนไข้รายแรก' },
		{ type: 'threshold.crossed', timestamp: '10:30', zone: 'ห้องรอ', severity: 'warning' },
		{ type: 'anomaly', timestamp: '11:45', zone: 'เครื่องมอนิเตอร์ ICU', severity: 'critical' },
		{ type: 'recovery', timestamp: '11:52', zone: 'เครื่องมอนิเตอร์ ICU' },
		{ type: 'cycle.complete', timestamp: '12:00', device: 'ห้องตรวจ 1', duration_min: 240 },
		{ type: 'session.end', timestamp: '16:00', device: 'ห้องตรวจ 1', duration_min: 480 },
		{ type: 'presence.left', timestamp: '16:30', actor: 'พยาบาลกะเช้า' },
	],
	interpreter: {
		name: 'โรงพยาบาล',
		tone: 'warm',
		map: {
			'presence.arrived': '{actor} มาถึงแล้ว',
			'presence.left': '{actor} เลิกกะแล้ว',
			'session.start': '{device} เปิดให้บริการ',
			'session.end': '{device} ปิดให้บริการ · {duration_min} นาที',
			anomaly: '🚨 {zone} — สัญญาณผิดปกติ',
			recovery: '✓ {zone} กลับสู่ปกติ',
			'routine.hit': '{actor} ทำงานตามตาราง',
			'routine.missed': '{actor} ยังไม่ดำเนินการ',
			'cycle.complete': '{device} ตรวจครบรอบ · {duration_min} นาที',
			'threshold.crossed': '{zone} คนรอเยอะ',
		},
	},
};
