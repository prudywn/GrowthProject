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

export async function getAllArticles(_req: Request, res: Response) {
  const articles = await articleService.getArticles();
  res.json(articles);
}

export async function getSingleArticle(req: Request, res: Response) {
  const { slug } = req.params;
  const article = await articleService.getArticleBySlug(slug);
  if (article) {
    res.json(article);
  } else {
    res.status(404).json({ message: 'Article not found' });
  }
}

export async function createNewArticle(req: Request, res: Response, next: NextFunction) {
  try {
    const validatedData = articleSchema.parse(req.body);
    const article = await articleService.createArticle(validatedData);
    res.status(201).json(article);
  } catch (error) {
    next(error);
  }
}

export async function updateExistingArticle(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const validatedData = articleSchema.partial().parse(req.body);
    const article = await articleService.updateArticle(id, validatedData);
    res.json(article);
  } catch (error) {
    next(error);
  }
}

export async function deleteSingleArticle(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    await articleService.deleteArticle(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
} 