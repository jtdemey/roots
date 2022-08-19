import { GameStates } from "$lib/data/game/GameStates";
import { error, redirect } from "@sveltejs/kit";

export const navToCorrectGameState = (
  gameState: GameStates,
  desiredState: GameStates
): void => {
  if (gameState !== desiredState) {
    if (gameState === GameStates.MainMenu) throw redirect(307, "/mainmenu");
    if (gameState === GameStates.Combat) throw redirect(307, "/game/combat/fight");
  }
};
