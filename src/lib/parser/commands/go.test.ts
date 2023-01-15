import { describe, expect, test } from "@jest/globals";
import { DirectionAliases } from "$lib/data/world/DirectionAliases";
import { getIntendedDirection, parseDirection } from "./go";

describe("parsing a direction from raw input", () => {
  test("parses full cardinal direction names", () => {
    const cardinalNames: string[] = Object.keys(DirectionAliases).map(
      (directionName: string) => directionName.toLocaleLowerCase()
    );
    cardinalNames.forEach((name: string) => {
      const parsedDirection: string = parseDirection(name);
      expect(parsedDirection).toBe(name);
    });
  });
});

describe("getting intended direction from raw input", () => {
  test("successfully parses 'go n'", () => {
    const intendedDirection: string = getIntendedDirection(["go", "n"]);
    expect(intendedDirection).toBe("north");
  });

  test("successfully parses 'go north'", () => {
    const intendedDirection: string = getIntendedDirection(["go", "north"]);
    expect(intendedDirection).toBe("north");
  });

  test("successfully parses 'north'", () => {
    const intendedDirection: string = getIntendedDirection(["north"]);
    expect(intendedDirection).toBe("north");
  });
});
