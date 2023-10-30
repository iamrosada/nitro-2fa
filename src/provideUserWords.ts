import { decryptWords, encryptWords, separateWords, transformWordsToFiveCharacters } from "./nitroEncryption";
import { readFileAndExtractWords } from "./readFileAndExtractWords";

const PASSWORD = "minhaSenhaSecreta";

export function provideUserWords(
  userWords: string[] | string = []
): Promise<string[]> {
  if (Array.isArray(userWords)) {
    const transformedWords: string[] =
      transformWordsToFiveCharacters(userWords);
    const concatenatedWords: string = transformedWords.join("");
    const encryptedData: string = encryptWords(concatenatedWords, PASSWORD);
    const decryptedData: string = decryptWords(encryptedData, PASSWORD);
    const wordLength = 5;
    const wordsArray = separateWords(decryptedData, wordLength);
    return Promise.resolve(wordsArray);
  } else if (typeof userWords === "string") {
    // Load words from the provided file path
    return readFileAndExtractWords(userWords);
  } else {
    return Promise.reject(
      new Error(
        "Invalid input. Please provide an array of words or a file path."
      )
    );
  }
}
