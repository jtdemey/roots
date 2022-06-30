import type { Item } from "../../../models/Item";
import type { Locale } from "../../../models/Locale";
import { goto } from "$app/navigation";
import { get, writable } from "svelte/store";
import { appendLine, appendRandomLine, startCombat } from "../game/GameStore";
import { ItemData } from "$lib/data/items/ItemData";
import { PlayerFlags } from "$lib/data/player/PlayerFlags";
import { createItem } from "$lib/data/world/WorldFactory";
import { TemperatureEffects } from "$lib/data/world/TemperatureEffects";
import { spawnEnemies } from "$lib/stores/world/WorldStore";
import { getItemMetadata } from "$lib/utils/selectors/ItemSelectors";
import { getPlayerTemperatureLevel } from "$lib/utils/world/WorldUtils";
import { getLocale } from "$lib/utils/selectors/WorldSelectors";
import { roundTo } from "$lib/utils/MathUtils";

export const energy = writable<number>(100);
export const health = writable<number>(100);
export const items = writable<Item[]>([createItem("handwarmers", 2)]);
export const locale = writable<string>("car");
export const lastLocale = writable<string>(undefined);
export const maxHealth = writable<number>(100);
export const playerFlags = writable<PlayerFlags[]>([]);
export const region = writable<string>("forest");
export const sanity = writable<number>(100);
export const temperature = writable<number>(98.6);

export const affectPlayerEnergy = (amount: number) =>
  energy.update((currentEnergy: number) => {
    const nextEnergy = currentEnergy + amount;
    return nextEnergy < 1 ? 0 : nextEnergy;
  });

export const affectPlayerSanity = (amount: number) =>
  sanity.update((currentSanity: number) => {
    const nextSanity = currentSanity + amount;
    return nextSanity < 1 ? 0 : nextSanity;
  });

export const affectPlayerTemperature = (
  environmentTemp: number,
  playerTemp: number
): void => {
  //To-do: more nuanced cooling/heating
  const environmentDifference: number = playerTemp - (environmentTemp + 40);
  temperature.update((currentTemp: number) => {
    const currentTempLvl: string = getPlayerTemperatureLevel(currentTemp);
    const newTemperature: number = roundTo(
      currentTemp - environmentDifference / 240,
      1
    );
    const nextTempLvl: string = getPlayerTemperatureLevel(newTemperature);
    if (currentTempLvl !== nextTempLvl) {
      shiftPlayerTemperatureLevel(currentTemp, newTemperature, currentTempLvl);
    }
    return newTemperature;
  });
};

const addItemToInventory = (item: Item): void => {
  const itemMeta = ItemData[item.name];
  if (itemMeta.stackable) {
    const currentItems = get(items);
    if (
      currentItems.some((playerItem: Item) => playerItem.name === item.name)
    ) {
      items.update((playerItems: Item[]) => {
        const targetItem = playerItems.filter(
          (i: Item) => i.name === item.name
        )[0];
        targetItem.amount += item.amount;
        return playerItems
          .filter((i: Item) => i.name !== item.name)
          .concat([targetItem]);
      });
      return;
    }
  }
  items.update((playerItems: Item[]) =>
    playerItems.concat([createItem(item.name, item.amount, item.containerId)])
  );
};

const addItemToLocale = (targetLocale: Locale, item: Item) =>
  targetLocale.items.update((localeItems: Item[]) => {
    if (localeItems.some((thing: Item) => thing.name === item.name)) {
      const isStackable = getItemMetadata(item.name).stackable;
      if (isStackable === true) {
        const matchingLocaleItems = localeItems.filter(
          (thing: Item) =>
            thing.name === item.name && thing.containerId === null
        );
        if (matchingLocaleItems.length > 0) {
          matchingLocaleItems[0].amount += 1;
          return localeItems
            .filter(
              (thing: Item) =>
                thing.entityId !== matchingLocaleItems[0].entityId
            )
            .concat([matchingLocaleItems[0]]);
        }
      }
    }
    return localeItems.concat([createItem(item.name, 1, item.containerId)]);
  });

export const dropItem = (item: Item): void => {
  removeItemFromInventory(item);
  addItemToLocale(getLocale(get(locale)), item);
  const meta = getItemMetadata(item.name);
  appendLine(`You drop the ${meta.display.toLocaleLowerCase()}`);
};

export const enterLocale = (destination: Locale): void => {
  const playerFlagsToRemove: PlayerFlags[] = [
    PlayerFlags.Exiting,
    PlayerFlags.Running
  ];
  playerFlags.update((currentFlags: PlayerFlags[]) =>
    currentFlags.filter(
      (flag: PlayerFlags) =>
        !playerFlagsToRemove.some((pf: PlayerFlags) => pf === flag)
    )
  );
  locale.set(destination.name);
  appendLine(get(destination.enterPhrase));
  const spawns = get(destination.spawns);
  if (spawns.length > 0) {
    const enemies = spawnEnemies(destination);
    if (enemies.length === 1) {
      startCombat();
    }
  }
};

export const examineItem = (item: Item): void => {
  const meta = getItemMetadata(item.name);
  appendLine(meta.description);
  goto("/game/survive/console");
};

export const pickUpItem = (entityId: string, localeName: string): void => {
  const currentLocale = getLocale(localeName);
  const localeItems: Item[] = get(currentLocale.items);
  localeItems.forEach((item: Item) => {
    if (item.entityId === entityId) {
      currentLocale.items.update((stuff: Item[]) =>
        stuff.filter((i: Item) => i.entityId !== entityId)
      );
      addItemToInventory(item);
    }
  });
};

export const playerHasFlag = (flag: PlayerFlags): boolean =>
  get(playerFlags).some((f: PlayerFlags) => f === flag);

const removeItemFromInventory = (item: Item) =>
  items.update((inventory: Item[]) => {
    const targetItem = inventory.filter(
      (thing: Item) => thing.entityId === item.entityId
    )[0];
    const otherItems = inventory.filter(
      (thing: Item) => thing.entityId !== item.entityId
    );
    if (targetItem.amount > 1) {
      targetItem.amount -= 1;
      return otherItems.concat([targetItem]);
    }
    return otherItems;
  });

export const runWhileExitingLocale = (): void => {
  playerFlags.update((currentFlags: PlayerFlags[]) =>
    currentFlags.concat([PlayerFlags.Running])
  );
  affectPlayerEnergy(-8);
  appendRandomLine([
    `You begin running.`,
    `You break into a run.`,
    `You expend a burst of energy to run to the next area.`
  ]);
};

const shiftPlayerTemperatureLevel = (
  currentTemp: number,
  nextTemp: number,
  currentLvl: string
): void => {
  const temperatureEffects = TemperatureEffects[currentLvl];
  if (nextTemp < currentTemp) {
    if (temperatureEffects.dipPhrase !== "") {
      appendLine(temperatureEffects.dipPhrase);
    }
    temperatureEffects.dipAction && temperatureEffects.dipAction();
    return;
  }
  if (nextTemp > currentTemp) {
    if (temperatureEffects.risePhrase !== "") {
      appendLine(temperatureEffects.risePhrase);
    }
    temperatureEffects.riseAction && temperatureEffects.riseAction();
  }
};
