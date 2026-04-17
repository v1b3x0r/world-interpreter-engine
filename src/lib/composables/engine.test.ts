import { describe, it, expect } from 'vitest';
import { render } from './engine';
import { getScenarios } from './scenarios';

describe('render engine', () => {
	it('renders home scenario EN correctly', () => {
		const home = getScenarios('en').home;
		const output = render(home.events, home.interpreter);
		expect(output).toHaveLength(8);
		expect(output[0].text).toBe('Kettle switched on');
		expect(output[0].type).toBe('session.start');
		expect(output[0].timestamp).toBe('06:32');
	});

	it('renders home scenario TH correctly', () => {
		const home = getScenarios('th').home;
		const output = render(home.events, home.interpreter);
		expect(output).toHaveLength(8);
		expect(output[0].text).toBe('กาต้มน้ำ เริ่มทำงาน');
	});

	it('renders car scenario EN with passenger domain', () => {
		const car = getScenarios('en').car;
		const output = render(car.events, car.interpreter);
		expect(output[0].text).toContain('Passenger');
	});

	it('renders humanoid scenario EN with operator domain', () => {
		const humanoid = getScenarios('en').humanoid;
		const output = render(humanoid.events, humanoid.interpreter);
		expect(output[0].text).toContain('Operator');
	});

	it('returns fallback text for missing template', () => {
		const output = render(
			[{ type: 'unknown.type', timestamp: '00:00' }],
			{ name: 'test', tone: 'warm', map: {} }
		);
		expect(output[0].text).toBe('[no template for unknown.type]');
	});
});
