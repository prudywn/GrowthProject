// src/api/controllers/ai.controller.ts
import { Request, Response } from 'express';
import { z } from 'zod';
import { generateFieldContent } from '../services/ai.service';

// Define schemas for input validation
const generateContentSchema = z.object({
  fieldName: z.string().min(1, { message: "Field name is required" }),
  fieldType: z.enum(['title', 'description', 'text', 'string', 'blockContent']),
  currentValue: z.string().optional(),
  document: z.record(z.any()).optional(),
});

export const getSuggestion = async (req: Request, res: Response): Promise<Response> => {
  try {
    // Validate request body
    const validationResult = generateContentSchema.safeParse(req.body);

    if (!validationResult.success) {
      return res.status(400).json({ 
        success: false, 
        errors: validationResult.error.flatten() 
      });
    }


    const { fieldName, fieldType, currentValue = '', document = {} } = validationResult.data;

    // Generate content using the AI service
    const suggestion = await generateFieldContent(
      fieldName,
      fieldType,
      currentValue,
      document
    );

    return res.status(200).json({ 
      success: true, 
      suggestion 
    });
  } catch (error: any) {
    console.error('Error in getSuggestion:', error);
    return res.status(500).json({ 
      success: false, 
      message: error.message || 'Failed to generate content' 
    });
  }
};

// Add a simple health check endpoint
export const healthCheck = (_req: Request, res: Response): Response => {
  return res.status(200).json({ 
    status: 'ok', 
    service: 'ai-suggestion-service',
    timestamp: new Date().toISOString() 
  });
};
