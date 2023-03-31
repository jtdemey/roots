import type { Writable } from "svelte/store";

export interface Enemy {
  attack: Writable<number>;
  defense: Writable<number>;
  evasion: Writable<number>;
  entityId: string;
  health: Writable<number>;
  maxHealth: Writable<number>;
  name: string;
  speed: Writable<number>;
}
