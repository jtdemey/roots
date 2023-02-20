<script lang="ts">
  import { GameColors } from "$lib/data/ui/GameColors";

  export let opacity: number = 1.0;
  export let text: string = "...";

  let color: string = GameColors.console.standard.color;
  let formattedText: string = text;

  const formatText = (line: string): string => {
    let formattedLine: string = line;
    Object.keys(GameColors.console).forEach((consoleColorKey: string) => {
      const consoleColor: { color: string, prefix: string } = GameColors.console[consoleColorKey];
      if (line.startsWith(consoleColor.prefix)) {
        color = consoleColor.color;
        formattedLine = formattedLine.replace(consoleColor.prefix, "");
      }
    });
    return formattedLine;
  };

  $: formattedText = formatText(text);
</script>

<pre style="color: {color}; opacity: {opacity};">
  {formattedText}
</pre>

<style>
  pre {
    min-height: 27px;
    margin: 0;
    padding: 0 0.5rem;
    font-family: "Newsreader", serif;
    font-size: 1rem;
    line-height: 150%;
    white-space: inherit;
  }
</style>
