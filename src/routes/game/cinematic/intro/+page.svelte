<script type="ts">
  import { onMount } from "svelte";
  import { tweened } from "svelte/motion";
  import { fade, fly } from "svelte/transition";
  import {
    gameState,
    tick,
    registerGameEvents,
    appendLine
  } from "$lib/stores/game/GameStore";
  import { GameEventFlags } from "$lib/data/game/GameEventFlags";
  import { GameStates } from "$lib/data/game/GameStates";
  import { genGameEvent } from "$lib/utils/GameEventUtils";
  import BaseCinematic from "$lib/components/cinematic/BaseCinematic.svelte";

  let skipBtnRef: any;

  const timers: any[] = [];

  const addTimer = (delay: number, action: Function): number =>
    timers.push(setTimeout(action, delay));

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
    const genIntroEvent = (currentTick: number, action: Function) =>
      genGameEvent(currentTick, action, undefined, [GameEventFlags.Exit]);
    registerGameEvents([
      genIntroEvent($tick, () => appendLine("The engine stalls.")),
      genIntroEvent($tick + 4, () => appendLine("The airbag hisses as it deflates in front of you.")),
      genIntroEvent(
        $tick + 10,
        () => appendLine(`The hood of your car looks crumpled. Smoke rises from its edges.`)
      )
    ]);
    $gameState = GameStates.Explore;
    skipBtnRef.click();
  };

  onMount(() => {
    addTimer(3000, () => {
      $skipBtnOpacity = 0;
    });
    addTimer(5000, () => {
      $cinematicOpacity = 0;
    });
    addTimer(7000, () => endCinematic());
    return () => timers.forEach((timer: any) => clearInterval(timer));
  });
</script>

<BaseCinematic>
  <article style="opacity: {$cinematicOpacity};" on:click={() => endCinematic()}>
    <h4 in:fly={getFlyParams(200)}>A dirt backroad.</h4>
    <h4 in:fly={getFlyParams(1200)}>Caledonia County, Vermont.</h4>
    <h4 in:fly={getFlyParams(2400)}>December 13th, 1987. 9:44PM.</h4>
    <h6 in:fade={{ delay: 700 }} style="opacity: {$skipBtnOpacity}">
      Tap to skip cutscene
    </h6>
  </article>
  <a href="/game/survive/console"><div bind:this={skipBtnRef}></div></a>
</BaseCinematic>

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
</style>
