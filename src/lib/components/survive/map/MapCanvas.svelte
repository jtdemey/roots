<script type="ts">
  import type { Locale } from "../../../../models/Locale";
  import { onMount } from "svelte";
  import { MapImages } from "$lib/data/world/MapImages";
  import { World } from "$lib/data/world/World";
  import { loadedLocales } from "$lib/stores/ui/UIStore";

  let canvasPaths: any[] = [];
  let canvasRef: any;

  const mapImages: any[] = World.filter(
    (locale: Locale) => MapImages[locale.name] !== undefined
  ).map((locale: Locale) =>
    Object.assign(MapImages[locale.name], {
      innerContent: undefined,
      name: locale.name
    })
  );

  const getImgPath = (name: string): string => `/map/${name}.svg`;

  const extractSvgPath = (svgContent: string): string => {
    const start: number = svgContent.indexOf("<path");
    const pathStr: string = svgContent.substring(start);
    const dStr: string = pathStr.substring(pathStr.indexOf(`d=`));
    return dStr.split(`"`)[1];
  };

  onMount(() => {
    const context = canvasRef.getContext("2d");
    mapImages.forEach((mapImg: any) => {
      if (
        $loadedLocales.some((localeName: string) => localeName === mapImg.name)
      )
        return;
      fetch(getImgPath(mapImg.name))
        .then((res: Response) => res.text())
        .then((svgVal: string) => {
          const pathStr: string = extractSvgPath(svgVal);
          const path = new Path2D(pathStr);
          console.log(path);
          context.stroke(path);
          loadedLocales.update((localeNames: string[]) =>
            localeNames.concat([mapImg.name])
          );
        });
    });
  });
</script>

<canvas bind:this={canvasRef} />

<style>
  canvas {
    width: 100%;
    height: 100%;
  }
</style>
