import { urlForImage } from "./client";
import { ImageSize } from "../utils";

// Simple in-memory cache for image URLs
const imageCache = new Map<string, string>();

export function getCachedImageUrl(
  source: any,
  size?: ImageSize | { width?: number; height?: number }
): string | undefined {
  if (!source) return undefined;

  // Create a cache key based on source and size
  const cacheKey = JSON.stringify({ source, size });

  // Check if we have a cached version
  if (imageCache.has(cacheKey)) {
    return imageCache.get(cacheKey);
  }

  // Generate new URL
  const imageUrl = urlForImage(source, size)?.url();

  if (imageUrl) {
    // Cache the result
    imageCache.set(cacheKey, imageUrl);
  }

  return imageUrl;
}

// Clear cache when needed (e.g., on development reload)
export function clearImageCache() {
  imageCache.clear();
}

// Preload critical images with timeout
export function preloadImage(url: string, timeout = 10000): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    const timer = setTimeout(() => {
      reject(new Error(`Image load timeout: ${url}`));
    }, timeout);

    img.onload = () => {
      clearTimeout(timer);
      resolve();
    };
    img.onerror = () => {
      clearTimeout(timer);
      reject(new Error(`Failed to load image: ${url}`));
    };
    img.src = url;
  });
}
