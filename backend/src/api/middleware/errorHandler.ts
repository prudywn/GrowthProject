import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

export function errorHandler(err: Error, _req: Request, res: Response, _next: NextFunction): void {
  console.error(err); // For logging
  
  // Handle Zod validation errors
  if (err instanceof ZodError) {
    res.status(400).json({
      message: 'Invalid input data',
      errors: err.errors,
    });
  } else {
    // Default to a 500 server error for all other errors
    res.status(500).json({ message: 'An unexpected error occurred' });
  }
} 