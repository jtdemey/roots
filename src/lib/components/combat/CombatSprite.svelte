<script lang="ts">
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
  export let width: number = 184;

  const tweenConfig = { duration: 500, easing: linear };
  const spritePos: Tweened<[number, number, number]> = tweened([0, 0, 1.0], tweenConfig);

  $: if (animationName !== "") {
    const animationData: CombatAnimation =
      getCombatAnimationData(animationName);
    executePromisesSequentially(
      animationData.keyframes
        .map((keyframe: CombatKeyframe) => {
          return () =>
            spritePos.set([keyframe.x, keyframe.y, keyframe.opacity], keyframe.tweenConfig);
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
    style="opacity: {$spritePos[2]}; transform: translate({$spritePos[0]}px, {$spritePos[1]}px);"
  />
</picture>

<style>
  picture {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }

  img {
    margin: auto;
  }
</style>
