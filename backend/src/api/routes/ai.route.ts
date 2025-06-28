// src/api/routes/ai.route.ts
import { Router } from 'express';
import { getSuggestion } from '../controllers/ai.controller';

const router = Router();

// Route to get an AI-powered content suggestion
router.post('/suggest', getSuggestion);

export default router;
