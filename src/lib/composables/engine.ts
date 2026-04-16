// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function render(events: any[], interpreter: any) {
	return events
		.map((e) => {
			const template = interpreter?.map?.[e.type];
			if (!template) return null;

			const duration = e.duration_sec ? Math.round(e.duration_sec / 60) : e.duration_min;

			return template
				.replace('{actor}', e.actor || '')
				.replace('{device}', e.device || '')
				.replace('{zone}', e.zone || '')
				.replace('{duration_min}', duration || '');
		})
		.filter(Boolean);
}
