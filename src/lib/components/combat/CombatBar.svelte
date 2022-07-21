<script type="ts">
  import { tweened, type Tweened } from "svelte/motion";
  import { cubicOut, linear } from "svelte/easing";
  import { GameColors } from "$lib/data/ui/GameColors";
  import { shiftLightness } from "$lib/utils/ColorUtils";

  export let backgroundColor: string = "#333";
  export let isReplenishing: boolean = false;
  export let label: string = "HP";
  export let text: string = "100";
  export let width: number = 100;

  let fillStyle: string;

  const barWidth: Tweened<number> = tweened(100, {
    duration: 420,
    easing: isReplenishing === true ? linear : cubicOut
  });

  $: {
    if (isReplenishing === true && width < 100) {
      barWidth.set(0, { duration: 1 });
      setTimeout(() => {
        barWidth.set(100, { duration: (width - 1) * 500 - 5 });
      }, 5);
    } else {
      barWidth.set(width);
    }
  }

  $: fillStyle = `width: ${$barWidth}%; background-color: ${backgroundColor};
    border-right: 1px solid ${shiftLightness(backgroundColor, 50)}`;
</script>

<section>
  <h6>{label}</h6>
  <div>
    <div id="bar" style="background-color: {GameColors.grayscales.green[0]}">
      <div id="fill" style={fillStyle}>
        <span>{text}</span>
      </div>
    </div>
  </div>
</section>

<style>
  section {
    display: grid;
    grid-template-columns: 1fr 4fr;
    padding: 0.25rem 1rem;
    font-family: "DM Sans", sans-serif;
  }

  h6 {
    color: #111;
    line-height: 19px;
  }

  span {
    padding-left: 0.2rem;
  }

  #bar {
    height: 19px;
    line-height: 19px;
  }

  #fill {
    height: 100%;
    animation: all .2s;
    border-radius: 2px;
  }
</style>
