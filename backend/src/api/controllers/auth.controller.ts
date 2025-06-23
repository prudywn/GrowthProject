import { Request, Response, NextFunction } from 'express';
import * as authService from '../../services/auth.service';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email('A valid email is required.'),
  password: z.string().min(1, 'Password cannot be empty.'),
});

export async function loginController(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = loginSchema.parse(req.body);
    const result = await authService.signInUser(email, password);
    res.json(result);
  } catch (error) {
    next(error);
  }
} 