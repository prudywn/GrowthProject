import { Request, Response, NextFunction } from 'express';
import * as articleService from '../../services/article.service';
import { z } from 'zod';

// Zod schema for creating and updating articles
const articleSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/, 'Slug must be lowercase with dashes only'),
  category: z.string().optional(),
  description: z.string().optional(),
  author_id: z.string().uuid(),
  content: z.any().optional(), // JSONB can be complex to validate deeply
  read_length_minutes: z.number().int().optional(),
});

export async function getAllArticles(req: Request, res: Response, next: NextFunction) {
  try {
    const articles = await articleService.getArticles();
    res.json(articles);
  } catch (error) {
    next(error);
  }
}

const slugSchema = z.object({
  slug: z.string(),
});

export async function getArticle(req: Request, res: Response, next: NextFunction) {
  try {
    const { slug } = slugSchema.parse(req.params);
    const article = await articleService.getArticleBySlug(slug);
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    res.json(article);
  } catch (error) {
    next(error);
  }
} 