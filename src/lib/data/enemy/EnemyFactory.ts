import type { Enemy } from "../../../models/Enemy";
import { writable } from "svelte/store";
import { between } from "$lib/utils/MathUtils";
import { generateEntityId } from "$lib/utils/items/IdGenerator";
import { getEnemyMetadata } from "$lib/utils/selectors/EnemySelectors";

const w = writable;

export const createEnemy = (name: string): Enemy => {
  const meta = getEnemyMetadata(name);
  const maxHealth: number = Array.isArray(meta.maxHealth)
    ? between(meta.maxHealth[0], meta.maxHealth[1])
    : meta.maxHealth;
  return {
    attack: w(meta.baseAttack),
    defense: w(meta.baseDefense),
    evasion: w(meta.baseEvasion),
    entityId: generateEntityId(),
    health: w(maxHealth),
    maxHealth: w(maxHealth),
    name,
    speed: w(meta.baseSpeed)
  };
};
