import { Request, Response } from 'express';
import { supabase } from '../../lib/supabaseClient';

// Service function
async function logPageView(pageUrl: string): Promise<void> {
  const { error } = await supabase.from('site_analytics').insert([{ page_url: pageUrl }]);
  if (error) {
    console.error('Error logging page view:', error); // Log error but don't throw, not critical
  }
}

// Controller function
export async function handleLogPageView(req: Request, res: Response): Promise<void> {
  const { page_url } = req.body;
  if (!page_url) {
    res.status(400).json({ message: 'page_url is required' });
    return; // Exit the function early
  }
  await logPageView(page_url);
  res.status(202).json({ message: 'View logged' });
} 