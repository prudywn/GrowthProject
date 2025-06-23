import { Router } from 'express';
import * as webhookController from '../controllers/webhook.controller';

const router = Router();

// This endpoint will be called by Sanity when content changes.
router.post('/sanity-update', webhookController.handleSanityWebhook);

export default router; 