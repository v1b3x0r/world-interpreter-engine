<script lang="ts">
	import { render } from '$lib/composables/engine';
	import { eventPreset, interpreters } from '$lib/composables/preset';
	import { Button } from '@/lib/components/ui/button';

	let eventsText = $state(eventPreset);
	let interpreterText = $state(interpreters.home);

	function safeParse(str: string) {
		try {
			return JSON.parse(str);
		} catch {
			return null;
		}
	}

	let parsedEvents = $derived(safeParse(eventsText));
	let parsedInterpreter = $derived(safeParse(interpreterText));

	let output = $derived(
		parsedEvents && parsedInterpreter ? render(parsedEvents, parsedInterpreter) : []
	);

	function loadPreset(name: keyof typeof interpreters) {
		interpreterText = interpreters[name];
	}
</script>

<div class="space-y-4 p-4">
	<!-- 🔘 Preset Buttons -->
	<div class="flex gap-2">
		<Button onclick={() => loadPreset('home')}>🏠 Home</Button>
		<Button onclick={() => loadPreset('rover')}>🛰 Rover</Button>
		<Button onclick={() => loadPreset('cyberpunk')}>⚡ Cyberpunk</Button>
	</div>

	<!-- 🧬 3 Columns -->
	<div class="grid h-[80vh] grid-cols-3 gap-4">
		<!-- Events -->
		<div class="flex flex-col">
			<div class="mb-2 text-sm opacity-60">Events</div>
			<textarea
				class="flex-1 rounded bg-black p-3 font-mono text-xs text-white"
				bind:value={eventsText}
			></textarea>
		</div>

		<!-- Interpreter -->
		<div class="flex flex-col">
			<div class="mb-2 text-sm opacity-60">Interpreter</div>
			<textarea
				class="flex-1 rounded bg-black p-3 font-mono text-xs text-white"
				bind:value={interpreterText}
			></textarea>
		</div>

		<!-- Output -->
		<div class="flex flex-col">
			<div class="mb-2 text-sm opacity-60">Output</div>

			<div class="flex-1 space-y-2 overflow-auto rounded bg-neutral-900 p-3">
				{#if output.length}
					{#each output as line (line)}
						<div class="rounded bg-neutral-800 p-2 text-sm">
							{line}
						</div>
					{/each}
				{:else}
					<div class="text-sm opacity-40">Invalid JSON...</div>
				{/if}
			</div>
		</div>
	</div>
</div>
