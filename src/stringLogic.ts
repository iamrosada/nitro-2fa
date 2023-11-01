export function removeVowels(word: string): string {
  return word.replace(/[aeiouAEIOU]/g, '');
}

export function countVowels(word: string): string {
  const count = word.match(/[aeiouAEIOU]/g)?.length || 0;
  const countStr = String(count)
  return countStr;
}

export function countConsonants(word: string): string {
  const consonants = word.match(/[b-df-hj-np-tv-z]/gi)?.join("") || "";
  return consonants;
}

export function reverseWord(word: string): string {
  return word.split("").reverse().join("");
}
