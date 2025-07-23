import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Image optimization utilities
export const imageSizes = {
  thumbnail: { width: 100, height: 100 },
  small: { width: 200, height: 150 },
  medium: { width: 400, height: 300 },
  large: { width: 800, height: 600 },
  hero: { width: 1200, height: 800 },
} as const;

export type ImageSize = keyof typeof imageSizes;

// Helper function to get image dimensions based on size
export function getImageDimensions(size: ImageSize) {
  return imageSizes[size];
}

// Utility function to safely extract text from either string or Portable Text
export function extractPlainText(content: any): string {
  if (typeof content === 'string') {
    return content;
  }
  
  if (Array.isArray(content)) {
    return content
      .map(block => {
        if (block._type === 'block' && block.children) {
          return block.children
            .filter((child: any) => child._type === 'span')
            .map((child: any) => child.text || '')
            .join('');
        }
        return '';
      })
      .join(' ')
      .trim();
  }
  
  if (typeof content === 'object' && content !== null) {
    // If it's a single Portable Text block
    if (content._type === 'block' && content.children) {
      return content.children
        .filter((child: any) => child._type === 'span')
        .map((child: any) => child.text || '')
        .join('');
    }
  }
  
  return '';
}
