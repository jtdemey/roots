const vowels: string[] = ["a", "e", "i", "o", "u"];

export const addAOrAn = (word: string): string =>
  vowels.some((vowel: string) => word[0].toLocaleLowerCase() === vowel)
    ? `an ${word}`
    : `a ${word}`;

export const toColloquialList = (words: string[]): string => {
  if (words.length < 1) return "";
  if (words.length === 1) return words[0];
  if (words.length === 2) return `${words[0]} and ${words[1]}`;
  return words.slice(0, -1).map((str: string) => `${str}, `).join("")
    + `and ${words[words.length - 1]}`;
};
