<script type="ts">
  import type {
    CombatKeyframe,
    CombatAnimation
  } from "../../../models/ui/CombatAnimation";
  import { linear } from "svelte/easing";
  import { tweened, type Tweened } from "svelte/motion";
  import { fly } from "svelte/transition";
  import { getCombatAnimationData } from "$lib/utils/selectors/CombatAnimationSelectors";
  import { executePromisesSequentially } from "$lib/utils/GameEventUtils";

  export let alt: string = "A placeholder image";
  export let animationName: string = "";
  export let endAnimationCallback: Function = () => false;
  export let flyConfig: object = { duration: 0, x: 0 };
  export let imgSrc: string = "/placeholder.webp";
  export let width: number = 128;

  const spriteXPos: Tweened<number> = tweened(0, { duration: 500, easing: linear });

  $: if (animationName !== "") {
    const animationData: CombatAnimation =
      getCombatAnimationData(animationName);
    executePromisesSequentially(
      animationData.keyframes
        .map((keyframe: CombatKeyframe) => {
          return () => spriteXPos.set(keyframe.value, keyframe.tweenConfig);
        })
        .concat([
          () =>
            new Promise((resolve: Function, reject: Function) => {
              try {
                endAnimationCallback();
                resolve();
              } catch (e) {
                reject(e);
              }
            })
        ])
    );
  }
</script>

<picture in:fly={flyConfig}>
  <img
    {alt}
    src={imgSrc}
    {width}
    style="transform: translateX({$spriteXPos}px);"
  />
</picture>

<style>
  picture {
    margin: auto;
  }

  img {
    margin: 0.25rem;
  }
</style>
