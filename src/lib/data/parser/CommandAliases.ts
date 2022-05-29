export const CommandAliases: any = {
  attack: ["fight", "hit", "assault", "bonk"],
  eat: [
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
  ],
  equip: [
    "adorn",
    "arm",
    "don",
    "dress",
    "endow",
    "fit",
    "furnish",
    "gear",
    "wear"
  ],
  examine: [
    "gander",
    "look",
    "perceive",
    "peruse",
    "search",
    "where",
    "whereami"
  ],
  go: [
    "cross",
    "leave",
    "migrate",
    "move",
    "proceed",
    "progress",
    "relocate",
    "travel",
    "walk"
  ],
  throw: [
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
};

export const isAlias = (word: string, comparator: string) =>
	word === comparator ||
	(CommandAliases[word] !== undefined &&
		CommandAliases[word].indexOf(comparator) > -1);