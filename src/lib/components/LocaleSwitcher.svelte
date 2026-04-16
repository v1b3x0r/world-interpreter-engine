<script lang="ts">
	import { getLocale, setLocale, locales } from '$lib/paraglide/runtime';

	const labels: Record<string, string> = {
		en: 'EN',
		th: 'TH',
	};
</script>

<div class="flex items-center gap-1 rounded-lg border px-1 py-0.5 text-[11px]"
	style="border-color: var(--wl-border); background: rgba(255,255,255,0.03);"
>
	{#each locales as locale (locale)}
		<button
			class="cursor-pointer rounded px-2 py-0.5 transition-colors"
			class:text-[var(--wl-accent)]={getLocale() === locale}
			class:opacity-40={getLocale() !== locale}
			style={getLocale() === locale ? 'background: rgba(34,197,94,0.1);' : ''}
			onclick={() => setLocale(locale)}
		>
			{labels[locale] ?? locale}
		</button>
	{/each}
</div>
