import type { Enemy } from "../../../models/Enemy";
import type { GameCommand } from "../../../models/GameCommand";
import { parseAttackMove } from "$lib/parser/CombatParser";
import { genGameCommand } from "./GameCommands";
import { getRandomElement } from "$lib/utils/MathUtils";

interface ICombatCommands {
  [key: string]: GameCommand;
}

export const CombatCommands: ICombatCommands = {
  attack: genGameCommand(
    "attack",
    (input: string[], currentTick: number, enemy: Enemy) =>
      parseAttackMove(
        input.map((word: string, i: number) =>
          i === 0 ? getRandomElement(["headbutt", "kick", "punch"]) : word
        ),
        currentTick,
        enemy
      ),
    ["assault", "bonk", "fight", "hit", "kill"]
  ),

  block: genGameCommand(
    "block",
    (input: string[], currentTick: number, enemy: Enemy) => parseAttackMove(input, currentTick, enemy),
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
      "avoid",
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

  flee: genGameCommand(
    "flee",
    (input: string[], currentTick: number, enemy: Enemy) => false,
    [
      "bolt",
      "depart",
      "desert",
      "elude",
      "go",
      "leave",
      "scamper",
      "scram",
      "skedaddle",
      "retreat",
      "run",
      "vamoose",
      "vanish"
    ]
  ),

  headbutt: genGameCommand(
    "headbutt",
    (input: string[], currentTick: number, enemy: Enemy) => parseAttackMove(input, currentTick, enemy),
    ["dome", "head", "headslam"]
  ),

  jab: genGameCommand(
    "jab",
    (input: string[], currentTick: number, enemy: Enemy) => parseAttackMove(input, currentTick, enemy),
    ["clip", "thump"]
  ),

  kick: genGameCommand(
    "kick",
    (input: string[], currentTick: number, enemy: Enemy) =>
      parseAttackMove(input, currentTick, enemy),
    ["boot", "dropkick", "hookkick", "punt", "roundkick", "sidekick"]
  ),

  punch: genGameCommand(
    "punch",
    (input: string[], currentTick: number, enemy: Enemy) => parseAttackMove(input, currentTick, enemy),
    [
      "bash",
      "biff",
      "blow",
      "bop",
      "box",
      "cuff",
      "fist",
      "fists",
      "knock",
      "lollop",
      "pummel",
      "slam",
      "slug",
      "sock",
      "strike",
      "wallop"
    ]
  ),

  slap: genGameCommand(
    "slap",
    (input: string[], currentTick: number, enemy: Enemy) => parseAttackMove(input, currentTick, enemy),
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
