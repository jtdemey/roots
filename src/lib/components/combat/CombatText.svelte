<script type="ts">
  import { combatText } from "$lib/stores/combat/CombatStore";
  import ConsoleLine from "../survive/console/ConsoleLine.svelte";
</script>

<section>
  {#each $combatText as text}
    <ConsoleLine {text} />
  {/each}
</section>

<style>
  section {
    width: 100%;
  }
</style>
