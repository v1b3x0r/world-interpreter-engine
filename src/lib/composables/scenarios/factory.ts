import type { Scenario } from './types';

export const factory: Scenario = {
	id: 'factory',
	name: 'โรงงาน',
	icon: '🏭',
	description: 'เครื่องจักร กะงาน พลังงาน — สายการผลิตมีเสียง',
	story: 'สายพานเริ่มหมุน ผลิตเสร็จล็อตแรก แต่มี spike…',
	events: [
		{ type: 'presence.arrived', timestamp: '06:00', actor: 'กะเช้า' },
		{ type: 'session.start', timestamp: '06:15', device: 'สายพาน A' },
		{ type: 'cycle.complete', timestamp: '08:30', device: 'สายพาน A', duration_min: 135 },
		{ type: 'anomaly', timestamp: '09:10', zone: 'ห้องเครื่อง', severity: 'critical' },
		{ type: 'recovery', timestamp: '09:25', zone: 'ห้องเครื่อง' },
		{ type: 'cycle.complete', timestamp: '11:45', device: 'สายพาน A', duration_min: 130 },
		{ type: 'threshold.crossed', timestamp: '12:00', zone: 'มิเตอร์ไฟ', severity: 'warning' },
		{ type: 'presence.left', timestamp: '14:00', actor: 'กะเช้า' },
		{ type: 'presence.arrived', timestamp: '14:00', actor: 'กะบ่าย' },
	],
	interpreter: {
		name: 'โรงงาน',
		tone: 'industrial',
		map: {
			'presence.arrived': '{actor} เข้ากะแล้ว',
			'presence.left': '{actor} หมดกะ',
			'session.start': '{device} เริ่มเดินเครื่อง',
			'session.end': '{device} หยุดเดินเครื่อง · {duration_min} นาที',
			anomaly: '🔴 {zone} — ตรวจพบความผิดปกติ',
			recovery: '{zone} กลับสู่สถานะปกติ',
			'routine.hit': '{actor} ตรวจสอบตามกำหนด',
			'routine.missed': '{actor} ยังไม่ตรวจสอบ',
			'cycle.complete': '{device} ผลิตเสร็จ 1 รอบ · {duration_min} นาที',
			'threshold.crossed': '{zone} พลังงานเกินเกณฑ์',
		},
	},
};
