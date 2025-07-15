import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { ImageSize, getImageDimensions } from "../utils";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET! || "production",
  apiVersion: "2024-05-01", // Use a more recent API version
  useCdn: true, // Enable CDN for better performance
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

// Helper function to generate optimized image URL with hotspot/crop support
export function urlForImage(
  source: SanityImageSource,
  size?: ImageSize | { width?: number; height?: number }
) {
  if (!source) return undefined;

  let imageBuilder = builder.image(source).auto("format").fit("max");

  // Handle size parameter
  if (typeof size === "string") {
    const dimensions = getImageDimensions(size);
    imageBuilder = imageBuilder
      .width(dimensions.width)
      .height(dimensions.height);
  } else if (size) {
    if (size.width) {
      imageBuilder = imageBuilder.width(size.width);
    }
    if (size.height) {
      imageBuilder = imageBuilder.height(size.height);
    }
  }

  // Add quality parameter for better compression
  return imageBuilder.quality(75);
}
