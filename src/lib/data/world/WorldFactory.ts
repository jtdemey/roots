import { nanoid } from "nanoid";
import type { Item } from "../../../models/Item";
import type { ItemMetadata } from "../../../models/meta/ItemMetadata";
import type { Locale } from "../../../models/Locale";

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