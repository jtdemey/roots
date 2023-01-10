import type { Locale } from "../../../models/Locale";
import { writable } from "svelte/store";
import { Directions } from "./Directions";
import * as F from "./WorldFactory";
import { Temperatures } from "./Temperatures";

const w = writable;

export const Forest: Locale[] = [
  F.createLocale("car", "Car", 21, 0, 13, {
    enterPhrase: w(`You sit in the driver's seat.`),
    examinePhrase: w(
      "Your typically reliable Audi 5000CS Turbo Quattro provides meager solace from the bitter cold."
    ),
    containers: w([
      F.createContainer(
        "Glovebox",
        `It's modest glovebox; it should be unlocked.`,
        w([F.createLoot(1, "handwarmers", 4), F.createLoot(1, "flashlight")])
      )
    ]),
    exits: w([
      F.createExit(
        Directions.Outside,
        "mailbox",
        8,
        "You open the car door and exit the vehicle.",
        "The woods are dark and still aside from gentle snowfall. It's eerily silent."
      )
    ]),
    features: w([
      F.createFeature(
        "Air Freshener",
        0,
        "Your pinetree-shaped air freshener dangles delicately from your rear-view mirror."
      )
    ]),
    items: w([F.createItem("handwarmers", 1)]),
    temperature: w(Temperatures.Normal)
  }),

  F.createLocale("mailbox", "Roadside", 22, 0, 14, {
    enterPhrase: w(`The cold, still air bites at your face. You stand in
			the center of a jagged, neglected road twisting through dark trees
			and heavy undergrowth. There is a mailbox here at the mouth of a driveway.`),
    containers: w([
      F.createContainer(
        "Car trunk",
        `It's the trunk to your sedan.`,
        w([F.createLoot(1, "crowbar")])
      ),
      F.createContainer(
        "Mailbox",
        `There's a simple, dark green mailbox here at the cusp of a driveway.`,
        w([F.createLoot(1, "welcome_note")])
      )
    ]),
    exits: w([
      F.createExit(
        Directions.East,
        "river_bed_road",
        12,
        "You continue eastward down the road, trudging through shallow snowfall.",
        `The road continues slightly downhill to the east, curving to the south.`
      ),
      F.createExit(
        Directions.South,
        "farm_front_path",
        6,
        "You march through the decrepit entrance to the driveway.",
        `You can make out a humble house down the gravel driveway obscured with overgrowth.`
      ),
      F.createExit(
        Directions.Inside,
        "car",
        8,
        "You open the car door, duck, and step inside.",
        "It's hard to see through your car's tinted windows."
      )
    ]),
    // spawns: w([F.createSpawn("wolf", 1)]),
    temperature: w(Temperatures.Cold)
  }),

  F.createLocale("river_bed_road", "Winding Road", 27, 0, 16, {
    enterPhrase:
      w(`You arrive at a turn in the road that runs parallel to a riverbed visible
      through the eastern foliage. The road continues downhill to the south, and toward your car
      to the west.`),
    exits: w([
      F.createExit(
        Directions.East,
        "riverbed",
        10,
        `You descend down the steep roadside, wading through crooked trees and shallow thickets until
        the ground grows muddy.`,
        "A steep but traversable hill continues down to a muddy riverside."
      ),
      F.createExit(
        Directions.South,
        "farm_bridge_road",
        10,
        `You trod southwards down the road, hearing the hushed flow of the river to your east interspersed
          with your cushioned footsteps through the snow.`,
        `The rough road continues downhill to the south. You can barely discern a wooden bridge spanning
          the river through the crooked trees.`
      ),
      F.createExit(
        Directions.West,
        "mailbox",
        12,
        `You saunter up the road toward your car and the obscured driveway.`,
        `The road is long and dark. Snow falls gently between the disarray of branches overhead.`
      )
    ]),
    temperature: w(Temperatures.Cold)
  }),

  F.createLocale("steep_road", "Steep Road", 22, 0, 16, {
    exits: w([
      F.createExit(
        Directions.East,
        "mailbox",
        8,
        "You trudge down the steep, snowy road, ensuring safe footing as gravity aids you down the slope."
      )
    ]),
    temperature: w(Temperatures.Cold)
  }),

  F.createLocale("farm_front_path", "Front Path", 22, 0, 16, {
    exits: w([
      F.createExit(
        Directions.North,
        "mailbox",
        8,
        "You exit the mouth of the driveway, arriving back at the main road next to your vehicle."
      ),
      F.createExit(
        Directions.East,
        "shed",
        6,
        `You enter through the shoddy shed doorway.`,
        `A meager wooden shed with a tilted roof, rotted at its edges rests in a divot among the
          dense foliage.`
      )
    ]),
    items: w([F.createItem("handwarmers", 1)]),
    temperature: w(Temperatures.Cold)
  }),

  F.createLocale("farm_side_yard", "Farm Side Yard", 22, 0, 20, {
    exits: w([
      F.createExit(
        Directions.North,
        "farm_front_path",
        8,
        "You exit the mouth of the driveway, arriving back at the main road."
      )
    ]),
    items: w([F.createItem("handwarmers", 1)]),
    temperature: w(Temperatures.Cold)
  })
];
