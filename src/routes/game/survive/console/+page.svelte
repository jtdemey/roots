<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { quartOut } from "svelte/easing";
  import { tweened } from "svelte/motion";
  import { fly } from "svelte/transition";
  import { consoleText, paused } from "$lib/stores/game/GameStore";
  import { consoleHeight } from "$lib/stores/ui/UIStore";
  import ConsoleLine from "$lib/components/survive/console/ConsoleLine.svelte";
  import CommandLine from "$lib/components/survive/console/CommandLine.svelte";

  let consoleOutput: any = undefined;
  let consolePane: any = undefined;

  const paneYPos = tweened(800, {
    duration: 400,
    easing: quartOut
  });

  const updatePaneYPos = (): void => {
    setTimeout(() => {
      if (!consoleOutput || !consolePane) return;
      const outputHeight = consoleOutput.clientHeight;
      const ypos =
        consolePane.clientHeight > $consoleHeight
          ? $consoleHeight - outputHeight
          : consolePane.clientHeight - outputHeight;
      $paneYPos = ypos;
    }, 50);
  };

  const unsub = consoleText.subscribe(() => updatePaneYPos());

  onMount(() => {
    updatePaneYPos();
    if ($paused) {
      $paused = false;
    }
  });

  onDestroy(unsub);
</script>

<section
  in:fly={{
    duration: 160,
    y: 8
  }}
  style="max-height: {$consoleHeight}px"
>
  <div bind:this={consolePane} style="top: {$paneYPos}px">
    <article bind:this={consoleOutput}>
      {#each $consoleText as line}
        <ConsoleLine text={line} />
      {/each}
    </article>
  </div>
  <CommandLine />
</section>

<style>
  section {
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  section > div {
    position: relative;
    top: 75%;
    left: 0;
    width: 100%;
    min-height: 100%;
    scroll-behavior: smooth;
  }

  section > div::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 0.2rem;
    background-color: transparent;
  }

  section > div::-webkit-scrollbar {
    width: 12px;
    background-color: rgba(1, 1, 1, 0.1);
  }

  section > div::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: rgba(60, 60, 60, 0.5);
    border: 1px solid rgba(80, 80, 80, 0.6);
  }

  article {
    display: flex;
    flex-flow: column;
    width: 100%;
    justify-content: left;
    text-align: left;
    padding-bottom: 2rem;
    color: #f5f5f5;
  }
</style>
