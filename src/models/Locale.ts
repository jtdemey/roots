import type { Writable } from "svelte/store";
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
  comments: Writable<Comment[]>;
  containers: Writable<Container[]>;
	display: Writable<string>;
  enemies: Writable<Enemy[]>;
  enterPhrase: Writable<string>;
  examinePhrase: Writable<string>;
  exitPhrase: Writable<string>;
  meta: Writable<LocaleMetadata>;
  exits: Writable<Exit[]>;
  features: Writable<Feature[]>;
  items: Writable<Item[]>;
	loot: Writable<Loot[]>;
	region: Writable<string>;
	spawns: Writable<Spawn[]>;
	visits: Writable<number>;
	temperature: Writable<number>;
	visibility: Writable<number>;
}
