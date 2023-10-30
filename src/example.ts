import { chooseWordSource, nitro2FA,randomIndexSelected} from './nitro'
const userPassword = "user_password_here";
// To use words from a file:
try {
  // Call chooseWordSource and handle the promise
  chooseWordSource({ sourceType: 'file', userPassword: userPassword })
    .then((words) => {
      console.log("Words:", words.wordsArray);
      console.log("Words:", words.encryptedData);
    

      // Now that you have the 'words', call nitro2FA with a user answer
      const userAnswer = 'your_answer_here'; // Replace with an actual answer
      return nitro2FA(words.wordsArray, userAnswer);
    })
    .then((result) => {
      console.log("nitro2FA Result:", result);
    })
    .catch((error) => {
      console.error("Promise rejected with error:", error);
    });
} catch (error) {
  console.error(error.message);
}
// To use predefined array of words:
// try {
//   // Call chooseWordSource and handle the promise
//   chooseWordSource({ sourceType: 'array' ,userPassword: userPassword})
//     .then((words) => {
//       console.log("Words:", words);

//       // Now that you have the 'words', call nitro2FA with a user answer
//       const userAnswer = 'your_answer_here'; // Replace with an actual answer
//       return nitro2FA(words, userAnswer);
//     })
//     .then((result) => {
//       console.log("nitro2FA Result:", result);
//     })
//     .catch((error) => {
//       console.error("Promise rejected with error:", error);
//     });
// } catch (error) {
//   console.error(error.message);
// }

// // To use user-provided data from a file:
// const userFile = 'path/to/user/word/file.txt';
// try {
//   // Call chooseWordSource and handle the promise
//   chooseWordSource({ sourceType: 'user', userWords: userFile,userPassword: userPassword })
//     .then((words) => {
//       console.log("Words:", words);

//       // Now that you have the 'words', call nitro2FA with a user answer
//       const userAnswer = 'your_answer_here'; // Replace with an actual answer
//       return nitro2FA(words, userAnswer);
//     })
//     .then((result) => {
//       console.log("nitro2FA Result:", result);
//     })
//     .catch((error) => {
//       console.error("Promise rejected with error:", error);
//     });
// } catch (error) {
//   console.error(error.message);
// }