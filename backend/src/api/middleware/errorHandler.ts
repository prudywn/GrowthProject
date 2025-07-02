import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

export function errorHandler(err: Error, _req: Request, res: Response, _next: NextFunction): void {
  // --- Enhanced Logging for Production Debugging ---
  console.error('--- An error occurred and was caught by the central error handler ---');
  console.error('Error Name:', err.name);
  console.error('Error Message:', err.message);
  if (err.stack) {
    console.error('Stack Trace:', err.stack);
  }
  // Log the full error object as a string in case it has other useful properties
  console.error('Full Error Object (stringified):', JSON.stringify(err, null, 2));
  // --- End of Enhanced Logging ---

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