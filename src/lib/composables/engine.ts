import type { WorldEvent, Interpreter, RenderedEvent } from './scenarios/types';

export function render(events: WorldEvent[], interpreter: Interpreter): RenderedEvent[] {
	return events.map((e) => {
		const template = interpreter.map?.[e.type];
		const duration = e.duration_min;
		const text = template
			? template
					.replace('{actor}', e.actor ?? '')
					.replace('{device}', e.device ?? '')
					.replace('{zone}', e.zone ?? '')
					.replace('{duration_min}', String(duration ?? ''))
			: `[no template for ${e.type}]`;

		return {
			text,
			type: e.type,
			timestamp: e.timestamp,
			severity: e.severity ?? 'normal',
		};
	});
}
