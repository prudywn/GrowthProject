// src/api/services/ai.service.ts
import { GoogleGenerativeAI } from "@google/generative-ai";
import { masterPrompt } from "../config/prompts";

// Initialize the client with the API key from environment variables
if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is not defined in the environment variables");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

interface GenerateOptions {
  fieldType: 'title' | 'description' | 'text' | 'string' | 'blockContent';
  relatedFields?: Record<string, any>;
  schemaTitle?: string;
}

/**
 * Generates content using the Gemini API based on user input and context.
 * @param text The current text to be improved or used as a base
 * @param options Generation options including field type and related fields
 * @returns The AI-generated text suggestion
 */
export const generateContentSuggestion = async (
  text: string,
  options: GenerateOptions
): Promise<string> => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Add related fields context if available
    let relatedContext = '';
    if (options.relatedFields) {
      relatedContext = '\n\n---RELATED FIELDS---\n';
      for (const [key, value] of Object.entries(options.relatedFields)) {
        if (value && typeof value === 'string' && value.trim()) {
          relatedContext += `${key}: ${value}\n`;
        }
      }
    }

    const prompt = `
      ${masterPrompt}

      ---TASK---
      You are helping generate content for a ${options.fieldType} field${options.schemaTitle ? ` titled "${options.schemaTitle}"` : ''}.
      ${text ? 'The user has provided some existing content that you should improve upon.' : 'The field is currently empty, please generate appropriate content.'}
      ${relatedContext}

      ---EXISTING CONTENT---
      ${text || '(empty)'}

      ---INSTRUCTIONS---
      ${!text ? 'Generate new content that is engaging and appropriate for this field.' : 'Improve and expand upon the existing content while maintaining its core meaning.'}
      - Maintain a professional tone
      - Ensure the content is well-structured and easy to read
      - If improving existing content, preserve key information while enhancing clarity and impact
      - If generating new content, make it relevant to the field's purpose
      - Keep it concise but comprehensive
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const suggestion = response.text();

    return suggestion.trim();
  } catch (error) {
    console.error("Error generating content with Gemini:", error);
    throw new Error("Failed to generate content suggestion. Please try again later.");
  }
};

// Helper function to generate content for a specific field
export const generateFieldContent = async (
  fieldName: string,
  fieldType: 'title' | 'description' | 'text' | 'string' | 'blockContent',
  currentValue: string = '',
  document: Record<string, any> = {}
): Promise<string> => {
  // Remove the current field from related fields to avoid redundancy
  const { [fieldName]: _, ...relatedFields } = document;
  
  return generateContentSuggestion(currentValue, {
    fieldType,
    schemaTitle: fieldName,
    relatedFields
  });
};
