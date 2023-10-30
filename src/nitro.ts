import * as readline from "readline";
import {
  transformWordsToFiveCharacters,
  encryptWords,
  decryptWords,
  separateWords,
} from "./nitroEncryption";
import { readWordsFromFile } from "./readWordsFromFile";
import { displayTransformationInfo } from "./displayTransformationInfo";
import { transformWord } from "./transformWord";
import { getRandomTransformation } from "./getRandomTransformation";
import { provideUserWords } from "./provideUserWords";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const WORD_LENGTH_LIMIT = 6;
const NUM_WORDS_TO_READ = 12;
const PASSWORD = "minhaSenhaSecreta";

export async function chooseWordSource(config: {
  sourceType: "file" | "array" | "user";
  userWords?: string[] | string;
}): Promise<string[]> {
  return new Promise((resolve, reject) => {
    if (config.sourceType === "file") {
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
    } else if (config.sourceType === "array") {
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
    } else if (config.sourceType === "user") {
      return provideUserWords(config.userWords);
    } else {
      reject(new Error('Invalid source. Choose "file" or "array".'));
    }
  });
}

export function nitro2FA(words, userAnswer) {
  return new Promise((resolve, reject) => {
    const randomIndex = Math.floor(Math.random() * words.length);
    const wordToTransform = words[randomIndex];
    const selectedTransformation = getRandomTransformation(); // Choose a random transformation

    console.log(`Word: ${wordToTransform}`);
    displayTransformationInfo(wordToTransform, selectedTransformation, randomIndex);

    const transformedValue = transformWord(wordToTransform, selectedTransformation);
    const transformedWord =
      typeof transformedValue === 'string' ? transformedValue.toLowerCase() : transformedValue;
    const transformedWords = (transformedWord as string).toLowerCase();

    if (userAnswer.toLowerCase() === transformedWords) {
      console.log('Your answer is correct!');
      resolve('Correct');
    } else {
      console.log('Your answer is incorrect. The correct answer is:', transformedValue);
      reject('Incorrect');
    }

    resolve('Game over');
  });
}


