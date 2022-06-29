import type { Container } from "../../../models/Container";
import type { Enemy } from "../../../models/Enemy";
import type { Item } from "../../../models/Item";
import type { Locale } from "../../../models/Locale";
import type { Spawn } from "../../../models/Spawn";
import { get, type Writable } from "svelte/store";
import { createEnemy } from "$lib/data/enemy/EnemyFactory";
import { ContainerStates } from "$lib/data/items/ContainerStates";
import { World } from "$lib/data/world/World";
import { rollLoot } from "$lib/utils/items/ItemUtils";
import { getLocale } from "$lib/utils/selectors/WorldSelectors";

export const GameWorld: Locale[] = World;

export const closeContainer = (
  containersStore: Writable<Container[]>,
  entityId: string
): void => {
  containersStore.update((containers: Container[]) => {
    const matchingContainers: Container[] = containers.filter(
      (container: Container) => container.entityId === entityId
    );
    if (matchingContainers.length < 1) {
      console.error(`closeContainer: no container ${entityId}`);
      return containers;
    }
    if (matchingContainers[0].containerState !== ContainerStates.Open) {
      return containers;
    }
    return containers
      .filter((container: Container) => container.entityId !== entityId)
      .concat([
        {
          ...matchingContainers[0],
          containerState: ContainerStates.Unlocked
        }
      ]);
  });
};

export const openContainer = (
  containersStore: Writable<Container[]>,
  entityId: string,
  localeName: string
): void => {
  containersStore.update((containers: Container[]) => {
    const matchingContainers: Container[] = containers.filter(
      (container: Container) => container.entityId === entityId
    );
    const otherContainers: Container[] = containers.filter(
      (container: Container) => container.entityId !== entityId
    );
    if (matchingContainers.length < 1) {
      console.error(`openContainer: no container ${entityId}`);
      return containers;
    }
    const targetContainer = matchingContainers[0];
    if (targetContainer.locked === true) {
      return otherContainers.concat([
        {
          ...targetContainer,
          containerState: ContainerStates.Locked
        }
      ]);
    }
    const goodies = get(targetContainer.loot);
    if (goodies.length > 0) {
      const targetLocale = getLocale(localeName);
      targetLocale.items.update((localeItems: Item[]) =>
        localeItems.concat(rollLoot(targetContainer.entityId, goodies))
      );
      targetContainer.loot.set([]);
    }
    return otherContainers.concat([
      {
        ...targetContainer,
        containerState: ContainerStates.Open
      }
    ]);
  });
};

export const spawnEnemies = (currentLocale: Locale): Enemy[] => {
  const enemies: Enemy[] = [];
  const spawns = get(currentLocale.spawns);
  if (!spawns || spawns.length < 1) return enemies;
  spawns.forEach((spawn: Spawn) => {
    if (Math.random() > spawn.probability) return;
    enemies.push(createEnemy(spawn.name));
  });
  currentLocale.enemies.set(enemies);
  return enemies;
};
