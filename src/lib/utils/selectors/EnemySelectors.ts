import type { EnemyMetadata } from "../../../models/meta/EnemyMetadata";
import { EnemyData } from "$lib/data/enemy/EnemyData";

const getDefaultMetadata = (): EnemyMetadata => EnemyData["default_enemy"];

export const getEnemyMetadata = (name: string): EnemyMetadata => {
  const meta = EnemyData[name];
  if (!meta) {
    console.error(`Could not find enemy metadata for ${name}`);
    return getDefaultMetadata();
  }
  return meta;
};
