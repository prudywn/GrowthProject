import { Request, Response, NextFunction } from 'express';
import * as contactService from '../../services/contact.service';
import { z } from 'zod';

const contactSchema = z.object({
  full_name: z.string().min(1, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  company: z.string().optional(),
  phone_number: z.string().optional(),
  role_description: z.string().optional(),
  service_needs: z.string().optional(),
});

export async function handleContactForm(req: Request, res: Response, next: NextFunction) {
  console.log('--- Contact form handler reached ---');

  // --- Network Connectivity Test ---
  try {
    console.log('--- Testing network connectivity to google.com ---');
    const testResponse = await fetch('https://www.google.com');
    console.log('--- Google.com responded with status:', testResponse.status, '---');
  } catch (networkError) {
    console.error('--- CRITICAL: Network connectivity test failed! ---', networkError);
  }
  // --- End of Network Connectivity Test ---

  try {
    const validatedData = contactSchema.parse(req.body);
    const submission = await contactService.createContactSubmission(validatedData);
    res.status(201).json({ message: 'Success! We have received your message.', data: submission });
  } catch (error) {
    // Let the central error handler deal with everything
    next(error);
  }
} 