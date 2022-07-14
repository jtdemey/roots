import type { Enemy } from "../../../models/Enemy";
import type { GameCommand } from "../../../models/GameCommand";
import { genGameCommand } from "./GameCommands";

export const CombatCommands: any = {
  attack: genGameCommand(
    "attack",
    (input: string[], currentTick: number, enemy: Enemy) => false,
    ["fight", "hit", "assault", "bonk"]
  ),
  block: genGameCommand(
    "block",
    (input: string[], currentTick: number, enemy: Enemy) => false,
    [
      "barricade",
      "catch",
      "check",
      "close",
      "cover",
      "defend",
      "deter",
      "fend",
      "intercept",
      "guard",
      "secure",
      "shield",
      "stymie"
    ]
  ),
  dodge: genGameCommand(
    "dodge",
    (input: string[], currentTick: number, enemy: Enemy) => false,
    [
      "circumlocate",
      "duck",
      "elude",
      "evade",
      "fudge",
      "juke",
      "lurch",
      "malinger",
      "pussyfoot",
      "shake",
      "shift",
      "shirk",
      "shuffle",
      "sidestep",
      "skirt",
      "slide",
      "slip",
      "swerve",
      "weasel"
    ]
  ),
  headbutt: genGameCommand(
    "headbutt",
    (input: string[], currentTick: number, enemy: Enemy) => false,
    ["dome", "head", "headslam"]
  ),
  kick: genGameCommand(
    "kick",
    (input: string[], currentTick: number, enemy: Enemy) => false,
    ["boot", "dropkick", "hookkick", "punt", "roundkick", "sidekick"]
  ),
  punch: genGameCommand(
    "punch",
    (input: string[], currentTick: number, enemy: Enemy) => false,
    [
      "bash",
      "biff",
      "blow",
      "bop",
      "box",
      "clip",
      "cuff",
      "fist",
      "fists",
      "jab",
      "knock",
      "lollop",
      "pummel",
      "slam",
      "slug",
      "sock",
      "strike",
      "thump",
      "wallop"
    ]
  ),
  slap: genGameCommand(
    "slap",
    (input: string[], currentTick: number, enemy: Enemy) => false,
    [
      "blip",
      "palm",
      "palmstrike",
      "rap",
      "smack",
      "spank",
      "swat",
      "whack",
      "wham"
    ]
  )
};
