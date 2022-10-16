<script type="ts">
  import { onMount } from "svelte";
  import { GameStates } from "$lib/data/game/GameStates";
  import { gameState } from "$lib/stores/game/GameStore";
  import { navToCorrectGameState } from "$lib/utils/NavUtils";
  import NavBar from "$lib/components/survive/nav/NavBar.svelte";
  import StatusBar from "$lib/components/survive/status/StatusBar.svelte";

  onMount(() => navToCorrectGameState($gameState, GameStates.Explore));
</script>

<div>
  <StatusBar />
  <slot />
  <NavBar />
</div>

<style>
  div {
    display: grid;
    grid-template-rows: 40px 1fr 66px;
    width: 100%;
    min-height: 100%;
  }
</style>
