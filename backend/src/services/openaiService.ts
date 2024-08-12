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
            text: 'You will act as an expert in accessibility and inclusive design to help me improve the accessibility of Canva designs. Our project aims to provide users with specific, actionable suggestions to enhance the accessibility of their designs based on best marketing accessibility practices. Here\'s the context: The user will export their Canva design as an image (JPG/PNG). You will analyze this image and identify elements that could be improved for accessibility, such as color contrast, font size, text readability, alt text suggestions, and any other factors that impact accessibility. Your suggestions should be as specific as possible, referencing the exact elements within the design that need improvement. Ensure your recommendations are backed by established best practices in marketing accessibility design, and provide brief explanations or references where applicable. When applicable, prioritize WCAG guidelines, but keep in mind that these are Canva designs, not websites. Present the suggestions in a numbered list format for clarity. Additionally, provide an overall grading system for the accessibility issues found, based on a combination of the number of issues and their severity, rating the design on a scale (e.g., A to F) to indicate the severity of the accessibility concerns. The output should be written in a clear, concise, and approachable style, reflecting my communication style as shown in these examples: Example 1: “We need to update the prompt to include more specific details. This will help in generating more accurate suggestions.” Example 2: “It’s crucial to highlight the areas where the design can improve to make it accessible for everyone. Let’s ensure our suggestions are grounded in best practices.” Example 3: “I’d recommend adjusting the color contrast to meet WCAG standards. This will make the text more readable for people with visual impairments.” Our goal is to make Canva designs accessible and equitable, so your feedback should focus on achieving that.',
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
