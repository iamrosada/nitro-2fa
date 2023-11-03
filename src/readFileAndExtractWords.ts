import * as fs from 'fs';
import * as path from 'path';

import {
  transformWordsToFiveCharacters,
  encryptWords,
  decryptWords,
  separateWords,
} from './nitroEncryption';

async function readFileAndExtractWords(
  filePath: string,
  userPassword: string
): Promise<string[]> {
  try {
    const content = await fs.promises.readFile(filePath, 'utf-8');
    const words = content
      .split(/\s+/)
      .filter((word) => word.match(/^[a-zA-Z]+$/));

    const transformedWords: string[] = transformWordsToFiveCharacters(words);

    const concatenatedWords: string = transformedWords.join('');
    const encryptedData: string = encryptWords(concatenatedWords, userPassword);
    const decryptedData: string = decryptWords(encryptedData, userPassword);
    const wordLength = 5;
    const wordsArray = separateWords(decryptedData, wordLength);

    return wordsArray;
  } catch (error) {
    throw error;
  }
}

export { readFileAndExtractWords };
