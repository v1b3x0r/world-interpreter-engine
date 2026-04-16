// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

declare module '$lib/paraglide/runtime' {
	export const baseLocale: string;
	export const locales: readonly string[];
	export const cookieName: string;
	export const cookieMaxAge: number;
	export const cookieDomain: string;
	export const localStorageKey: string;
	export const strategy: readonly string[];
	export const routeStrategies: readonly any[];
	export const urlPatterns: readonly any[];
	export function getStrategyForUrl(url: string | URL): readonly string[];
	export function isExcludedByRouteStrategy(url: string | URL): boolean;
	export function localizeHref(href: string, options?: { locale?: string }): string;
	export function deLocalizeHref(href: string): string;
}

export {};
