import { get, type Writable } from "svelte/store";
import type { Locale } from "../../../models/Locale";
import { World } from "$lib/data/world/World";
import type { Container } from "../../../models/Container";
import { ContainerStates } from "$lib/data/items/ContainerStates";

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
  entityId: string
): void => {
  containersStore.update((containers: Container[]) => {
    const matchingContainers: Container[] = containers.filter(
      (container: Container) => container.entityId === entityId
    );
		const otherContainers: Container[] = containers
      .filter((container: Container) => container.entityId !== entityId)
    if (matchingContainers.length < 1) {
      console.error(`openContainer: no container ${entityId}`);
      return containers;
    }
		if (matchingContainers[0].locked === true) {
			return otherContainers 
				.concat([
					{
						...matchingContainers[0],
						containerState: ContainerStates.Locked
					}
				]);
		}
		const goodies = get(matchingContainers[0].loot);
		if (goodies.length > 0) {

		}
    return otherContainers 
      .concat([
        {
          ...matchingContainers[0],
          containerState: ContainerStates.Open
        }
      ]);
  });
};