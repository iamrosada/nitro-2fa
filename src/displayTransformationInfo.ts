export function displayTransformationInfo(
  word: string,
  transformation: string,
  randomIndex: number
): string {
  switch (transformation) {
    case "remove-vowels":
      return `IF I REMOVE THE VOWELS FROM THE WORD IN THIS POSITION ${
        randomIndex + 1
      }, IT WILL BE: ${word}`;
    case "count-vowels":
      return `IF I COUNT THE VOWELS IN THE WORD IN THIS POSITION ${
        randomIndex + 1
      }, THE VALUE IS: ${word}`;
    case "count-consonants":
      return `IF I REMOVE THE VOWELS IN THE WORD IN THIS POSITION ${
        randomIndex + 1
      }, THE VALUE IS: ${word}`;
    case "reverse":
      return `IF THE WORD IN POSITION ${
        randomIndex + 1
      } IS REVERSED, IT WILL BE: ${word}`;
    default:
      return '';
  }
}
