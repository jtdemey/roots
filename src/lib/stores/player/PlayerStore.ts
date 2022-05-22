import { get, writable } from "svelte/store";

export const energy = writable<number>(100);
export const health = writable<number>(100);
export const items = writable<number[]>([]);
export const locale = writable<string>("car");
export const lastLocale = writable<string>(undefined);
export const maxHealth = writable<number>(100);
export const sanity = writable<number>(100);
export const temperature = writable<number>(100);