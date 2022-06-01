import type { Container } from "../../../models/Container";
import type { Locale } from "../../../models/Locale";
import type { Writable } from "svelte/store";
import { GameWorld } from "$lib/stores/world/WorldStore";

export const getContainers = (localeName: string): Writable<Container[]> =>
	getLocale(localeName).containers;

export const getLocale = (localeName: string): Locale => {
	const matchedLocales = GameWorld.filter((locale: Locale) => locale.name === localeName);
	if (matchedLocales.length < 1) {
		console.error(`getLocale: no locale ${localeName}`);
		return GameWorld[0];
	}
	return matchedLocales[0];
};