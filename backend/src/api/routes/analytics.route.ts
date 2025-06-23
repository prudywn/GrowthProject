import { Router } from 'express';
import { handleLogPageView } from '../controllers/analytics.controller';

const router = Router();

router.post('/view', handleLogPageView);

export default router; 