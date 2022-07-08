import { writable } from "svelte/store";

export const combatConsoleHeight = writable<number>(400);
export const consoleHeight = writable<number>(600);
export const isCombatConsoleHeightSet = writable<boolean>(false);
export const isConsoleHeightSet = writable<boolean>(false);
