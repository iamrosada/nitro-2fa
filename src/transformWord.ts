import { countConsonants, countVowels, removeVowels, reverseWord } from "./stringLogic";

export function transformWord(word: string, transformation: string): string {
  switch (transformation) {
    case "remove-vowels":
      return removeVowels(word);
    case "count-vowels":
      return countVowels(word);
    case "count-consonants":
      return countConsonants(word);
    case "reverse":
      return reverseWord(word);
    default:
      console.error(`Unknown transformation: ${transformation}. Returning the original word.`);
      return word;
  }
}



