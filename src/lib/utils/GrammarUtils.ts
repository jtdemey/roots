const vowels: string[] = ["a", "e", "i", "o", "u"];

export const addAOrAn = (word: string): string =>
  vowels.some((vowel: string) => word[0].toLocaleLowerCase() === vowel)
    ? `an ${word}`
    : `a ${word}`;
