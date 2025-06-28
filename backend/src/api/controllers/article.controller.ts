import { Request, Response, NextFunction } from 'express';
import * as articleService from '../../services/article.service';
import { z } from 'zod';

// Zod schema for creating and updating articles
/*
const articleSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/, 'Slug must be lowercase with dashes only'),
  authorId: z.string(),
  mainImageUrl: z.string().url().optional(),
  content: z.any().optional(), // JSONB can be complex to validate deeply
  read_length_minutes: z.number().int().optional(),
});
*/

const slugSchema = z.object({
  slug: z.string(),
});

export async function getAllArticles(_req: Request, res: Response, next: NextFunction) {
  try {
    const articles = await articleService.getArticles();
    return res.json(articles);
  } catch (error) {
    return next(error);
  }
}

export async function getArticle(req: Request, res: Response, next: NextFunction) {
  try {
    const { slug } = slugSchema.parse(req.params);
    const article = await articleService.getArticleBySlug(slug);
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    return res.json(article);
  } catch (error) {
    return next(error);
  }
}