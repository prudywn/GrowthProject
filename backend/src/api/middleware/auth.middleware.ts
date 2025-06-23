import { Request, Response, NextFunction } from 'express';
import { supabase } from '../../lib/supabaseClient';

export async function protectRoute(req: Request, res: Response, next: NextFunction): Promise<void> {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Unauthorized: No token provided.' });
    return;
  }

  const token = authHeader.split(' ')[1];

  const { data: { user }, error } = await supabase.auth.getUser(token);

  if (error || !user) {
    res.status(401).json({ message: `Unauthorized: ${error?.message || 'Invalid token.'}` });
    return;
  }
  
  // You can attach the user to the request if needed later
  // (req as any).user = user;

  next();
} 