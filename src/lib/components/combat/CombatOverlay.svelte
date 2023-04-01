<script lang="ts">
  import { onDestroy } from "svelte";
  import { quartInOut } from "svelte/easing";
  import { tweened, type Tweened } from "svelte/motion";
  import { health, maxHealth } from "$lib/stores/player/PlayerStore";

  const RED: string = `hsl(0, 68%, 25%)`;
  const TRANSPARENT: string = "rgba(0, 0, 0, 0.0)";

  const injuryTween: Tweened<number> = tweened(100, {
    duration: 300,
    easing: quartInOut
  });

  let showInjury: boolean = false;
  let unsubHp: Function = () => {};

  unsubHp = health.subscribe((hp: number) => {
    if (hp < 91) {
      showInjury = true;
      const pct: number = (hp / $maxHealth) * 100 + 20;
      injuryTween
        .set(pct - 10)
        .then(() => injuryTween.set(pct, { duration: 2000 }));
    } else {
      showInjury = false;
    }
  });

  onDestroy(() => unsubHp());
</script>

<div
  style="background:
  {showInjury &&
    `radial-gradient(ellipse at center, ${TRANSPARENT} ${$injuryTween}%, ${RED})`}"
>
  <slot />
</div>

<style>
  div {
    position: fixed;
    top: 0;
    left: 0;
    display: grid;
    grid-template-rows: calc(40px + 1rem) 5fr 4fr 2rem;
    width: 100%;
    height: 100%;
  }
</style>
