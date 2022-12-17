<script type="ts">
  import { onMount } from "svelte";

  interface IMapLocale {
    element: Element;
    name: string;
  }

  let locales: IMapLocale[] = [];
  let mapLoaded: boolean = false;
  let svgContent: string = "";

  const createSvg = (svg: string) => {
    console.log(svg);
    const el: Element = document.createElement("svg");
    el.innerHTML = svg;
    console.log(el);
    return el;
  };

  onMount(() => {
    if (mapLoaded === true) return;
    fetch("/map/map.svg")
      .then((res: Response) => res.text())
      .then((svg: string) => {
        svgContent = svg.split("\n").slice(3).join("").replace("\t", " ");
        const parser: DOMParser = new DOMParser();
        const paths: HTMLCollection = parser
          .parseFromString(svg, "text/xml")
          .getElementsByTagName("path");
        locales = Array.from(paths).map((path: any) => ({
          element: path,
          name: path.nextElementSibling?.getAttribute("inkscape:label")
        }));
        console.log(locales);
        mapLoaded = true;
      })
      .catch((e: any) => console.error(e));
  });
</script>

<div>
  {#if mapLoaded === true}
    {createSvg(svgContent)}
  {/if}
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
