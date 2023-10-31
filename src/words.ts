import * as path from 'path';
import * as fs from 'fs';

function readWordsFromFile(filename: string, length: number, count: number): string[] {
  const filePath = path.join(__dirname, filename);
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    
    const words = content.split(' ').map(word => word.replace(/[^a-zA-Z]/g, ''));

    // Filtrar palavras com o comprimento especificado e manter apenas as únicas
    const uniqueWords = new Set<string>();
    words.forEach(word => {
      if (word.length <= length) {
        uniqueWords.add(word);
      }
    });

    // Convertemos o Set de volta para um array
    const uniqueWordsArray = Array.from(uniqueWords);

    // Embaralhar o array de palavras aleatoriamente
    for (let i = uniqueWordsArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [uniqueWordsArray[i], uniqueWordsArray[j]] = [uniqueWordsArray[j], uniqueWordsArray[i]];
    }

    // Pegar o número especificado de palavras após o embaralhamento
    return uniqueWordsArray.slice(0, count);
  } catch (error) {
    console.error(`Error reading file "${filePath}": ${error.message}`);
    return [];
  }
}


// Lê aleatoriamente 12 palavras de até 6 caracteres do arquivo "palavras.txt"
const numberOfWordsToRead = 12;
const wordLength = 6;
const words: string[] = readWordsFromFile('palavras.txt', wordLength, numberOfWordsToRead);

if (words.length > 0) {
  console.log(words);
} else {
  console.log('No words were read from the file.');
}




