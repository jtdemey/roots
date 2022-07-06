<script type="ts">
  import { GameColors } from "$lib/data/ui/GameColors";
  import { shiftLightness } from "$lib/utils/ColorUtils";

  export let backgroundColor: string = "#333";
  export let label: string = "HP";
  export let text: string = "100";
  export let width: number = 100;

  let fillStyle: string;

  $: fillStyle = `width: ${width}%; background-color: ${backgroundColor};
    border-right: 1px solid ${shiftLightness(backgroundColor, 50)}`;

    console.log(shiftLightness(backgroundColor, 40))
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
    border-radius: 2px;
  }
</style>
