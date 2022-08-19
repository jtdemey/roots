<script type="ts">
  import { tick } from "$lib/stores/game/GameStore";
  import { formatTime, getTimeFromTick } from "$lib/utils/DateUtils";
</script>

<article>
  <h1>You perished at {formatTime(getTimeFromTick($tick))}.</h1>
  <h2>Your flesh feeds the forest as its roots grow deeper still.</h2>
  <a href="/mainmenu"><span>Main Menu</span></a>
</article>

<style>
  article {
    width: 100%;
  }
</style>
