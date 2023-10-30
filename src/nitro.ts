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

export function nitro2FA(words, userAnswer) {
  return new Promise((resolve, reject) => {
    const randomIndex = Math.floor(Math.random() * words.length);
    const wordToTransform = words[randomIndex];
    const selectedTransformation = getRandomTransformation(); // Choose a random transformation
    displayTransformationInfo(
      wordToTransform,
      selectedTransformation,
      randomIndex
    );

    const transformedValue = transformWord(
      wordToTransform,
      selectedTransformation
    );
    const transformedWord =
      typeof transformedValue === "string"
        ? transformedValue.toLowerCase()
        : transformedValue;
    const transformedWords = (transformedWord as string).toLowerCase();

    if (userAnswer.toLowerCase() === transformedWords) {
      console.log("Your answer is correct!");
      resolve("Correct");
    } else {
      console.log(
        "Your answer is incorrect. The correct answer is:",
        transformedValue
      );
      reject("Incorrect");
    }

    resolve("Game over");
  });
}
