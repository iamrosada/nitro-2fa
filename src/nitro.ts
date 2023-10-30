import * as readline from "readline";
import * as path from "path";
import {
  transformWordsToFiveCharacters,
  encryptWords,
  decryptWords,
  separateWords,
} from "./aes-encryption";
import * as fs from "fs";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const WORD_LENGTH_LIMIT = 6;
const NUM_WORDS_TO_READ = 12;
const PASSWORD = "minhaSenhaSecreta";

async function readWordsFromFile(
  filename: string,
  length: number,
  count: number,
  senha: string
): Promise<string[]> {
  const filePath = path.join(__dirname, filename);

  try {
    const content = await promisifiedReadFile(filePath, "utf-8");

    const words = content
      .split(" ")
      .map((word) => word.replace(/[^a-zA-Z]/g, ""));
    const uniqueWords = new Set<string>();

    words.forEach((word) => {
      if (word.length <= length) {
        uniqueWords.add(word);
      }
    });

    const uniqueWordsArray = Array.from(uniqueWords).sort(
      () => Math.random() - 0.5
    );
    const wordsToPlay = uniqueWordsArray.slice(0, count);

    const concatenatedWords: string = wordsToPlay.join("");
    const encryptedData: string = encryptWords(concatenatedWords, senha);
    console.log("Dados criptografados:", encryptedData);

    const decryptedData: string = decryptWords(encryptedData, senha);
    console.log("Dados descriptografados:", decryptedData);

    return wordsToPlay;
  } catch (error) {
    console.error(`Error reading file "${filePath}": ${error.message}`);
    return [];
  }
}

async function promisifiedReadFile(
  filePath: string,
  encoding: BufferEncoding
): Promise<string> {
  try {
    const content = await fs.promises.readFile(filePath, { encoding });
    return content;
  } catch (error) {
    throw error;
  }
}
function chooseWordSource(source: "file" | "array"): Promise<string[]> {
  return new Promise((resolve, reject) => {
    if (source === "file") {
      readWordsFromFile(
        "palavras.txt",
        WORD_LENGTH_LIMIT,
        NUM_WORDS_TO_READ,
        PASSWORD
      )
        .then((wordsFromFile) => {
          if (wordsFromFile.length > 0) {
            const transformedWords: string[] =
              transformWordsToFiveCharacters(wordsFromFile);
            console.log(transformedWords);
            const concatenatedWords: string = transformedWords.join("");
            const encryptedData: string = encryptWords(
              concatenatedWords,
              PASSWORD
            );
            const decryptedData: string = decryptWords(encryptedData, PASSWORD);
            const wordLength = 5;
            const wordsArray = separateWords(decryptedData, wordLength);
            resolve(wordsArray);
          } else {
            reject(new Error("No words were read from the file."));
          }
        })
        .catch((error) => {
          reject(error);
        });
    } else if (source === "array") {
      const words = [
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
        "pineapple",
      ];
      const transformedWords: string[] = transformWordsToFiveCharacters(words);
      console.log(transformedWords);

      const concatenatedWords: string = transformedWords.join("");

      // Encrypt and decrypt using encryptWords and decryptWords functions
      const encryptedData: string = encryptWords(concatenatedWords, PASSWORD);
      console.log("Dados criptografados:", encryptedData);

      const decryptedData: string = decryptWords(encryptedData, PASSWORD);
      const wordLength = 5;

      const wordsArray = separateWords(decryptedData, wordLength);

      console.log(
        "Dados descriptografados--->:",
        separateWords(decryptedData, wordLength)
      );

      console.log("Dados descriptografados:", decryptedData);

      resolve(wordsArray);
    } else {
      reject(new Error('Invalid source. Choose "file" or "array".'));
    }
  });
}

function transformWord(word: string, transformation: string): string {
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
      return word;
  }
}
function removeVowels(word: string): string {
  return word.replace(/[aeiou]/gi, "");
}

function countVowels(word: string): string {
  const count = (word.match(/[aeiou]/gi) || []).length;
  return `Number of vowels: ${count}`;
}

function countConsonants(word: string): string {
  const consonants = (word.match(/[b-df-hj-np-tv-z]/gi) || []).join("");
  const convertNumberToString = String(consonants)
  return `Consonants: ${convertNumberToString}`;
}

function reverseWord(word: string): string {
  return word.split("").reverse().join("");
}

function getRandomTransformation(): string {
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

function displayTransformationInfo(
  word: string,
  transformation: string,
  randomIndex: number
) {
  switch (transformation) {
    case "remove-vowels":
      console.log(
        `IF I REMOVE THE VOWELS FROM THE WORD IN THIS POSITION ${
          randomIndex + 1
        }, IT WILL BE: ${word}`
      );
      break;
    case "count-vowels":
      console.log(
        `IF I COUNT THE VOWELS IN THE WORD IN THIS POSITION ${
          randomIndex + 1
        }, THE VALUE IS: ${word}`
      );
      break;
    case "count-consonants":
      console.log(
        `IF I REMOVE THE VOWELS IN THE WORD IN THIS POSITION ${
          randomIndex + 1
        }, THE VALUE IS: ${word}`
      );
      break;
    case "reverse":
      console.log(
        `IF THE WORD IN POSITION ${
          randomIndex + 1
        } IS REVERSED, IT WILL BE: ${word}`
      );
      break;
    default:
      break;
  }
}

async function playGame(words: string[]) {
  const randomIndex = Math.floor(Math.random() * words.length);
  const wordToTransform = words[randomIndex];
  const selectedTransformation = getRandomTransformation(); // Choose a random transformation

  console.log(`Word: ${wordToTransform}`);
  displayTransformationInfo(
    wordToTransform,
    selectedTransformation,
    randomIndex
  );

  rl.question("Enter your answer: ", (answer) => {
    const transformedValue = transformWord(
      wordToTransform,
      selectedTransformation
    );
    const transformedWord =
      typeof transformedValue === "string"
        ? transformedValue.toLowerCase()
        : transformedValue;
    const transformedWords = (transformedWord as string).toLowerCase();

    if (answer.toLowerCase() ||answer == transformedWords) {
      console.log("Your answer is correct!");
    } else {
      console.log(
        "Your answer is incorrect. The correct answer is:",
        transformedValue
      );
    }

    rl.question("Do you want to play again? (yes/no): ", (playAgain) => {
      if (playAgain.toLowerCase() === "yes") {
        playGame(words);
      } else {
        rl.close();
      }
    });
  });
}

function startGame() {
  rl.question("Choose the source of words (file/array): ", (source) => {
    if (source === "file" || source === "array") {
      chooseWordSource(source)
        .then((words) => {
          if (words.length > 0) {
            playGame(words);
          } else {
            console.error("No words were read or provided.");
          }
        })
        .catch((error) => {
          console.error(error.message);
        });
    } else {
      console.error('Invalid source. Choose "file" or "array".');
    }
  });
}

startGame();
