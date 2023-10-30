import { chooseWordSource} from './nitro'

// To use words from a file:
try {
  const words =  chooseWordSource({ sourceType: 'file' });
  words.then((result) => {
    console.log("Promise resolved with result:", result);
  })
  .catch((error) => {
    console.error("Promise rejected with error:", error);
  });
  // Your code here
} catch (error:any) {
  console.error(error.message);
}

// // To use predefined array of words:
// try {
//   const words = await chooseWordSource({ sourceType: 'array' });
//   console.log(words)

//   // Your code here
// } catch (error:any) {
//   console.error(error.message);
// }

// // To use user-provided data (array of words):
// const userWords = ['custom', 'user', 'words'];
// try {
//   const words = await chooseWordSource({ sourceType: 'user', userWords });
//   console.log(words)

//   // Your code here
// } catch (error:any) {
//   console.error(error.message);
// }

// // To use user-provided data from a file:
// const userFile = 'path/to/user/word/file.txt';
// try {
//   const words = await chooseWordSource({ sourceType: 'user', userWords: userFile });
//   console.log(words)

//   // Your code here
// } catch (error:any) {
//   console.error(error.message);
// }
