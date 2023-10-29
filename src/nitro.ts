
import * as readline from 'readline';
import * as path from 'path';
import * as fs from 'fs';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function readWordsFromFile(filename: string, length: number, count: number): string[] {
  const filePath = path.join(__dirname, filename);
  try {
    const content = fs.readFileSync(filePath, 'utf-8');

    const words = content.split(' ').map(word => word.replace(/[^a-zA-Z]/g, ''));

    // Filter words by length and keep only unique ones
    const uniqueWords = new Set<string>();
    words.forEach(word => {
      if (word.length <= length) {
        uniqueWords.add(word);
      }
    });

    // Convert the Set back to an array
    const uniqueWordsArray = Array.from(uniqueWords);

    // Shuffle the array of words randomly
    for (let i = uniqueWordsArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [uniqueWordsArray[i], uniqueWordsArray[j]] = [uniqueWordsArray[j], uniqueWordsArray[i]];
    }

    // Get the specified number of words after shuffling
    return uniqueWordsArray.slice(0, count);
  } catch (error) {
    console.error(`Error reading file "${filePath}": ${error.message}`);
    return [];
  }
}


function chooseWordSource(source: 'file' | 'array'): string[] {
  if (source === 'file') {
    // Read words from a file
    const numberOfWordsToRead = 12;
    const wordLength = 6;
    return readWordsFromFile('palavras.txt', wordLength, numberOfWordsToRead);
  } else if (source === 'array') {
    // Define your array of words here
    return [
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
  } else {
    return [];
  }
}

function transformWord(word: string, transformation: string): string {
  switch (transformation) {
    case "remove-vowels":
      return word.replace(/[aeiou]/gi, "");
    case "count-vowels":
      const count = (word.match(/[aeiou]/gi) || []).length;
      return `Number of vowels: ${count}`;
    case "count-consonants":
      const consonants = (word.match(/[b-df-hj-np-tv-z]/gi) || []).join('');
      return `Consonants: ${consonants}`;
    case "reverse":
      return word.split('').reverse().join('');
    default:
      return word;
  }
}

function getRandomTransformation(): string {
  const availableTransformations: string[] = ["remove-vowels", "count-vowels", "count-consonants", "reverse"];
  const randomIndex: number = Math.floor(Math.random() * availableTransformations.length);
  return availableTransformations[randomIndex];
}

function displayTransformationInfo(word: string, transformation: string, randomIndex: number) {
  switch (transformation) {
    case "remove-vowels":
      console.log(`IF I REMOVE THE VOWELS FROM THE WORD IN THIS POSITION ${randomIndex + 1}, IT WILL BE: ${word}`);
      break;
    case "count-vowels":
      console.log(`IF I COUNT THE VOWELS IN THE WORD IN THIS POSITION ${randomIndex + 1}, THE VALUE IS: ${word}`);
      break;
    case "count-consonants":
      console.log(`IF I COUNT THE CONSONANTS IN THE WORD IN THIS POSITION ${randomIndex + 1}, THE VALUE IS: ${word}`);
      break;
    case "reverse":
      console.log(`IF THE WORD IN POSITION ${randomIndex + 1} IS REVERSED, IT WILL BE: ${word}`);
      break;
    default:
      break;
  }
}

function playGame(words: string[]) {
  const randomIndex = Math.floor(Math.random() * words.length);
  const wordToTransform = words[randomIndex];
  const selectedTransformation = getRandomTransformation(); // Choose a random transformation

  console.log(`Word: ${wordToTransform}`);
  displayTransformationInfo(wordToTransform, selectedTransformation, randomIndex);

  rl.question('Enter your answer: ', (answer) => {
    const transformedValue = transformWord(wordToTransform, selectedTransformation);
    const transformedWord = typeof transformedValue === 'string' ? transformedValue.toLowerCase() : transformedValue;

    if (answer.toLowerCase() === transformedWord) {
      console.log("Your answer is correct!");
    } else {
      console.log("Your answer is incorrect. The correct answer is:", transformedValue);
    }

    rl.question('Do you want to play again? (yes/no): ', (playAgain) => {
      if (playAgain.toLowerCase() === 'yes') {
        playGame(words);
      } else {
        rl.close();
      }
    });
  });
}

function startGame() {
  rl.question('Choose the source of words (file/array): ', (source) => {
    if (source === 'file' || source === 'array') {
      const words = chooseWordSource(source);
      if (words.length > 0) {
        playGame(words);
      } else {
        console.log('No words were read or provided.');
      }
    } else {
      console.log('Invalid source. Choose "file" or "array".');
    }
  });
}

startGame();

// import * as readline from 'readline';
// import * as path from 'path';
// import * as fs from 'fs';

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });

// function readWordsFromFile(filename: string, length: number, count: number): string[] {
//   const filePath = path.join(__dirname, filename);
//   try {
//     const content = fs.readFileSync(filePath, 'utf-8');

//     const words = content.split(' ').map(word => word.replace(/[^a-zA-Z]/g, ''));

//     // Filter words by length and keep only unique ones
//     const uniqueWords = new Set<string>();
//     words.forEach(word => {
//       if (word.length <= length) {
//         uniqueWords.add(word);
//       }
//     });

//     // Convert the Set back to an array
//     const uniqueWordsArray = Array.from(uniqueWords);

//     // Shuffle the array of words randomly
//     for (let i = uniqueWordsArray.length - 1; i > 0; i--) {
//       const j = Math.floor(Math.random() * (i + 1));
//       [uniqueWordsArray[i], uniqueWordsArray[j]] = [uniqueWordsArray[j], uniqueWordsArray[i]];
//     }

//     // Get the specified number of words after shuffling
//     return uniqueWordsArray.slice(0, count);
//   } catch (error) {
//     console.error(`Error reading file "${filePath}": ${error.message}`);
//     return [];
//   }
// }

// function chooseWordSource(source: 'file' | 'array'): string[] {
//   if (source === 'file') {
//     // Read words from a file
//     const numberOfWordsToRead = 12;
//     const wordLength = 6;
//     return readWordsFromFile('palavras.txt', wordLength, numberOfWordsToRead);
//   } else if (source === 'array') {
//     // Define your array of words here
//     return [
//       "apple",
//       "banana",
//       "cherry",
//       "date",
//       "elderberry",
//       "fig",
//       "grape",
//       "honeydew",
//       "kiwi",
//       "lemon",
//       "mango",
//       "pineapple"
//     ];
//   } else {
//     return [];
//   }
// }

// function transformWord(word: string, transformation: string): string {
//   switch (transformation) {
//     case "remove-vowels":
//       return word.replace(/[aeiou]/gi, "");
//     case "count-vowels":
//       const count = (word.match(/[aeiou]/gi) || []).length;
//       return `Number of vowels: ${count}`;
//     case "count-consonants":
//       const consonants = (word.match(/[b-df-hj-np-tv-z]/gi) || []).join('');
//       return `Consonants: ${consonants}`;
//     case "reverse":
//       return word.split('').reverse().join('');
//     default:
//       return word;
//   }
// }

// function getRandomTransformation(): string {
//   const availableTransformations: string[] = ["remove-vowels", "count-vowels", "count-consonants", "reverse"];
//   const randomIndex: number = Math.floor(Math.random() * availableTransformations.length);
//   return availableTransformations[randomIndex];
// }

// function displayTransformationInfo(word: string, transformation: string) {
//   switch (transformation) {
//     case "remove-vowels":
//       console.log(`If I remove the vowels from the word "${word}", it will be:`);
//       break;
//     case "count-vowels":
//       console.log(`If I count the vowels in the word "${word}", the value is:`);
//       break;
//     case "count-consonants":
//       console.log(`If I count the consonants in the word "${word}", the value is:`);
//       break;
//     case "reverse":
//       console.log(`If the word "${word}" is reversed, it will be:`);
//       break;
//     default:
//       break;
//   }
// }

// function playGame(words: string[]) {
//   const randomIndex = Math.floor(Math.random() * words.length);
//   const wordToTransform = words[randomIndex];
//   const selectedTransformation = getRandomTransformation(); // Choose a random transformation

//   console.log(`Word: ${wordToTransform}`);
//   displayTransformationInfo(wordToTransform, selectedTransformation);

//   rl.question('Enter your answer: ', (answer) => {
//     const transformedValue = transformWord(wordToTransform, selectedTransformation);
//     const transformedWord = typeof transformedValue === 'string' ? transformedValue.toLowerCase() : transformedValue;

//     if (answer.toLowerCase() === transformedWord) {
//       console.log("Your answer is correct!");
//     } else {
//       console.log("Your answer is incorrect. The correct answer is:", transformedValue);
//     }

//     rl.question('Do you want to play again? (yes/no): ', (playAgain) => {
//       if (playAgain.toLowerCase() === 'yes') {
//         playGame(words);
//       } else {
//         rl.close();
//       }
//     });
//   });
// }

// function startGame() {
//   rl.question('Choose the source of words (file/array): ', (source) => {
//     if (source === 'file' || source === 'array') {
//       const words = chooseWordSource(source);
//       if (words.length > 0) {
//         playGame(words);
//       } else {
//         console.log('No words were read or provided.');
//       }
//     } else {
//       console.log('Invalid source. Choose "file" or "array".');
//     }
//   });
// }

// startGame();
