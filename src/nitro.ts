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

const WORD_LENGTH_LIMIT = 6;
const NUM_WORDS_TO_READ = 12;

export async function chooseWordSource(config: {
  sourceType: "file" | "array" | "user";
  userWords?: string[] | string;
  userPassword?: string;
}): Promise<{ wordsArray: string[]; encryptedData: string }> {
  return new Promise(async (resolve, reject) => {
    if (config.sourceType === "file") {
      try {
        const wordsFromFile = await readWordsFromFile(
          "palavras.txt",
          WORD_LENGTH_LIMIT,
          NUM_WORDS_TO_READ,
          config.userPassword === undefined ? "" : config.userPassword
        );

        if (wordsFromFile.length > 0) {
          const transformedWords: string[] =
            transformWordsToFiveCharacters(wordsFromFile);
          const concatenatedWords: string = transformedWords.join("");
          const encryptedData: string = encryptWords(
            concatenatedWords,
            config.userPassword === undefined ? "" : config.userPassword
          );
          const decryptedData: string = decryptWords(
            encryptedData,
            config.userPassword === undefined ? "" : config.userPassword
          );
          const wordLength = 5;
          const wordsArray = separateWords(decryptedData, wordLength);

          resolve({ wordsArray, encryptedData });
        } else {
          reject(new Error("No words were read from the file."));
        }
      } catch (error) {
        reject(error);
      }
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
      const concatenatedWords: string = transformedWords.join("");
      const encryptedData: string = encryptWords(
        concatenatedWords,
        config.userPassword === undefined ? "" : config.userPassword
      );
      const decryptedData: string = decryptWords(
        encryptedData,
        config.userPassword === undefined ? "" : config.userPassword
      );
      const wordLength = 5;
      const wordsArray = separateWords(decryptedData, wordLength);

      resolve({ wordsArray, encryptedData });
    } else if (config.sourceType === "user") {
      if (config.userPassword) {
        try {
          const userWords = await provideUserWords(config.userWords);
          const transformedWords: string[] =
            transformWordsToFiveCharacters(userWords);
          const concatenatedWords: string = transformedWords.join("");
          const encryptedData: string = encryptWords(
            concatenatedWords,
            config.userPassword
          );
          const decryptedData: string = decryptWords(
            encryptedData,
            config.userPassword
          );
          const wordLength = 5;
          const wordsArray = separateWords(decryptedData, wordLength);

          resolve({ wordsArray, encryptedData });
        } catch (error) {
          reject(error);
        }
      } else {
        reject(
          new Error('User password is required for the "user" source type.')
        );
      }
    } else {
      reject(new Error('Invalid source. Choose "file" or "array".'));
    }
  });
}

/**
 * Generates a random index, selected transformation, and associated transformation message.
 * @param {string[]} words - An array of words.
 * @returns {{randomIndex: number, message: string, selectedTransformation: string}} - An object with random index, message, and transformation.
 */
export function randomIndexSelected(words) {
  const randomIndex = Math.floor(Math.random() * words.length);
  const selectedTransformation = getRandomTransformation(); // Choose a random transformation
  const wordToTransform = words[randomIndex];

  const message = displayTransformationInfo(
    wordToTransform,
    selectedTransformation,
    randomIndex
  );

  return { randomIndex, message, selectedTransformation };
}

/**
 * Perform a Nitro 2FA challenge.
 * @param {string[]} words - An array of words.
 * @param {string} userAnswer - User's answer to the challenge.
 * @returns {Promise<{ message: string, status: string }>} - A promise that resolves with the transformation message and status.
 */
export function nitro2FA(words, userAnswer) {
  return new Promise((resolve, reject) => {
    try {
      const result = randomIndexSelected(words);
      const wordToTransform = words[result.randomIndex];
      const transformedValue = transformWord(
        wordToTransform,
        result.selectedTransformation
      );
      const transformedWord =
        typeof transformedValue === "string"
          ? transformedValue.toLowerCase()
          : transformedValue;
      const transformedWords = (transformedWord as string).toLowerCase();

      if (userAnswer.toLowerCase() === transformedWords) {
        resolve({
          message: result.message,
          status: "Correct",
        });
      } else {
        resolve({
          message: result.message,
          status: "Incorrect",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
}



