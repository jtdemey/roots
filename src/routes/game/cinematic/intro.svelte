<script type="ts">
  import { tweened } from "svelte/motion";
  import { fade, fly } from "svelte/transition";
  import { gameState } from "$lib/stores/game/GameStore";
  import { GameStates } from "../../../data/game/GameStates";
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";

  let endTimer: any, fadeOutTimer: any, skipPromptTimer: any;

  const getFlyParams = (delay: number): object => ({
    delay,
    duration: 2000,
    y: 10
  });

  const cinematicOpacity = tweened(1, {
    duration: 1500
  });

  const skipBtnOpacity = tweened(1, {
    duration: 800 
  });

  const endCinematic = () => {
    $gameState = GameStates.Explore;
    goto("/game/survive/console");
  };

  onMount(() => {
    skipPromptTimer = setTimeout(() => {
      $skipBtnOpacity = 0;
    }, 3000);
    fadeOutTimer = setTimeout(() => {
      $cinematicOpacity = 0;
    }, 6000);
    endTimer = setTimeout(() => {
			goto("/game/survive/console");
    }, 8000);
    return () => {
      clearInterval(skipPromptTimer);
      clearInterval(fadeOutTimer);
      clearInterval(endTimer);
    };
  });
</script>

<article style="opacity: {$cinematicOpacity};" on:click={() => endCinematic()}>
  <h4 in:fly={getFlyParams(200)}>A dirt backroad.</h4>
  <h4 in:fly={getFlyParams(1200)}>Caledonia County, Vermont.</h4>
  <h4 in:fly={getFlyParams(2400)}>December 13th, 1987. 9:44PM.</h4>
  <h6 in:fade={{ delay: 700 }} style="opacity: {$skipBtnOpacity}">
    Tap to skip cutscene
  </h6>
</article>

<style>
  article {
    height: 100%;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-content: center;
    align-items: center;
    font-size: 1.25rem;
    line-height: 3rem;
    text-align: center;
  }

  h6 {
    position: absolute;
    bottom: 2rem;
    font-family: "DM Sans", sans-serif;
  }

  .hidden {
    display: none;
  }
</style>