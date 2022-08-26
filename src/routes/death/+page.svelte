<script type="ts">
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import { GameStates } from "$lib/data/game/GameStates";
  import { gameState, tick } from "$lib/stores/game/GameStore";
  import { formatTime, getTimeFromTick } from "$lib/utils/DateUtils";

  onMount(() => {
    if ($gameState !== GameStates.Death) {
      goto("/mainmenu");
    }
  });
</script>

<article>
  <h1>You perished at {formatTime(getTimeFromTick($tick))}.</h1>
  <h2>Your flesh feeds the forest as its roots grow deeper still.</h2>
  <section>
    <span on:click={() => window.location.reload()}>Main Menu</span>
  </section>
</article>

<style>
  article {
    width: 100%;
    font-family: "DM Serif Display", serif;
  }

  h1 {
    margin: 0;
    padding: 3rem 3rem 0;
    color: #f5f5f5;
    font-size: 2.5rem;
    opacity: 1;
  }

  h2 {
    margin: 0;
    padding: 3rem 3rem 6rem;
    font-size: 1rem;
  }

  section {
    display: flex;
    justify-content: right;
    text-align: right;
  }

  span {
    padding: 0.5rem 3rem;
    opacity: 1;
    color: #7d0013;
    cursor: pointer;
    font-family: "DM Sans", sans-serif;
    font-size: 1.5rem;
    text-shadow: 2px 2px 4px hsl(48, 38%, 3%);
  }
</style>
