<script lang="ts">
  import { onMount } from "svelte";
  import { GameStates } from "$lib/data/game/GameStates";
  import {
    environmentTemperature,
    executeGameEvents,
    gameEvents,
    gameState,
    paused,
    temperatureFlux,
    temperatureTick,
    tick
  } from "$lib/stores/game/GameStore";
  import { locale, temperature } from "$lib/stores/player/PlayerStore";
  import { navToCorrectGameState } from "$lib/utils/NavUtils";

  onMount(() => {
    navToCorrectGameState($gameState, GameStates.Explore);
    const clock = setInterval(() => {
      if ($paused) return;
      $tick += 1;
      if ($tick % 16 === 0) {
        temperatureTick(
          $temperatureFlux,
          $environmentTemperature,
          $locale,
          $temperature
        );
      }
      if ($gameEvents.length < 1) return;
      executeGameEvents($gameEvents, $tick);
    }, 500);
    return () => clearInterval(clock);
  });
</script>

<div>
  <slot />
</div>

<style>
  div {
    width: 100%;
    height: 100%;
    font-family: "DM Serif Display", serif;
  }
</style>
