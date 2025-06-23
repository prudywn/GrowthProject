import { Request, Response } from 'express';
import * as pageContentService from '../../services/pageContent.service';

export async function getHomepage(_req: Request, res: Response) {
  const content = await pageContentService.getHomepageContent();
  res.json(content);
}

export async function getAboutPage(_req: Request, res: Response) {
  const content = await pageContentService.getAboutPageContent();
  res.json(content);
} 