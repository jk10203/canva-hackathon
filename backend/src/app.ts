import express from 'express';
import multer from 'multer';
import { config } from 'dotenv';
import { processImage } from './controllers/imageController';

config(); // Load environment variables

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

app.use(express.json());
app.post('/process-image-url', upload.single('file'), processImage);

export default app;
