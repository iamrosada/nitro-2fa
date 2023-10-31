import path from "path";
import * as fs from "fs";
import { encryptWords, decryptWords } from "./nitroEncryption";

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
export {readWordsFromFile}

