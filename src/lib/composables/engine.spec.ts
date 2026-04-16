import { describe, it, expect } from 'vitest';
import { render } from './engine';
import type { WorldEvent, Interpreter } from './scenarios/types';

const makeInterpreter = (map: Record<string, string>): Interpreter => ({
	name: 'test',
	tone: 'warm',
	map,
});

describe('render', () => {
	it('renders events using interpreter templates', () => {
		const events: WorldEvent[] = [
			{ type: 'session.start', timestamp: '08:00', device: 'TV' },
		];
		const interp = makeInterpreter({ 'session.start': '{device} เริ่มทำงาน' });

		const result = render(events, interp);

		expect(result).toHaveLength(1);
		expect(result[0].text).toBe('TV เริ่มทำงาน');
		expect(result[0].type).toBe('session.start');
		expect(result[0].timestamp).toBe('08:00');
		expect(result[0].severity).toBe('normal');
	});

	it('replaces all variable placeholders', () => {
		const events: WorldEvent[] = [
			{
				type: 'session.end',
				timestamp: '09:00',
				device: 'Kettle',
				duration_min: 12,
			},
		];
		const interp = makeInterpreter({
			'session.end': '{device} ปิดแล้ว · {duration_min} นาที',
		});

		const result = render(events, interp);

		expect(result[0].text).toBe('Kettle ปิดแล้ว · 12 นาที');
	});

	it('preserves severity from event', () => {
		const events: WorldEvent[] = [
			{ type: 'anomaly', timestamp: '10:00', zone: 'kitchen', severity: 'warning' },
		];
		const interp = makeInterpreter({ anomaly: '⚠ {zone}' });

		const result = render(events, interp);

		expect(result[0].severity).toBe('warning');
	});

	it('shows fallback for missing template', () => {
		const events: WorldEvent[] = [
			{ type: 'unknown.type', timestamp: '11:00' },
		];
		const interp = makeInterpreter({});

		const result = render(events, interp);

		expect(result).toHaveLength(1);
		expect(result[0].text).toContain('unknown.type');
	});

	it('handles missing optional fields gracefully', () => {
		const events: WorldEvent[] = [
			{ type: 'presence.arrived', timestamp: '12:00' },
		];
		const interp = makeInterpreter({ 'presence.arrived': '{actor} arrived at {zone}' });

		const result = render(events, interp);

		expect(result[0].text).toBe(' arrived at ');
	});
});
