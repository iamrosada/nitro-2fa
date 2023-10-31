
# Nitro 2FA, Authentication System

The Nitro Authentication System is a password recovery and 2FA system that uses word transformations to verify user identity.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Code Structure](#code-structure)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites

Before you start, make sure you have the following installed:

- Node.js and npm

## Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/iamrosada/nitro-2fa.git
   ```

2. Navigate to the project directory:

   ```bash
   cd nitro-2fa
   ```

3. Install the required packages:

   ```bash
   npm install
   ```

## Usage

### Choose Word Source

The `chooseWordSource` function is used to select a source of words for the authentication system. It can be from a file, an array, or provided by the user.

```javascript
import { chooseWordSource } from './nitro';

chooseWordSource({
  sourceType: 'file', // 'file', 'array', or 'user'
  userPassword: 'your_password_here',
  // userWords: 'your_words_here', // Required for 'user' sourceType
}).then(({ wordsArray, encryptedData }) => {
  // Use the wordsArray and encryptedData
});
```

### Create Nitro 2FA Context

The `createNitro2FAContext` function creates a context for the Nitro 2FA system, allowing you to retrieve word transformations and verify user answers.

```javascript
import { createNitro2FAContext } from './nitro';

const myContext = createNitro2FAContext();

const transformationInfo = myContext.displayTransformationInfo();
console.log(transformationInfo);

const userAnswer = 'user_answer_here';
const result = myContext.nitro2FA(wordsArray, userAnswer);
console.log(result);
```
### Example with REST API, Nitro 2FA Context

```typescript
import bodyParser from 'body-parser';
import { chooseWordSource, createNitro2FAContext } from './nitro';
import express, { Request, Response } from 'express';


const app = express();
const port = 3000;

app.use(bodyParser.json());

let userPassword = "user_password_here"; 

const myContext = createNitro2FAContext();
let wordsArrayFor2FA: string[] = []; 

app.get('/2fa', async (req: Request, res: Response) => {
  try {
    const words = await chooseWordSource({ sourceType: 'file', userPassword: userPassword });

    wordsArrayFor2FA = words.wordsArray;

    res.json({ message: words.wordsArray, keySaveIntoDatabase: words.encryptedData });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get('/2fa', async (req: Request, res: Response) => {
  try {
    const words = await chooseWordSource({ sourceType: 'file', userPassword: userPassword });
    

    wordsArrayFor2FA = words.wordsArray;
    res.json({ message: words.wordsArray, keySaveIntoDatabase: words.encryptedData });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get('/passwordReset', (req: Request, res: Response) => {
  const transformationInfo = myContext.displayTransformationInfo();
  res.json({ transformationInfo });
});

app.post('/checkAnswer', async (req: Request, res: Response) => {
  try {
    const userAnswer = req.body.user_answer;

    const result = await myContext.nitro2FA(wordsArrayFor2FA, userAnswer);

    res.json(result); 
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

```
## Code Structure

The project's code is organized as follows:

- `nitroEncryption.js`: Encryption and decryption functions.
- `readWordsFromFile.js`: Function to read words from a file.
- `transformWord.js`: Function for transforming words.
- `getRandomTransformation.js`: Function to get a random transformation.
- `provideUserWords.js`: Function to provide user-specific words.

## Contributing

If you want to contribute to this project, follow these steps:

1. Fork the project.
2. Create a new branch for your feature or fix.
3. Commit your changes.
4. Push to your fork.
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Replace placeholders like `'your_password_here'` and `'user_answer_here'` with actual values.

Feel free to expand on this README as needed to provide more context and detailed explanations.