import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET! || 'production',
  apiVersion: '2024-05-01', // Use a more recent API version
  useCdn: false, // Must be false to use Next.js Data Cache
});

export async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {}
): Promise<T> {
  return client.fetch<T>(query, params, {
    next: {
      // revalidate every 60 seconds
      revalidate: 60,
    },
  });
}

const builder = imageUrlBuilder(client);

// Helper function to generate image URL with hotspot/crop support
export function urlForImage(source: SanityImageSource) {
  if (!source) return undefined;
  return builder.image(source).auto('format').fit('max');
}
