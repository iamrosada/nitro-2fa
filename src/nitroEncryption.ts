import * as crypto from 'crypto';

export function transformWordsToFiveCharacters(words: string[]): string[] {
  const vowels = 'aeiou';
  const consonants = 'bcdfghjklmnpqrstvwxyz';

  function getRandomCharacter(characters: string): string {
    const randomIndex = Math.floor(Math.random() * characters.length);
    return characters[randomIndex];
  }

  const transformedWords = words.map((word: string) => {
    if (word.length > 5) {
      return word.slice(0, 5);
    } else if (word.length < 5) {
      const charactersToAdd = 5 - word.length;
      let transformedWord = word;
      for (let i = 0; i < charactersToAdd; i++) {
        const randomCharacter =
          i % 2 === 0
            ? getRandomCharacter(consonants)
            : getRandomCharacter(vowels);
        transformedWord += randomCharacter;
      }
      return transformedWord;
    } else {
      return word;
    }
  });

  return transformedWords;
}

const SALT = crypto.randomBytes(16);

export function encryptWords(joinedWords: string, senha: string): string {
  // Derive a secure encryption key from the password and salt using PBKDF2.
  const key = crypto.pbkdf2Sync(senha, SALT, 100000, 32, 'sha512');

  // Generate a random IV (Initialization Vector) for each encryption.
  const iv = crypto.randomBytes(16);

  // Create a Cipher instance with the derived key and IV.
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);

  // Encrypt the data.
  let encryptedData: string = cipher.update(joinedWords, 'utf8', 'hex');
  encryptedData += cipher.final('hex');

  // Combine the IV and the encrypted data (IV is needed for decryption).
  return iv.toString('hex') + encryptedData;
}

export function decryptWords(encryptedData: string, senha: string): string {
  // Derive the same key from the password and the stored salt.
  const key = crypto.pbkdf2Sync(senha, SALT, 100000, 32, 'sha512');

  // Extract the IV from the encrypted data (first 32 characters).
  const iv = Buffer.from(encryptedData.slice(0, 32), 'hex');
  const encryptedText = encryptedData.slice(32);

  // Create a Decipher instance with the derived key and extracted IV.
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);

  // Decrypt the data.
  let decryptedData: string = decipher.update(encryptedText, 'hex', 'utf8');
  decryptedData += decipher.final('utf8');

  return decryptedData;
}

export function separateWords(
  decryptedData: string,
  wordLength: number
): string[] {
  const words: string[][] = [];
  for (let i = 0; i < decryptedData.length; i += wordLength) {
    words.push(decryptedData.slice(i, i + wordLength) as unknown as string[]);
  }

  const flatArray = words.reduce((acc, current) => acc.concat(current), []);

  return flatArray;
}
