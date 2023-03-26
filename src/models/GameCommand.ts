import type { PlayerFlags } from "$lib/data/player/PlayerFlags";

export interface GameCommand {
  name: string;
  action: Function;
  aliases: string[];
  cancels?: string[];
  disabledForFlags?: PlayerFlags[];
}
