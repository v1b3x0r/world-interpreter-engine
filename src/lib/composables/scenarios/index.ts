import type { Scenario } from './types';
import { home } from './home';
import { cafe } from './cafe';
import { factory } from './factory';
import { farm } from './farm';
import { space } from './space';
import { hospital } from './hospital';

export const scenarios: Record<string, Scenario> = { home, cafe, factory, farm, hospital, space };
export const scenarioList: Scenario[] = [home, cafe, factory, farm, hospital, space];
