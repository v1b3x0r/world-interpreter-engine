import type { Scenario } from './types';

export const cafe: Scenario = {
	id: 'cafe',
	name: 'ร้านกาแฟ',
	icon: '☕',
	description: 'เครื่องชง ตู้เย็น ไฟ — ร้านเล่าวันของมัน',
	story: 'เครื่องชงอุ่นตัว ลูกค้าทยอยมา ช่วงบ่ายร้านเงียบ…',
	events: [
		{ type: 'presence.arrived', timestamp: '05:30', actor: 'บาริสต้า' },
		{ type: 'session.start', timestamp: '05:45', device: 'เครื่องชงกาแฟ' },
		{ type: 'routine.hit', timestamp: '06:00', actor: 'ร้าน' },
		{ type: 'threshold.crossed', timestamp: '08:30', zone: 'หน้าร้าน', severity: 'normal' },
		{ type: 'anomaly', timestamp: '10:15', zone: 'เครื่องชง', severity: 'warning' },
		{ type: 'recovery', timestamp: '10:25', zone: 'เครื่องชง' },
		{ type: 'session.end', timestamp: '14:00', device: 'เครื่องชงกาแฟ', duration_min: 495 },
		{ type: 'presence.left', timestamp: '14:30', actor: 'บาริสต้า' },
	],
	interpreter: {
		name: 'ร้านกาแฟ',
		tone: 'calm',
		map: {
			'presence.arrived': '{actor} มาเปิดร้านแล้ว',
			'presence.left': '{actor} ปิดร้านแล้ว',
			'session.start': '{device} อุ่นเครื่องพร้อมชง',
			'session.end': '{device} ปิดแล้ว · ทำงานมา {duration_min} นาที',
			anomaly: '⚠ {zone} มีอาการผิดปกติ',
			recovery: '{zone} กลับมาปกติแล้ว',
			'routine.hit': '{actor} เปิดตรงเวลาเหมือนทุกวัน',
			'routine.missed': '{actor} เปิดสายวันนี้',
			'cycle.complete': '{device} ล้างเสร็จแล้ว · {duration_min} นาที',
			'threshold.crossed': '{zone} ลูกค้าเริ่มแน่น',
		},
	},
};
