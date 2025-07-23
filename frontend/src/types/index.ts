import type { Image as SanityImage } from 'sanity';

// This is a basic type for Portable Text but can be extended
export type PortableText = any[];

export interface ServiceCategory {
  _id: string;
  title: string;
  slug: { current: string };
  description: string;
  color?: string;
}

export interface Service {
  _id: string;
  name: string;
  slug: { current: string };
  description: string;
  image: { asset: { url: string } };
  category: ServiceCategory;
  content: PortableText;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
  };
}

export interface SimpleService {
  _id: string;
  name: string;
  slug?: { current: string } | null;
  description: string;
  imageSrc: string;
  category: {
    _id: string;
    title: string;
    slug: { current: string };
    color?: string;
  };
}

// Legacy interfaces for backward compatibility
export interface SubService {
  _id: string;
  title: string;
  description: PortableText;
  problemsSolved: string[];
}

export interface SanityService {
  _id: string;
  title: string;
  slug: { current: string };
  shortDescription: string;
  description: PortableText;
  mainImage: SanityImage;
  subServices: SubService[];
}

export interface CourseCategory {
  _id: string;
  title: string;
  slug: { current: string };
  description: string;
  color?: string;
}

export interface Course {
  _id: string;
  name: string;
  slug: { current: string };
  description: string;
  image: { asset: { url: string } };
  category: CourseCategory;
  content: PortableText;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
  };
}

export interface SimpleCourse {
  _id: string;
  name: string;
  slug?: { current: string } | null;
  description: string;
  imageSrc: string;
  category: {
    _id: string;
    title: string;
    slug: { current: string };
    color?: string;
  };
}
