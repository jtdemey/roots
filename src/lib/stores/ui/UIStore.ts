import { writable } from "svelte/store";

export const consoleHeight = writable<number>(600);
export const isConsoleHeightSet = writable<boolean>(false);