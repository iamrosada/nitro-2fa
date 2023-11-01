import {
  transformWordsToFiveCharacters,
  encryptWords,
  decryptWords,
  separateWords,
} from "./nitroEncryption";
import { readWordsFromFile } from "./readWordsFromFile";
import { transformWord } from "./transformWord";
import { getRandomTransformation } from "./getRandomTransformation";
import { provideUserWords } from "./provideUserWords";

const WORD_LENGTH_LIMIT = 6;
const NUM_WORDS_TO_READ = 12;

export async function chooseWordSource(config: {
  sourceType: "file" | "array" | "user";
  userWords?: string[] | string;
  userPassword: string;
}): Promise<{ wordsArray: string[]; encryptedData: string }> {
  return new Promise(async (resolve, reject) => {
    if (config.sourceType === "file") {
      try {
        const wordsFromFile = await readWordsFromFile(
          "palavras.txt",
          WORD_LENGTH_LIMIT,
          NUM_WORDS_TO_READ,
        );

        if (wordsFromFile.length > 0) {
          const transformedWords: string[] =
            transformWordsToFiveCharacters(wordsFromFile);
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
        config.userPassword
      );
      const decryptedData: string = decryptWords(
        encryptedData,
        config.userPassword 
      );
      const wordLength = 5;
      const wordsArray = separateWords(decryptedData, wordLength);

      resolve({ wordsArray, encryptedData });
    } else if (config.sourceType === "user") {
      if (config.userPassword) {
        try {
          const userWords = await provideUserWords(config.userWords, config.userPassword);
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


export function createNitro2FAContext() {
  const context = {
    _words: [],
    randomIndex: 0,
    selectedTransformation: '',
    wordToTransform: '',
  };
  console.info(context)
  context.randomIndex = Math.floor(Math.random() * 12);
  context.selectedTransformation = getRandomTransformation();

  function getRandomTransformation() {
    const transformations = ["remove-vowels", "count-vowels", "count-consonants", "reverse"];
    return transformations[Math.floor(Math.random() * transformations.length)];
  }

  function displayTransformationInfo() {

    const word = context.wordToTransform;
    const transformation = context.selectedTransformation;
    const randomIndex = context.randomIndex;


    console.log(transformation,"transformation")
    switch (transformation) {
      case "remove-vowels":
        return `IF I REMOVE THE VOWELS FROM THE WORD IN THIS POSITION ${randomIndex + 1}, IT WILL BE: ${word}`;
      case "count-vowels":
        return `IF I COUNT THE VOWELS IN THE WORD IN THIS POSITION ${randomIndex + 1}, THE VALUE IS: ${word}`;
      case "count-consonants":
        return `IF I REMOVE THE VOWELS IN THE WORD IN THIS POSITION ${randomIndex + 1}, THE VALUE IS: ${word}`;
      case "reverse":
        return `IF THE WORD IN POSITION ${randomIndex + 1} IS REVERSED, IT WILL BE: ${word}`;
      default:
        return '';
    }
  }

  function nitro2FA(words, userAnswer) {
    context._words = words;


    const wordToTransform = words[context.randomIndex];
    const transformedValue = transformWord(wordToTransform, context.selectedTransformation);

    console.log(userAnswer,"userAnswer", "transformedWord",transformedValue)
    if (userAnswer.toLowerCase()  === transformedValue.toLowerCase()) {
      return { status: "Correct" };
    } else {
      return { status: "Incorrect" };
    }
  }

  return {
    displayTransformationInfo,
    nitro2FA,
    
  };
}