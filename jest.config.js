/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
const config = {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.svelte$": [
      "svelte-jester",
      {
        preprocess: "./svelte.config.js"
      }
    ],
    "^.+\\.ts$": "ts-jest",
    "^.+\\.js$": "ts-jest"
  },
  moduleFileExtensions: ["js", "ts", "svelte"],
  moduleNameMapper: {
    "^\\$lib(.*)$": "<rootDir>/src/lib$1",
    "^\\$app(.*)$": [
      "<rootDir>/.svelte-kit/dev/runtime/app$1",
      "<rootDir>/.svelte-kit/build/runtime/app$1"
    ]
  }
};

export default config;
