<script lang="ts">
  import { tweened } from "svelte/motion";
  import { fly } from "svelte/transition";
  import { GameColors } from "$lib/data/ui/GameColors";
  import SvgIcon from "$lib/components/base/SvgIcon.svelte";

  export let animationStagger: number = 0;
  export let color: string = GameColors.grayscales.green[1];
  export let clickFunc: Function = () => false;
  export let text: string = "...";
  export let iconAlt: string = "An image";
  export let iconSrc: any = undefined;
  export let iconWidth: number = 16;

  const hasIcon: boolean = iconSrc !== undefined;
  const darkColor: string = GameColors.grayscales.green[0];
  const lightColor: string = color;

  const btnScale = tweened(1, {
    duration: 10
  });

  const handleClick = () => {
    btnScale.set(0.95).then(() =>
      btnScale.set(1, {
        duration: 100
      })
    );
    clickFunc();
  };
</script>

<li
  class={color}
  in:fly={{
    delay: animationStagger * 40,
    duration: 190,
    x: 8
  }}
  on:click={handleClick}
  style="background: linear-gradient(145deg, {lightColor}, {darkColor}); transform: scale({$btnScale});"
>
  {text}
  {#if hasIcon}
    <div>
      <SvgIcon alt={iconAlt} {iconSrc} width={iconWidth} />
    </div>
  {/if}
</li>

<style>
  li {
    display: flex;
    align-items: center;
    min-height: 1.2rem;
    margin-bottom: 0.15rem;
    padding: 0.6rem;
    background: linear-gradient(145deg, hsl(48, 4%, 20%), hsl(48, 38%, 3%));
    border-radius: 2px;
  }

  li > div {
    padding-left: 0.5rem;
  }

  .light-gray {
    background: linear-gradient(145deg, hsl(48, 2%, 42%), hsl(48, 38%, 3%));
  }
</style>
