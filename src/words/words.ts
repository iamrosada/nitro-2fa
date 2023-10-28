import * as crypto from 'crypto';
import * as fs from 'fs';

function readWordsFromFile(filename: string, count: number): string[] {
  const content = fs.readFileSync(filename, 'utf-8');
  const words = content.split('\n').map(word => word.trim());

  // Embaralhar o array de palavras aleatoriamente
  for (let i = words.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [words[i], words[j]] = [words[j], words[i]];
  }

  // Pegar o número especificado de palavras após o embaralhamento
  return words.slice(0, count);
}

// Lê aleatoriamente 12 palavras do arquivo "palavras.txt"
const numberOfWordsToRead = 12;
export const words: string[] = readWordsFromFile('palavras.txt', numberOfWordsToRead);


