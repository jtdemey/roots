import { parseExamine } from "$lib/parser/commands/examine";
import { parseGo } from "$lib/parser/commands/go";
import type { GameCommand } from "../../../models/GameCommand";

const genCmd = (
  name: string,
  action: Function,
  aliases: string[],
  cancels: any[] = []
): GameCommand => ({
  name,
  action,
  aliases,
  cancels
});

export const GameCommands: any = {
  attack: genCmd("attack", (input: string[], currentTick: number) => false, [
    "fight",
    "hit",
    "assault",
    "bonk"
  ]),

  eat: genCmd("eat", (input: string[], currentTick: number) => false, [
    "bite",
    "chew",
    "devour",
    "digest",
    "feast",
    "ingest",
    "inhale",
    "masticate",
    "nosh",
    "swallow"
  ]),

  equip: genCmd("equip", (input: string[], currentTick: number) => false, [
    "adorn",
    "arm",
    "don",
    "dress",
    "endow",
    "fit",
    "furnish",
    "gear",
    "wear"
  ]),

  examine: genCmd(
    "examine",
    (input: string[], currentTick: number) => parseExamine(input, currentTick),
    ["gander", "look", "perceive", "peruse", "search", "where", "whereami"]
  ),

  go: genCmd(
    "go",
    (input: string[], currentTick: number) => parseGo(input, currentTick),
    [
      "canter",
      "cross",
      "dart",
      "escape",
      "gallop",
      "jog",
      "leave",
      "migrate",
      "move",
      "proceed",
      "progress",
      "race",
      "relocate",
      "run",
      "rush",
      "scamper",
      "scuttle",
      "spring",
      "sprint",
      "travel",
      "trot",
      "walk"
    ]
  ),

  throw: genCmd("throw", (input: string[], currentTick: number) => false, [
    "catapult",
    "chuck",
    "discharge",
    "fire",
    "flick",
    "fling",
    "heave",
    "hurl",
    "launch",
    "lob",
    "pitch",
    "send",
    "sling",
    "toss",
    "volley",
    "yeet"
  ])
};
