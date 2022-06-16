import type { Locale } from "../../../models/Locale";
import { writable } from "svelte/store";
import { Directions } from "./Directions";
import * as F from "./WorldFactory";
import { Temperatures } from "./Temperatures";

const w = writable;

export const Forest: Locale[] = [
  F.createLocale("car", "Car", 7, 0, 7, {
    enterPhrase: w(`You sit in the driver's seat.`),
    examinePhrase: w(
      "Your typically reliable Audi 5000CS Turbo Quattro provides meager solace from the bitter cold."
    ),
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
  }),

  F.createLocale("mailbox", "Roadside", 7, 0, 7, {
    enterPhrase: w(`The cold, still air bites at your face. You stand in
			the center of a jagged, neglected road twisting through dark trees
			and heavy undergrowth. There is a mailbox here at the mouth of a driveway.`),
    containers: w([
      F.createContainer(
        "Car trunk",
        `The trunk to your sedan.`,
        w([F.createLoot(1, "crowbar", 1)])
      ),
      F.createContainer(
        "Mailbox",
        `There's a simple, dark green mailbox here at the cusp of a driveway.`,
        w([F.createLoot(1, "welcome_note", 1)])
      )
    ]),
    exits: w([
      F.createExit(
        Directions.South,
        "farm_front_path",
        1000,
        "You march through the decrepit entrance to the driveway."
      ),
      F.createExit(
        Directions.Inside,
        "car",
        1500,
        "You open the car door, duck, and step inside."
      )
    ]),
    items: w([F.createItem("handwarmers", 1)]),
    spawns: w([F.createSpawn("wolf", 1)]),
    temperature: Temperatures.Cold
  }),

  F.createLocale("farm_front_path", "Front Path", 7, 0, 6, {
    exits: w([
      F.createExit(
        Directions.North,
        "farm_front_path",
        1000,
        "You exit the mouth of the driveway, arriving back at the main road."
      )
    ]),
    items: w([F.createItem("handwarmers", 1)]),
    temperature: Temperatures.Cold
  })
];