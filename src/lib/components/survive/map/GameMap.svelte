<script type="ts">
  import type { MapLocale } from "../../../../models/ui/MapLocale";
  import { onMount } from "svelte";
  import GameMapSvg from "./GameMapSvg.svelte";

  let locales: MapLocale[] = [];
  let mapLoaded: boolean = false;

  onMount(() => {
    if (mapLoaded === true) return;
    fetch("/map/map.svg")
      .then((res: Response) => res.text())
      .then((svg: string) => {
        const parser: DOMParser = new DOMParser();
        const paths: HTMLCollection = parser
          .parseFromString(svg, "text/xml")
          .getElementsByTagName("path");
        locales = Array.from(paths).map((path: any) => ({
          element: path,
          name: path.getAttribute("inkscape:label"),
          path: path.getAttribute("d")
        }));
        console.log(locales);
        mapLoaded = true;
      })
      .catch((e: any) => console.error(e));
  });
</script>

<div>
  <GameMapSvg {locales} />
</div>

<style>
  div {
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: scroll;
  }
</style>
