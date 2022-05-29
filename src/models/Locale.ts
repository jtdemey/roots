import type { Comment } from "./Comment";
import type { Container } from "./Container";
import type { Enemy } from "./Enemy";
import type { Exit } from "./Exit";
import type { Feature } from "./Feature";
import type { Item } from "./Item";
import type { Loot } from "./Loot";
import type { LocaleMetadata } from "./meta/LocaleMetadata";
import type { Spawn } from "./Spawn";

export interface Locale {
  name: string;
  comments: Comment[];
  containers: Container[];
  enemies: Enemy[];
  meta: LocaleMetadata;
  exits: Exit[];
  features: Feature[];
  items: Item[];
	loot: Loot[];
	spawn: Spawn[];
	visits: number;
	temperature: number;
	visibility: number;
}