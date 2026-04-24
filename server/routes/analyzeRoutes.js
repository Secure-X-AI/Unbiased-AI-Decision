import express from 'express';
import { analyzeText, getHistory } from '../controllers/analyzeController.js';

const router = express.Router();

router.post('/analyze', analyzeText);
router.get('/history', getHistory);

export default router;
