import type { Exit } from "../../../models/Exit";
import type { Feature } from "../../../models/Feature";
import type { GameEvent } from "../../../models/GameEvent";
import type { Item } from "../../../models/Item";
import type { Locale } from "../../../models/Locale";
import { get } from "svelte/store";
import { appendLine, appendRandomLine } from "$lib/stores/game/GameStore";
import { locale } from "$lib/stores/player/PlayerStore";
import { getLocale } from "$lib/utils/selectors/WorldSelectors";
import { queueEventNow } from "$lib/utils/GameEventUtils";
import { addAOrAn } from "$lib/utils/GrammarUtils";
import { getItemMetadata } from "$lib/utils/selectors/ItemSelectors";
import { parseDirection } from "./go";

const LocaleAliases: string[] = [
  "area",
  "locale",
  "place",
  "room",
  "surroundings",
  "zone"
];

export const parseExamine = (
  input: string[],
  currentTick: number
): GameEvent[] => {
  const queuedEvents: GameEvent[] = [];
  const notedEntities: string[] = [];
  const target: string = input.length === 1 ? "" : input[1].toLocaleLowerCase();
  const currentLocale: Locale = getLocale(get(locale));
  let targetFound: boolean = false;
  let tickIndex: number = currentTick;

  //Locale
  if (
    input.length === 1 ||
    LocaleAliases.some((alias: string) => alias === target)
  ) {
    const notedExits: string[] = [];
    const phrase: string = get(currentLocale.examinePhrase);
    if (phrase) {
      queueEventNow(queuedEvents, tickIndex, () => appendLine(phrase));
      tickIndex += 2;
    }
    const localeExits: Exit[] = get(currentLocale.exits);
    localeExits.forEach((exit: Exit) => {
      if (exit.visibilityThreshold >= get(currentLocale.visibility)) {
        notedExits.push(exit.direction);
      }
    });
    if (notedExits.length === 0) {
      queueEventNow(queuedEvents, tickIndex, () =>
        appendLine("It's too dark to discern any exits.")
      );
      tickIndex += 2;
    } else if (notedExits.length === 1) {
      queueEventNow(queuedEvents, tickIndex, () =>
        appendLine(`There's an exit to the ${notedExits[0]}.`)
      );
      tickIndex += 2;
    } else if (notedExits.length > 1) {
      const joinedExits: string =
        notedExits.slice(0, notedExits.length - 2).join(", ") +
        `and ${notedExits.slice(notedExits.length - 1)}`;
      queueEventNow(queuedEvents, tickIndex, () =>
        appendRandomLine([
          `There are exits to the ${joinedExits}.`,
          `You can discern exits to the ${joinedExits}.`,
          `You see exits to the ${joinedExits}.`,
          `There is passage to the ${joinedExits}.`
        ])
      );
      tickIndex += 2;
    }
  }

  //Exits
  const parsedDirection: string = parseDirection(target);
  if (parsedDirection !== "") {
    const localeExits: Exit[] = get(currentLocale.exits);
    targetFound = true;
    let exitDescFound: boolean = false;
    localeExits.forEach((exit: Exit) => {
      if (
        exit.direction.toLocaleLowerCase() === parsedDirection &&
        exit.description !== ""
      ) {
        queueEventNow(queuedEvents, tickIndex, () =>
          appendLine(exit.description)
        );
        tickIndex += 2;
        exitDescFound = true;
        return;
      }
    });
    if (exitDescFound === false) {
      const dir = parsedDirection.toLocaleLowerCase();
      let suffix: string = `to the ${dir}`;
      if (dir === "up") {
        suffix = "above you";
      }
      if (dir === "down") {
        suffix = "below you";
      }
      if (dir === "inside") {
        suffix = "inside";
      }
      queueEventNow(queuedEvents, tickIndex, () =>
        appendRandomLine([
          `There's nothing notable ${suffix}.`,
          `There's nothing remarkable ${suffix}.`,
          `There is no passage ${suffix}.`
        ])
      );
      tickIndex += 2;
    }
  }

  //Features
  const localeFeatures: Feature[] = get(currentLocale.features);
  localeFeatures.forEach((feature: Feature) => {
    notedEntities.push(feature.name.toLocaleLowerCase());
    if (feature.name.toLocaleLowerCase() === target) {
      queueEventNow(queuedEvents, tickIndex, () =>
        appendLine(feature.description)
      );
      tickIndex += 2;
      targetFound = true;
    }
  });
  if (notedEntities.length === 1) {
    queueEventNow(queuedEvents, tickIndex, () =>
      appendLine(`You notice ${addAOrAn(notedEntities[0])}.`)
    );
    tickIndex += 2;
  } else if (notedEntities.length > 1) {
    const joinedEntities: string = notedEntities
      .map((entity: string, i: number) => {
        if (i === notedEntities.length) {
          return `and ${addAOrAn(entity)}`;
        }
        return `${addAOrAn(entity)}, `;
      })
      .join("");
    queueEventNow(queuedEvents, tickIndex, () =>
      appendLine(`You notice ${joinedEntities}.`)
    );
    tickIndex += 2;
  }
  if (targetFound) {
    return queuedEvents;
  }

  //Items
  const localeItems: Item[] = get(currentLocale.items);
  localeItems.forEach((item: Item) => {
    const meta = getItemMetadata(item.name);
    if (
      item.name.toLocaleLowerCase() === target ||
      meta.display.toLocaleLowerCase() === target
    ) {
      queueEventNow(queuedEvents, tickIndex, () =>
        appendLine(meta.description)
      );
      tickIndex += 2;
    }
  });

  return queuedEvents;
};
