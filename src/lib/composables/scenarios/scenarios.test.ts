import { describe, it, expect } from 'vitest';
import { getScenarios, getScenarioList } from './index';
import { home } from './home';
import { cafe } from './cafe';
import { factory } from './factory';
import { farm } from './farm';
import { hospital } from './hospital';
import { space } from './space';
import { car } from './car';
import { humanoid } from './humanoid';

describe('home scenario', () => {
	it('exports en and th variants', () => {
		expect(home.en).toBeDefined();
		expect(home.th).toBeDefined();
	});

	it('has correct id and accent in both locales', () => {
		expect(home.en.id).toBe('home');
		expect(home.th.id).toBe('home');
		expect(home.en.accent).toBe('rgba(34,197,94,1)');
		expect(home.th.accent).toBe('rgba(34,197,94,1)');
	});

	it('does not include routine.hit in events', () => {
		const enTypes = home.en.events.map((e) => e.type);
		const thTypes = home.th.events.map((e) => e.type);
		expect(enTypes).not.toContain('routine.hit');
		expect(thTypes).not.toContain('routine.hit');
	});

	it('has 8 events per locale', () => {
		expect(home.en.events).toHaveLength(8);
		expect(home.th.events).toHaveLength(8);
	});

	it('uses warm interpreter tone in EN', () => {
		expect(home.en.interpreter.map['presence.arrived']).toContain('Welcome back');
	});
});

describe('cafe scenario', () => {
	it('exports en and th variants with correct accent', () => {
		expect(cafe.en.id).toBe('cafe');
		expect(cafe.th.id).toBe('cafe');
		expect(cafe.en.accent).toBe('rgba(217,169,99,1)');
	});
});

describe('factory scenario', () => {
	it('exports en and th variants with correct accent', () => {
		expect(factory.en.id).toBe('factory');
		expect(factory.th.id).toBe('factory');
		expect(factory.en.accent).toBe('rgba(148,163,184,1)');
	});
});

describe('farm scenario', () => {
	it('exports en and th variants with correct accent', () => {
		expect(farm.en.id).toBe('farm');
		expect(farm.th.id).toBe('farm');
		expect(farm.en.accent).toBe('rgba(132,204,22,1)');
	});
});

describe('hospital scenario', () => {
	it('exports en and th variants with correct accent', () => {
		expect(hospital.en.id).toBe('hospital');
		expect(hospital.th.id).toBe('hospital');
		expect(hospital.en.accent).toBe('rgba(59,130,246,1)');
	});
});

describe('space scenario', () => {
	it('exports en and th variants with correct accent', () => {
		expect(space.en.id).toBe('space');
		expect(space.th.id).toBe('space');
		expect(space.en.accent).toBe('rgba(168,85,247,1)');
	});
});

describe('car scenario', () => {
	it('exports en and th variants', () => {
		expect(car.en.id).toBe('car');
		expect(car.th.id).toBe('car');
	});

	it('has correct accent and tone', () => {
		expect(car.en.accent).toBe('rgba(251,191,36,1)');
		expect(car.en.interpreter.tone).toBe('mission');
	});

	it('uses autonomous car domain language', () => {
		expect(car.en.interpreter.map['presence.arrived']).toContain('Passenger');
	});
});

describe('humanoid scenario', () => {
	it('exports en and th variants', () => {
		expect(humanoid.en.id).toBe('humanoid');
		expect(humanoid.th.id).toBe('humanoid');
	});

	it('has correct accent and tone', () => {
		expect(humanoid.en.accent).toBe('rgba(244,114,182,1)');
		expect(humanoid.en.interpreter.tone).toBe('industrial');
	});
});

describe('scenario index', () => {
	it('getScenarios returns all 8 scenarios for en', () => {
		const s = getScenarios('en');
		expect(Object.keys(s)).toHaveLength(8);
		expect(s.home.name).toBe('Home');
		expect(s.car.name).toBe('Autonomous Car');
		expect(s.humanoid.name).toBe('Humanoid');
	});

	it('getScenarios returns all 8 scenarios for th', () => {
		const s = getScenarios('th');
		expect(Object.keys(s)).toHaveLength(8);
		expect(s.home.name).toBe('บ้าน');
	});

	it('getScenarioList returns ordered array of 8', () => {
		const list = getScenarioList('en');
		expect(list).toHaveLength(8);
		expect(list[0].id).toBe('home');
	});

	it('falls back to en for unknown locale', () => {
		const s = getScenarios('fr');
		expect(s.home.name).toBe('Home');
	});
});
