import type { Comment } from "../../../models/Comment";
import type { Container } from "../../../models/Container";
import type { Enemy } from "../../../models/Enemy";
import type { Exit } from "../../../models/Exit";
import type { Feature } from "../../../models/Feature";
import type { Item } from "../../../models/Item";
import type { ItemFlags } from "../items/ItemFlags";
import type { ItemMetadata } from "../../../models/meta/ItemMetadata";
import type { Locale } from "../../../models/Locale";
import type { Loot } from "../../../models/Loot";
import type { Spawn } from "../../../models/Spawn";
import { nanoid } from "nanoid";
import { writable, type Writable } from "svelte/store";
import { Temperatures } from "./Temperatures";

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
  direction: string,
  destination: string,
  duration: number,
  exitPhrase: string,
  description: string = "",
  locked: boolean = false,
  visibilityThreshold: number = 0
): Exit => ({
  description,
  destination,
  direction,
  duration,
  exitPhrase,
  locked,
  visibilityThreshold
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
      temperature: writable<number>(Temperatures.Normal),
      visibility: writable<number>(0)
    },
    overrides
  );
};

export const createItem = (
  name: string,
  amount: number,
  containerId: string | null = null
): Item => {
  return {
    entityId: nanoid(),
    amount,
    containerId,
    flags: [],
    name
  };
};

export const createItemMetadata = (
  display: string,
  baseFlags: ItemFlags[],
  description: string,
  interactions: { [key: string]: Function } = {},
  overrides: any = {}
): ItemMetadata =>
  Object.assign(
    {
      baseFlags,
      display,
      description,
      interactions
    },
    overrides
  );

export const createLoot = (
  probability: number,
  name: string,
  amount: number | number[] = 1
): Loot => ({
  probability,
  name,
  amount
});

export const createSpawn = (name: string, probability: number): Spawn => ({
  name,
  probability
});
