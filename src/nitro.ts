import * as readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const secretWords: string[] = [
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
  "pineapple"
];

function chooseTheWayToCallTheArray(choose){

  switch(choose){
    case "by-user-array":
      return

  }

}
function transformWord(word: string, transformation: string): string | number {
  switch (transformation) {
    case "remove-vowels":
      return word.replace(/[aeiou]/gi, "");
    case "count-vowels":
      return (word.match(/[aeiou]/gi) || []).length;
    case "count-consonants":
      return (word.match(/[b-df-hj-np-tv-z]/gi) || []).length;
    case "reverse":
      return word.split('').reverse().join('');
    default:
      return word;
  }
}

function getRandomIndex() {
  return Math.floor(Math.random() * secretWords.length);
}

function getRandomTransformation() {
  const availableTransformations: string[] = ["remove-vowels", "count-vowels", "count-consonants", "reverse"];
  const randomIndex: number = Math.floor(Math.random() * availableTransformations.length);
  return availableTransformations[randomIndex];
}

function displayTransformationInfo(word: string, transformation: string) {
  switch (transformation) {
    case "remove-vowels":
      console.log(`If I remove the vowels from the word "${word}", it will be:`);
      break;
    case "count-vowels":
      console.log(`If I count the vowels in the word "${word}", the value is:`);
      break;
    case "count-consonants":
      console.log(`If I count the consonants in the word "${word}", the value is:`);
      break;
    case "reverse":
      console.log(`If the word "${word}" is reversed, it will be:`);
      break;
    default:
      break;
  }
}

function startGame() {
  const randomIndex = getRandomIndex();
  const wordToTransform = secretWords[randomIndex];
  const selectedTransformation = getRandomTransformation();

  displayTransformationInfo(wordToTransform, selectedTransformation);

  rl.question('Enter your answer: ', (answer) => {
    const transformedValue = transformWord(wordToTransform, selectedTransformation);
    const transformedWord = typeof transformedValue === 'string' ? transformedValue.toLowerCase() : String(transformedValue);

    if (answer.toLowerCase() === transformedWord) {
      console.log("Your answer is correct!");
    } else {
      console.log("Your answer is incorrect. The correct answer is:", transformedValue);
    }

    rl.question('Do you want to play again? (yes/no): ', (playAgain) => {
      if (playAgain.toLowerCase() === 'yes') {
        startGame(); // Restart the game
      } else {
        rl.close(); // Close the readline interface
      }
    });
  });
}

startGame();


