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


/**
 * Chooses the word source based on the specified configuration.
 * created by iamrosada 
 * @param {object} config - The configuration object.
 * @param {string} config.sourceType - The source type ("file", "array", or "user").
 * @param {string[] | string} config.userWords - An optional array of user-provided words or a single string.
 * @param {string} config.userPassword - The user's password.
 *
 * @returns {Promise<{ wordsArray: string[], encryptedData: string }>} A promise that resolves to an object containing the words array and encrypted data.
 */
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

/**
 * Performs a Nitro 2FA authentication check.
 * created by iamrosada
 * 
 * @param {string[]} words - An array of words to choose a word for transformation.
 * @param {string | number} userAnswer - The user's answer, which can be a string or a number.
 *
 * @returns {Object} An object describing the verification status.
 * @property {string} status - The verification status (can be "Correct" or "Incorrect").
 * @property {string} newQuestion - The new question to display if the user's answer is incorrect.
 */
export function createNitro2FAContext() {
  const context = {
    _words: [] as string[],
    randomIndex: 0,
    selectedTransformation: '',
    wordToTransform: '',
  };
  context.randomIndex = Math.floor(Math.random() * 12);
  context.selectedTransformation = getRandomTransformation();


/**
 * Display information about the transformation.
 * created by iamrosada
 * @param {string} word - The word to transform.
 * @param {string} transformation - The selected transformation.
 * @param {number} randomIndex - The random index.
 *
 * @returns {string} Information about the transformation.
 */
  function displayTransformationInfo() {

    const word = context.wordToTransform;
    const transformation = context.selectedTransformation;
    const randomIndex = context.randomIndex;
    switch (transformation) {
      case "remove-vowels":
        return `IF I REMOVE THE VOWELS FROM THE WORD IN THIS POSITION ${randomIndex + 1}, IT WILL BE: ${word}`;
      case "count-vowels":
        return `IF I COUNT THE VOWELS IN THE WORD IN THIS POSITION ${randomIndex + 1}, THE VALUE IS: ${word}`;
      case "count-consonants":
        return `IF I COUNT THE CONSONANTS IN THE WORD IN THIS POSITION ${randomIndex + 1}, THE VALUE IS: ${word}`;
      case "reverse":
        return `IF THE WORD IN POSITION ${randomIndex + 1} IS REVERSED, IT WILL BE: ${word}`;
      default:
        return '';
    }    
  }

  /**
 * Performs a Nitro 2FA authentication check.
 * created by iamrosada
 * 
 * @param {string[]} words - An array of words to choose a word for transformation.
 * @param {string | number} userAnswer - The user's answer, which can be a string or a number.
 *
 * @returns {Object} An object describing the verification status.
 * @property {string} status - The verification status (can be "Correct" or "Incorrect").
 * @property {string} newQuestion - The new question to display if the user's answer is incorrect.
 */
  async function nitro2FA(words: string[], userAnswer: string | number): Promise<{ status: string, newQuestion?: string }> {
  
    context._words = words;
    const wordToTransform = words[context.randomIndex];
    const transformedValue = transformWord(wordToTransform, context.selectedTransformation);
    const wordToString = typeof transformedValue === 'number' ? String(transformedValue) : transformedValue;

    const answerToString = typeof userAnswer === 'number' ? String(userAnswer) : userAnswer;
    
    if (answerToString.toLowerCase() === wordToString.toLowerCase()) {
      return { status: "Correct" };
    } else {
      console.log("User's answer is incorrect. Providing a new question.");
      // Generate a new random index and transformation
      context.randomIndex = Math.floor(Math.random() * 12);
      context.selectedTransformation = getRandomTransformation();
     
      // Display the new question
      return { status: "Incorrect", newQuestion: displayTransformationInfo() };
    }
  }
  
  
  
  return {
    displayTransformationInfo,
    nitro2FA,
    
  };
}