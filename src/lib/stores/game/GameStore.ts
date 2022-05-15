import type { GameEvent } from "../../../models/GameEvent";
import { GameStates } from "../../../data/game/GameStates";
import { get, writable } from "svelte/store";

export const gameEvents = writable<GameEvent[]>([]);
export const gameState = writable<GameStates>(GameStates.MainMenu);
export const paused = writable<boolean>(true);
export const tick = writable<number>(0);