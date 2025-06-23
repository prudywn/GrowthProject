import { Router } from 'express';
import { getHomepage, getAboutPage } from '../controllers/pageContent.controller';

const router = Router();

router.get('/homepage', getHomepage);
router.get('/about', getAboutPage);

export default router; 