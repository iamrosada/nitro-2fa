export function getRandomTransformation(): string {
  const availableTransformations: string[] = [
    "remove-vowels",
    "count-vowels",
    "count-consonants",
    "reverse",
  ];
  const randomIndex: number = Math.floor(
    Math.random() * availableTransformations.length
  );
  return availableTransformations[randomIndex];
}
