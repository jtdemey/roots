import type { Container } from "../../../models/Container";
import type { Item } from "../../../models/Item";
import type { Locale } from "../../../models/Locale";
import { get, type Writable } from "svelte/store";
import { World } from "$lib/data/world/World";
import { ContainerStates } from "$lib/data/items/ContainerStates";
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