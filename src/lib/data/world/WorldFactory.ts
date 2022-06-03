import { nanoid } from "nanoid";
import { writable, type Writable } from "svelte/store";
import type { Comment } from "../../../models/Comment";
import type { Container } from "../../../models/Container";
import type { Enemy } from "../../../models/Enemy";
import type { Exit } from "../../../models/Exit";
import type { Feature } from "../../../models/Feature";
import type { Item } from "../../../models/Item";
import type { ItemMetadata } from "../../../models/meta/ItemMetadata";
import type { Locale } from "../../../models/Locale";
import type { Loot } from "../../../models/Loot";
import type { Spawn } from "../../../models/Spawn";

export const createComment = (
  visibilityThreshold: number,
  text: string
): Comment => ({
  lastCommented: 0,
  visibilityThreshold,
  text
});

export const createContainer = (
  name: string,
  description: string,
  loot: Writable<Loot[]>,
  locked: boolean = false
): Container => ({
  entityId: nanoid(),
  containerState: 0,
  name,
  description,
  loot,
  locked
});

export const createExit = (
  direction: number,
  destination: string,
  duration: number,
  exitPhrase: string
): Exit => ({
  direction,
  destination,
  duration,
  exitPhrase
});

export const createFeature = (
  name: string,
  visibilityThreshold: number,
  description: string
): Feature => ({
  name,
  visibilityThreshold,
  description
});

export const createLocale = (
  name: string,
  display: string,
  x: number,
  y: number,
  z: number,
  overrides: any = {}
): Locale => {
	return Object.assign(
		{
			name,
			display: writable<string>(display),
			comments: writable<Comment[]>([]),
			containers: writable<Container[]>([]),
			coordinates: writable<number[]>([x, y, z]),
			enemies: writable<Enemy[]>([]),
			enterPhrase: writable<string>("You have entered a default locale."),
			examinePhrase: writable<string>("Looks like a default locale here."),
			exitPhrase: writable<string>("You have exited a default locale."),
			exits: writable<Exit[]>([]),
			features: writable<Feature[]>([]),
			items: writable<Item[]>([]),
			loot: writable<Loot[]>([]),
			region: writable<string>("forest"),
			spawns: writable<Spawn[]>([]),
			visits: writable<number>(0),
			temperature: writable<number>(0),
			visibility: writable<number>(0)
		},
		overrides
	);
};

export const createItem = (name: string, amount: number, containerId: string | null = null): Item => ({
  entityId: nanoid(),
  amount,
	containerId,
  name
});

export const createItemMetadata = (
  display: string,
  description: string,
  stackable: boolean,
  overrides: any = {}
): ItemMetadata =>
  Object.assign(
    {
      display,
      description,
      equipable: false,
      stackable
    },
    overrides
  );

export const createLoot = (
  probability: number,
  name: string,
  amount: number | number[]
): Loot => ({
  probability,
  name,
  amount
});

export const createSpawn = (name: string, probability: number): Spawn => ({
  name,
  probability
});