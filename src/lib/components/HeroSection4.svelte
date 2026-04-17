<script lang="ts">
	import { goToEditor } from '$lib/composables/stores.svelte';
	import { m } from '$lib/paraglide/messages.js';
</script>

<section
	class="relative flex min-h-screen flex-col items-center justify-center px-6"
	style="background: var(--wl-bg);"
>
	<h2 class="mb-3 text-center text-2xl font-bold text-(--wl-text) md:text-3xl">
		{m.hero_final_title()}
	</h2>
	<p class="mb-10 max-w-md text-center text-sm text-(--wl-text-muted)" style="opacity: 0.7;">
		{m.hero_final_subtitle()}
	</p>

	<div class="flex gap-3">
		<button
			class="cursor-pointer rounded-xl px-7 py-3 font-semibold text-white transition-opacity hover:opacity-80"
			style="background: var(--wl-accent);"
			onclick={() => goToEditor('home')}
		>
			{m.hero_final_cta_editor()}
		</button>
		<a
			href="https://github.com/v1b3x0r/world-interpreter-engine"
			target="_blank"
			rel="noopener noreferrer"
			class="rounded-xl border px-7 py-3 font-semibold transition-opacity hover:opacity-80"
			style="border-color: var(--wl-border-accent); color: var(--wl-accent);"
		>
			{m.hero_final_cta_star()}
		</a>
	</div>

	<!-- Footer -->
	<footer class="absolute bottom-0 left-0 right-0 flex flex-col items-center gap-3 px-6 py-6" style="opacity: 0.5;">
		<div class="flex items-center gap-5 text-[11px] text-(--wl-text-muted)">
			<a
				href="https://github.com/v1b3x0r/world-interpreter-engine"
				target="_blank"
				rel="noopener noreferrer"
				class="flex items-center gap-1.5 transition-opacity hover:opacity-100"
			>
				<svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
					<path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
				</svg>
				<span>{m.footer_engine()}</span>
			</a>
			<span style="opacity: 0.2;">·</span>
			<a
				href="https://viibe.to/homelog"
				target="_blank"
				rel="noopener noreferrer"
				class="flex items-center gap-1.5 transition-opacity hover:opacity-100"
				style="color: var(--wl-accent); opacity: 0.7;"
			>
				<span>{m.footer_live_demo()}</span>
			</a>
			<span style="opacity: 0.2;">·</span>
			<a
				href="https://x.com/v1b3x0r"
				target="_blank"
				rel="noopener noreferrer"
				class="flex items-center gap-1.5 transition-opacity hover:opacity-100"
			>
				<svg class="h-3 w-3" viewBox="0 0 24 24" fill="currentColor">
					<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
				</svg>
				<span>@v1b3x0r</span>
			</a>
		</div>
		<div class="text-[10px] text-(--wl-text-muted)" style="opacity: 0.4;">
			{m.footer_license()}
		</div>
	</footer>
</section>
