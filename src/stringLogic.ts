export function removeVowels(word: string): string {
  return word.replace(/[aeiou]/gi, "");
}

export function countVowels(word: string): string {
  const count = (word.match(/[aeiou]/gi) || []).length;
  return `Number of vowels: ${count}`;
}

export function countConsonants(word: string): string {
  const consonants = (word.match(/[b-df-hj-np-tv-z]/gi) || []).join("");
  const convertNumberToString = String(consonants);
  return `Consonants: ${convertNumberToString}`;
}

export function reverseWord(word: string): string {
  return word.split("").reverse().join("");
}
