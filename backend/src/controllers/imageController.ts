import { Request, Response } from 'express';
import axios from 'axios';
import { processImageWithOpenAI } from '../services/openaiService';

export const processImage = async (req: Request, res: Response) => {
  try {
    const { imageUrl } = req.body;
    if (!imageUrl) {
      return res.status(400).send('No image URL provided.');
    }

    // Fetch the image from the provided URL
    const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    const imageBuffer = Buffer.from(imageResponse.data);

    // Process the image with OpenAI's API
    const suggestions = await processImageWithOpenAI(imageBuffer);
    res.json({ suggestions });
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};
