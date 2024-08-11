import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import { processImage } from './controllers/imageController';

config(); // Load environment variables

const app = express();

app.use(cors()); // Allow all origins
app.use(express.json());

app.post('/process-image', processImage); // Updated to POST and handle file upload

export default app;
