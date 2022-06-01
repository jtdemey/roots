import type { Locale } from "../../../models/Locale";
import { writable } from "svelte/store";
import { Directions } from "./Directions";
import * as F from "./WorldFactory";

const w = writable;

export const Forest: Locale[] = [
  F.createLocale("car", "Car", 7, 0, 7, {
    enterPhrase: w(`You sit in the driver's seat.`),
    examinePhrase:
      w("Your typically reliable Audi 5000CS Turbo Quattro provides meager solace from the bitter cold."),
    containers: w([
      F.createContainer(
        "Glovebox",
        `It's modest glovebox; it seems unlocked.`,
        w([F.createLoot(1, "handwarmers", 1), F.createLoot(1, "flashlight", 1)])
      )
    ]),
    exits: w([
      F.createExit(Directions.Outside, "mailbox", 1000, "You exit the vehicle.")
    ]),
    items: w([F.createItem("handwarmers", 1)])
  })
];