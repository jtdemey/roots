<script type="ts">
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import { GameStates } from "$lib/data/game/GameStates";
  import { GameStateRoutes } from "$lib/data/game/GameStateRoutes";
  import { gameState } from "$lib/stores/game/GameStore";
  import { GameColors } from "$lib/data/ui/GameColors";

  onMount(() => {
    if ($gameState !== GameStates.Cinematic) {
      const route: string = GameStateRoutes[$gameState];
      window.location.replace("/mainmenu");
      //goto(route || "/mainmenu");
    }
  });
</script>

<div style="background-color: {GameColors.grayscales.green[0]}">
  <slot />
</div>

<style>
  div {
    width: 100%;
    height: 100%;
  }
</style>
