import { Router } from 'express';
import * as articleController from '../controllers/article.controller';

const router = Router();

// Public
router.get('/', articleController.getAllArticles);
router.get('/:slug', articleController.getArticle);

export default router; 