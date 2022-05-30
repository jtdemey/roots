import { nanoid } from "nanoid";
import type { Comment } from "../../../models/Comment";
import type { Container } from "../../../models/Container";
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
  loot: Loot[],
  locked: boolean = false
): Container => ({
  entityId: nanoid(),
  containerState: 0,
  name,
  description,
  items: [],
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
): Locale =>
  Object.assign(
    {
      name,
      display,
      comments: [],
      containers: [],
      coordinates: [x, y, z],
      enemies: [],
      enterPhrase: "You have entered a default locale.",
      examinePhrase: "Looks like a default locale here.",
      exitPhrase: "You have exited a default locale.",
      exits: [],
      features: [],
      items: [],
      loot: [],
			region: "forest",
      spawns: [],
      visits: 0,
      temperature: 0,
      visibility: 0
    },
    overrides
  );

export const createItem = (name: string, amount: number): Item => ({
  entityId: nanoid(),
  amount,
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