import type { GameEvent } from "../../../models/GameEvent";
import { writable, type Writable } from "svelte/store";
import type { Locale } from "../../../models/Locale";
import { World } from "$lib/data/world/World";
import type { Container } from "../../../models/Container";

export const gameWorld = writable<Locale[]>(World);

const getLocale = (currentWorld: Locale[], localeName: string): Locale => {
	const matchedLocales = currentWorld.filter((locale: Locale) => locale.name === localeName);
	if (matchedLocales.length < 1) {
		console.error(`getLocale: no locale ${localeName}`);
		return currentWorld[0];
	}
	return matchedLocales[0];
};

export const openContainer = (localeName: string, entityId: string) => {
	gameWorld.update((world: Locale[]) => world.map((locale: Locale) => {
		if (locale.name !== localeName) return locale;
		const matchedContainers: Container[] = locale.containers.filter((container: Container) => container.entityId === entityId);
		if (matchedContainers.length < 1) {
			console.error(`openContainer: No container ${entityId} in ${localeName}`);
			return locale;
		}
		return {
			...locale
		};
	}))
};