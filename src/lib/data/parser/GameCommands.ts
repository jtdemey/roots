import type { GameCommand } from "../../../models/GameCommand";
import { parseExamine } from "$lib/parser/commands/examine";
import { parseGo } from "$lib/parser/commands/go";
import { DirectionAliases } from "../world/DirectionAliases";
import { PlayerFlags } from "../player/PlayerFlags";
import { parseUse } from "$lib/parser/commands/use";

//Direction shorthands for GO command
const directionShorthands: string[] = [];
Object.keys(DirectionAliases).forEach((directionKey: string) => {
  directionShorthands.push(directionKey.toLocaleLowerCase());
  DirectionAliases[directionKey].forEach((alias: string) =>
    directionShorthands.push(alias)
  );
});

export const genGameCommand = (
  name: string,
  action: Function,
  aliases: string[],
  cancels: any[] = [],
  disabledForFlags: PlayerFlags[] = []
): GameCommand => ({
  name,
  action,
  aliases,
  cancels,
  disabledForFlags
});

export const GameCommands: any = {
  attack: genGameCommand(
    "attack",
    (input: string[], currentTick: number) => false,
    ["fight", "hit", "assault", "bonk"]
  ),

  eat: genGameCommand("eat", (input: string[], currentTick: number) => false, [
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

  equip: genGameCommand(
    "equip",
    (input: string[], currentTick: number) => false,
    ["adorn", "arm", "don", "dress", "endow", "fit", "furnish", "gear", "wear"]
  ),

  examine: genGameCommand(
    "examine",
    (input: string[], currentTick: number) => parseExamine(input, currentTick),
    [
      "gander",
      "look",
      "look about",
      "look around",
      "look at",
      "perceive",
      "peruse",
      "search",
      "where",
      "whereami"
    ]
  ),

  go: genGameCommand(
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
    ].concat(directionShorthands),
    [],
    []
  ),

  throw: genGameCommand(
    "throw",
    (input: string[], currentTick: number) => false,
    [
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
    ]
  ),

  use: genGameCommand(
    "use",
    (input: string[], currentTick: number) => parseUse(input, currentTick),
    ["interact with"],
    [],
    [PlayerFlags.Exiting, PlayerFlags.Running]
  )
};
