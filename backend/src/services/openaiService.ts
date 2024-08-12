import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.OPENAI_API_KEY;

export const processImageWithOpenAI = async (base64Image: string, imageType: string) => {
  const payload = {
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: 'You are an accessibility design assistant. Analyze the following image and provide at least three accessibility suggestions, each on a new line.',
          },
          {
            type: 'image_url',
            image_url: {
              url: `data:${imageType};base64,${base64Image}`,
            },
          },
        ],
      },
    ],
    max_tokens: 500,
  };

  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', payload, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
    });

    const choices = response.data.choices;
    if (!choices || choices.length === 0) {
      throw new Error('Failed to get a valid response from OpenAI');
    }

    const messageContent = choices[0].message.content;
    if (!messageContent) {
      throw new Error('Response does not contain content');
    }

    return generateAccessibilitySuggestions(messageContent);

  } catch (error) {
    if (error instanceof Error) {
      //'error' is an instance of Error
      console.error('Error processing image:', error.message);
  
      if (axios.isAxiosError(error)) {
        console.error('Error details:', error.response?.data);
      }
    } else {
      console.error('Unexpected error', error);
    }
    throw error; // Re-throw the error if needed
  }
};

const generateAccessibilitySuggestions = (analysisResult: string) => {
  const suggestions = analysisResult.split('\n').filter(suggestion => suggestion.trim().length > 0);

  if (suggestions.length < 3) {
    throw new Error('GPT-4 did not return at least three suggestions');
  }

  return suggestions;
};
