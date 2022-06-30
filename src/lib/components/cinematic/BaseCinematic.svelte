<script type="ts">
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import { GameStates } from "$lib/data/game/GameStates";
  import { GameStateRoutes } from "$lib/data/game/GameStateRoutes";
  import { gameState } from "$lib/stores/game/GameStore";

  onMount(() => {
    if ($gameState !== GameStates.Cinematic) {
      const route: string = GameStateRoutes[$gameState];
      goto(route || "/mainmenu");
    }
  });
</script>

<div>
  <slot />
</div>

<style>
  div {
    width: 100%;
    height: 100%;
  }
</style>
