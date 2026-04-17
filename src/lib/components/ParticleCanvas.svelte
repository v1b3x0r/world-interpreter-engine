<script lang="ts">
	import { onMount } from 'svelte';

	let canvas: HTMLCanvasElement;

	const prefersReducedMotion =
		typeof window !== 'undefined'
			? window.matchMedia('(prefers-reduced-motion: reduce)').matches
			: false;

	onMount(() => {
		if (prefersReducedMotion) return;

		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		let animationId: number;
		const particles: { x: number; y: number; vx: number; vy: number; size: number }[] = [];
		const PARTICLE_COUNT = 40;

		function resize() {
			canvas.width = canvas.offsetWidth;
			canvas.height = canvas.offsetHeight;
		}

		function init() {
			resize();
			particles.length = 0;
			for (let i = 0; i < PARTICLE_COUNT; i++) {
				particles.push({
					x: Math.random() * canvas.width,
					y: Math.random() * canvas.height,
					vx: (Math.random() - 0.5) * 0.3,
					vy: (Math.random() - 0.5) * 0.3,
					size: Math.random() * 1.5 + 0.5,
				});
			}
		}

		function draw() {
			ctx!.clearRect(0, 0, canvas.width, canvas.height);
			for (const p of particles) {
				p.x += p.vx;
				p.y += p.vy;
				if (p.x < 0) p.x = canvas.width;
				if (p.x > canvas.width) p.x = 0;
				if (p.y < 0) p.y = canvas.height;
				if (p.y > canvas.height) p.y = 0;

				ctx!.beginPath();
				ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2);
				ctx!.fillStyle = 'rgba(34, 197, 94, 0.15)';
				ctx!.fill();
			}
			animationId = requestAnimationFrame(draw);
		}

		init();
		draw();

		const resizeObserver = new ResizeObserver(resize);
		resizeObserver.observe(canvas);

		return () => {
			cancelAnimationFrame(animationId);
			resizeObserver.disconnect();
		};
	});
</script>

<canvas
	bind:this={canvas}
	class="pointer-events-none absolute inset-0 h-full w-full"
	aria-hidden="true"
></canvas>
