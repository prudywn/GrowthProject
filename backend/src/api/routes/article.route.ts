import { Router } from 'express';
import { 
  getAllArticles, 
  getSingleArticle,
  createNewArticle,
  updateExistingArticle,
  deleteSingleArticle
} from '../controllers/article.controller';
import { protectRoute } from '../middleware/auth.middleware';

const router = Router();

// Public
router.get('/', getAllArticles);
router.get('/:slug', getSingleArticle);

// Protected
router.post('/', protectRoute, createNewArticle);
router.put('/:id', protectRoute, updateExistingArticle);
router.delete('/:id', protectRoute, deleteSingleArticle);

export default router; 