import { OpenAI } from 'openai';
import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const openai = new OpenAI();

// Function to process the image and get accessibility suggestions from GPT-4
export const processImageWithOpenAI = async (imageBuffer: Buffer) => {
  // Convert image buffer to base64 string
  const imageBase64 = imageBuffer.toString('base64');

  // Prompt for GPT-4 to analyze the image (example prompt, since direct image analysis is not supported)
  const prompt = `Analyze the following image data and provide accessibility suggestions: ${imageBase64}`;

  const response = await openai.chat.completions.create ({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: 'You are an assistant that helps with image accessibility.' },
      { role: 'user', content: prompt }
    ],
    max_tokens: 500,
  });

  const messageContent = response.choices[0]?.message?.content;
  if (!messageContent) {
    throw new Error('Failed to get a valid response from OpenAI');
  }

  return generateAccessibilitySuggestions(messageContent);};

const generateAccessibilitySuggestions = (analysisResult: string) => {
    // Parse the analysis result and generate suggestions
    // Assuming the analysisResult is a string containing suggestions separated by new lines
    const suggestions = analysisResult.split('\n').filter(Boolean);
  
    return suggestions;
};
