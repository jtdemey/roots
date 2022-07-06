<script type="ts">
  import NavBtn from "./NavBtn.svelte";
  import ConsoleImg from "$lib/assets/nav/console.svg";
  import InventoryImg from "$lib/assets/nav/inventory.svg";
  import MapImg from "$lib/assets/nav/map.svg";
  import InfoImg from "$lib/assets/nav/info.svg";
  import { GameColors } from "$lib/data/ui/GameColors";

  interface NavBtn {
    alt: string;
    href: string;
    src: any;
  }

  const makeBtnData = (alt: string, href: string, src: any): NavBtn => ({
    alt,
    href,
    src
  });

  const navBtns: NavBtn[] = [
    makeBtnData(
      "Three horizontal lines indicating text printed on a console",
      "console",
      ConsoleImg
    ),
    makeBtnData("A backpack", "inventory", InventoryImg),
    makeBtnData("A compass", "map", MapImg),
    makeBtnData(
      `A lowercase "i" indicating the word "information"`,
      "info",
      InfoImg
    )
  ];
</script>

<nav style="background-color: {GameColors.grayscales.green[0]}">
  {#each navBtns as btn, i}
    <NavBtn
      alt={btn.alt}
      fadeDelay={(i + 1) * 70 + 200}
      href={btn.href}
      src={btn.src}
    />
  {/each}
</nav>

<style>
  nav {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    position: fixed;
    bottom: 0px;
  }
</style>
