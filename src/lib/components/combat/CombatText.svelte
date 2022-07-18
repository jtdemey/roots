<script type="ts">
  import { onDestroy, onMount } from "svelte";
  import { quartOut } from "svelte/easing";
  import { tweened } from "svelte/motion";
  import { combatText } from "$lib/stores/combat/CombatStore";
  import { combatConsoleHeight, isCombatConsoleHeightSet } from "$lib/stores/ui/UIStore";
  import ConsoleLine from "../survive/console/ConsoleLine.svelte";

  let combatConsoleContainer: any = undefined;
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
        consolePane.clientHeight > $combatConsoleHeight
          ? $combatConsoleHeight - outputHeight
          : consolePane.clientHeight - outputHeight;
      $paneYPos = ypos;
    }, 50);
  };

  const getLineOpacity = (lineIndex: number, totalLines: number): number => lineIndex > 8 || totalLines < 9 ? 1.0 : (lineIndex * 0.2);

  const unsub = combatText.subscribe(() => updatePaneYPos());

  onMount(() => {
    if (combatConsoleContainer) {
      if ($isCombatConsoleHeightSet === false) {
        $combatConsoleHeight = combatConsoleContainer.clientHeight;
        $isCombatConsoleHeightSet = true;
      }
    }
  });

  onDestroy(unsub);
</script>

<section bind:this={combatConsoleContainer} style="max-height: {$combatConsoleHeight}px;">
  <div bind:this={consolePane} style="top: {$paneYPos}px;">
    <article bind:this={consoleOutput}>
      {#each $combatText as text, i}
        <ConsoleLine opacity={getLineOpacity(i, $combatText.length)} {text} />
      {/each}
    </article>
  </div>
</section>

<style>
  section {
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    color: hsl(42, 22%, 20%);
  }

  section > div {
    position: relative;
    top: 75%;
    left: 0;
    width: 100%;
    min-height: 100%;
    scroll-behavior: smooth;
  }

  article {
    display: flex;
    flex-flow: column;
    width: 100%;
    justify-content: left;
    text-align: left;
  }
</style>
