export function getRandomTransformation() {
  const transformations = ["remove-vowels", "count-vowels", "count-consonants", "reverse"];
  return transformations[Math.floor(Math.random() * 4)];
}
