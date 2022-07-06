import { GameStates } from "$lib/data/game/GameStates";
import { goto } from "$app/navigation";

export const navToCorrectGameState = (
  gameState: GameStates,
  desiredState: GameStates
): void => {
  if (gameState !== desiredState) {
    if (gameState === GameStates.MainMenu) goto("/mainmenu");
    if (gameState === GameStates.Combat) goto("/game/combat/fight");
  }
};
