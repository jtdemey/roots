import { goto } from "$app/navigation";
import { GameStates } from "$lib/data/game/GameStates";

export const navToCorrectGameState = (
  gameState: GameStates,
  desiredState: GameStates
): void => {
  if (gameState !== desiredState) {
    if (gameState === GameStates.MainMenu) goto("/mainmenu");
    if (gameState === GameStates.Combat) goto("/game/combat/fight");
  }
};
