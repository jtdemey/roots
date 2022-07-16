<script type="ts">
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";
	import { PlayerEnergyStates } from "$lib/data/player/PlayerEnergyStates";
  import { PlayerHealthStates } from "$lib/data/player/PlayerHealthStates";
	import { PlayerSanityStates } from "$lib/data/player/PlayerSanityStates";
  import { removeExcessLines } from "$lib/stores/game/GameStore";
	import { energy, health, maxHealth, sanity } from "$lib/stores/player/PlayerStore";
  import PlayerStatusPhrase from "$lib/components/survive/info/PlayerStatusPhrase.svelte";
	import TemperatureInfo from "$lib/components/survive/info/TemperatureInfo.svelte";

  onMount(() => removeExcessLines(100));
</script>

<section
  in:fly={{
    duration: 160,
    y: 8
  }}
>
  <article>
    <PlayerStatusPhrase
			abbreviation="HP"
			maximumValue={$maxHealth}
      statuses={PlayerHealthStates}
      text="You are"
      value={$health}
    />
    <PlayerStatusPhrase
			abbreviation="SP"
			maximumValue={100}
      statuses={PlayerSanityStates}
      text="Your mind feels"
      value={$sanity}
    />
    <PlayerStatusPhrase
			abbreviation="EP"
			maximumValue={$maxHealth}
      statuses={PlayerEnergyStates}
      text="You feel"
      value={$energy}
    />
		<TemperatureInfo />
  </article>
</section>

<style>
  section {
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  article {
    padding: 1rem;
  }
</style>
