import { Request, Response } from 'express';
import { processImageWithOpenAI } from '../services/openaiService';
import multer from 'multer';

const upload = multer({ storage: multer.memoryStorage() }).single('image');

export const processImage = async (req: Request, res: Response) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).send('Error uploading file.');
    }

    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }

    try {
      const base64Image = req.file.buffer.toString('base64');
      const imageType = req.file.mimetype;

      // Process the image with OpenAI's API
      const suggestions = await processImageWithOpenAI(base64Image, imageType);
      res.json({ suggestions });
    } catch (error: any) {
      res.status(500).send(error.message);
    }
  });
};
