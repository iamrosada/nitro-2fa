

// Sample secret words
const secretWords = [
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
  "nectarine",
  "orange",
  "papaya",
  "quince",
  "raspberry",
  "strawberry",
  "tangerine",
  "watermelon",
  "pineapple"
];

// Function to transform a word
function transformWord(word, transformations) {
  let transformedWord = word;

  for (const transformation of transformations) {
    switch (transformation) {
      case "remove-vowels":
        transformedWord = transformedWord.replace(/[aeiou]/gi, "");
        break;
      // Add more transformation rules as needed
    }

    switch (transformation) {
      case "remove-vowels":
        return word.replace(/[aeiou]/gi, "");
      case "count-vowels":
        return word.match(/[aeiou]/gi).length;
      case "count-consonants":
        return word.match(/[b-df-hj-np-tv-z]/gi).length;
      case "reverse":
        return word.split('').reverse().join('');
      default:
        return word;
    }
  }

  return transformedWord;
}

// Sample user data
const users = [
  {
    username: "user1",
    secretWords: getRandomWords(5) // Get 5 random words
  }
];

// Function to get random words from the secretWords array and apply random transformations
function getRandomWords(count) {
  const randomWords = [];
  const shuffledWords = [...secretWords]; // Create a copy to shuffle

  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * shuffledWords.length);
    const randomWord = shuffledWords.splice(randomIndex, 1)[0];

    // Apply random transformations to the word
    const transformations = getRandomTransformations();
    const transformedWord = transformWord(randomWord, transformations);

    randomWords.push(transformedWord);
  }

  return randomWords;
}

// Function to get a random set of transformations
function getRandomTransformations() {
  const availableTransformations = ["remove-vowels"];
  const transformations = [];
  const numTransformations = Math.floor(Math.random() * availableTransformations.length) + 1;

  for (let i = 0; i < numTransformations; i++) {
    const randomIndex = Math.floor(Math.random() * availableTransformations.length);
    transformations.push(availableTransformations[randomIndex]);
  }

  return transformations;
}

