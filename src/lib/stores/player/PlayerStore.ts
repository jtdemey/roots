import { writable } from "svelte/store";
import type { Item } from "../../../models/Item";
import { createItem } from "$lib/data/world/WorldFactory";

export const energy = writable<number>(100);
export const health = writable<number>(100);
export const items = writable<Item[]>([ createItem("handwarmers", 2) ]);
export const locale = writable<string>("car");
export const lastLocale = writable<string>(undefined);
export const maxHealth = writable<number>(100);
export const sanity = writable<number>(100);
export const temperature = writable<number>(100);