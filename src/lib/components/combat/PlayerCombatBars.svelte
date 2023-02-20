<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { linear } from "svelte/easing";
  import { tweened, type Tweened } from "svelte/motion";
  import { GameColors } from "$lib/data/ui/GameColors";
  import { cooldown } from "$lib/stores/combat/CombatStore";
  import { health, maxHealth } from "$lib/stores/player/PlayerStore";
  import { roundTo } from "$lib/utils/MathUtils";
  import CombatBar from "$lib/components/combat/CombatBar.svelte";

  let cd: number = 0;
  let hp: number = 50;
  let maxHp: number = 50;
  let unsubCd: Function = () => false;
  let unsubHp: Function = () => false;
  let unsubMaxHp: Function = () => false;

  const cdLabelValue: Tweened<number> = tweened(100, {
    duration: 420,
    easing: linear
  });

  onMount(() => {
    unsubCd = cooldown.subscribe((currentCd: number) => {
      cd = currentCd;
      cdLabelValue.set(currentCd, { duration: 1 });
      setTimeout(() => {
        cdLabelValue.set(0, { duration: (currentCd - 1) * 500 - 5 });
      }, 5);
    });
    unsubHp = health.subscribe((currentHp: number) => {
      hp = currentHp;
    });
    unsubMaxHp = maxHealth.subscribe((currentMaxHp: number) => {
      maxHp = currentMaxHp;
    });
  });

  onDestroy(() => {
    unsubCd();
    unsubHp();
    unsubMaxHp();
  });
</script>

<div>
  <CombatBar
    backgroundColor={GameColors.combat.health}
    label="HP"
    text={hp.toString()}
    width={(hp / maxHp) * 100}
  />
  <CombatBar
    backgroundColor={GameColors.combat.cooldown}
    isReplenishing={true}
    label="CD"
    text={roundTo($cdLabelValue, 1).toString()}
    width={cd === 0 ? 100 : cd}
  />
</div>
