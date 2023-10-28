import * as crypto from 'crypto';

function transformWordsToFiveCharacters(words: string[]): string[] {
  const vowels = 'aeiou';
  const consonants = 'bcdfghjklmnpqrstvwxyz';

  function getRandomCharacter(characters: string): string {
    const randomIndex = Math.floor(Math.random() * characters.length);
    return characters[randomIndex];
  }

  const transformedWords = words.map((word: string) => {
    if (word.length > 5) {
      // Se a palavra tiver mais de 5 caracteres, corte-a para 5 caracteres
      return word.slice(0, 5);
    } else if (word.length < 5) {
      // Se a palavra tiver menos de 5 caracteres, adicione uma vogal ou consoante aleatória
      const charactersToAdd = 5 - word.length;
      let transformedWord = word;
      for (let i = 0; i < charactersToAdd; i++) {
        const randomCharacter = i % 2 === 0 ? getRandomCharacter(consonants) : getRandomCharacter(vowels);
        transformedWord += randomCharacter;
      }
      return transformedWord;
    } else {
      // Se a palavra já tiver 5 caracteres, não é necessário fazer nada
      return word;
    }
  });

  return transformedWords;
}

const words: string[] = [
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
  "nectarine"
];

const transformedWords: string[] = transformWordsToFiveCharacters(words);
console.log(transformedWords);

const concatenatedWords: string = transformedWords.join('');

// Chave secreta para criptografia e descriptografia
const secretKey: string = 'minhaChaveSecreta'; // Guarde essa chave em um local seguro!

// Gerar um IV (Vetor de Inicialização) para a criptografia
const iv = crypto.randomBytes(16);

// Função para criptografar as palavras após a união
function encryptWordsJoined(joinedWords: string, key: string, iv: Buffer): string {
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
  let encryptedData: string = cipher.update(joinedWords, 'utf8', 'hex');
  encryptedData += cipher.final('hex');
  return encryptedData;
}

// Função para descriptografar as palavras
function decryptWordsJoined(encryptedData: string, key: string, iv: Buffer): string {
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
  let decryptedData: string = decipher.update(encryptedData, 'hex', 'utf8');
  decryptedData += decipher.final('utf8');
  return decryptedData;
}

// Criptografar as palavras após união
const encryptedData: string = encryptWordsJoined(concatenatedWords, secretKey, iv);
console.log('Dados criptografados:', encryptedData);

// Descriptografar as palavras
const decryptedData: string = decryptWordsJoined(encryptedData, secretKey, iv);
console.log('Dados descriptografados:', decryptedData);
