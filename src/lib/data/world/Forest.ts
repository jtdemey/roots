import type { Locale } from "../../../models/Locale";
import { Directions } from "./Directions";
import * as F from "./WorldFactory";

export const Forest: Locale[] = [
  F.createLocale("car", "Car", 7, 0, 7, {
    enterPhrase: `You sit in the driver's seat.`,
    examinePhrase:
      "Your typically reliable Audi 5000CS Turbo Quattro provides meager solace from the bitter cold.",
    containers: [
      F.createContainer(
        "Glovebox",
        `It's modest glovebox; it seems unlocked.`,
        [F.createLoot(1, "handwarmers", 1), F.createLoot(1, "flashlight", 1)]
      )
    ],
    exits: [
      F.createExit(Directions.Outside, "mailbox", 1000, "You exit the vehicle.")
    ],
    items: [F.createItem("handwarmers", 1)]
  })
];