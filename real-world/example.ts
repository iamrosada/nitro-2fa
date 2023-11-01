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
