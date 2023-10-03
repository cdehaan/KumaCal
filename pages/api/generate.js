import { systemContextString, chatFunctions } from "./prompt-and-context";

import OpenAI from 'openai';
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function (req, res) {
  const animal = req.body.activity || '';
  if (animal.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter daily activity description",
      }
    });
    return;
  }

  try {
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {"role": "system", "content": systemContextString},
        {"role": "user", "content": animal},
      ],
      functions: chatFunctions,
      temperature: 0.2,
    });
    console.log(chatCompletion.choices[0].message.function_call.arguments);
    res.status(200).json({ result: JSON.parse(chatCompletion.choices[0].message.function_call.arguments), originalText: animal });
  } catch(error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}
