import type { Enemy } from "../../models/Enemy";
import type { Move } from "src/models/Move";
import { describe, expect, test } from "@jest/globals";
import { createEnemy } from "$lib/data/enemy/EnemyFactory";
import { getNextMove } from "./CombatUtils";

const wolf: Enemy = createEnemy("wolf");

describe("rolling random moves", () => {
  test("getNextMove returns a Move", () => {
    const move: Move = getNextMove(wolf);
    expect(move.name).toBeDefined();
  });
});
