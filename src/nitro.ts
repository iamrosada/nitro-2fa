
const secretWords: string[] = [
  "apple",
  "banana",
  "cherry",
  "date",
  "elderberry",
  "fig",
  "grape",
  "honeydew",
  "kiwi",
  "lemon",
  "mango",
  "pineapple"
];

function transformWord(word: string, transformation: string): string | number {
  let transformedWord: string | number = word;

  switch (transformation) {
    case "remove-vowels":
      transformedWord = (transformedWord as string).replace(/[aeiou]/gi, "");
      break;
    case "count-vowels":
      transformedWord = (transformedWord as string).match(/[aeiou]/gi)?.length || 0;
      break;
    case "count-consonants":
      transformedWord = (transformedWord as string).match(/[b-df-hj-np-tv-z]/gi)?.length || 0;
      break;
    case "reverse":
      transformedWord = (transformedWord as string).split('').reverse().join('');
      break;
    default:
      break;
  }

  return transformedWord;
}

function getRandomIndex() {
  return Math.floor(Math.random() * secretWords.length);
}

function getRandomTransformation() {
  const availableTransformations: string[] = ["remove-vowels", "count-vowels", "count-consonants", "reverse"];
  const randomIndex: number = Math.floor(Math.random() * availableTransformations.length);
  return availableTransformations[randomIndex];
}

const randomIndex = getRandomIndex();
const wordToTransform = secretWords[randomIndex];
const selectedTransformation = getRandomTransformation();

console.log(`Na lista de 12 palavras, a palavra número ${randomIndex + 1}, "${wordToTransform}", após a transformação "${selectedTransformation}" fica:`);

const transformedWord = transformWord(wordToTransform, selectedTransformation);
console.log(transformedWord);


