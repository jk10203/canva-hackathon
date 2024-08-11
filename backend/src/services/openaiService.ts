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

    const messageContent = response.data.choices[0]?.message?.content;
    if (!messageContent) {
      throw new Error('Failed to get a valid response from OpenAI');
    }

    return generateAccessibilitySuggestions(messageContent);

  } catch (error) {
    console.error('Error processing image:', error);
    throw error;
  }
};

const generateAccessibilitySuggestions = (analysisResult: string) => {
  // Split the suggestions by newline and filter out empty lines
  const suggestions = analysisResult.split('\n').filter(suggestion => suggestion.trim().length > 0);

  // Make sure there are at least three suggestions
  if (suggestions.length < 3) {
    throw new Error('GPT-4 did not return at least three suggestions');
  }

  return suggestions;
};
