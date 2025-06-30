import type { Image as SanityImage } from 'sanity';

// This is a basic type for Portable Text but can be extended
export type PortableText = any[];

export interface SubService {
  _id: string;
  title: string;
  description: PortableText;
  problemsSolved: string[];
}

export interface SanityService {
  _id: string;
  title: string;
  description: PortableText;
  mainImage: SanityImage;
  subServices: SubService[];
}
