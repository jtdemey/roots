<script type="ts">
  import type { Locale } from "../../../../models/Locale";
  import { onMount } from "svelte";
  import { writable, type Writable } from "svelte/store";
  import { MapImages } from "$lib/data/world/MapImages";
  import { World } from "$lib/data/world/World";
  import { removeExcessLines } from "$lib/stores/game/GameStore";

  const mapSvgs: string[] = [];

  const mapLoaded: Writable<boolean> = writable(false);

  const createSvg = (svg: string) => {
    const el: Element = document.createElement("svg");
    el.innerHTML = svg;
    console.log(el)
    return el;
  };

  const getImgPath = (name: string): string => `/map/${name}.svg`;

  const mapImages: any[] = World.filter(
    (locale: Locale) => MapImages[locale.name] !== undefined
  ).map((locale: Locale) =>
    Object.assign(MapImages[locale.name], { name: locale.name })
  );

  onMount(() => {
    if ($mapLoaded === false) {
      mapImages.forEach((mapImage: any) => {
        fetch(getImgPath(mapImage.name))
          .then((res: Response) => res.text())
          .then((svgValue: string) => {
            console.log(svgValue.split("\n").slice(3).join(""));
            const svg: string = svgValue.split("\n").slice(3).join("");
            mapSvgs.push(svg);
          });
      });
      $mapLoaded = true;
    }
    removeExcessLines(100);
  });
</script>

<section>
  {#each mapSvgs as mapSvg}
    {createSvg(mapSvg)}
  {/each}
</section>

<style>
  section {
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
</style>
