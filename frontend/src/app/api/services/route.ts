import { NextResponse } from 'next/server';
import { sanityClient } from '@/lib/sanity';

export const revalidate = 60; // Revalidate every 60 seconds

export async function GET() {
  try {
    const query = `
      *[_type == "service"] {
        _id,
        title,
        slug,
        shortDescription,
        mainImage {
          asset->{
            url
          }
        }
      }
    `;

    const services = await sanityClient.fetch(query);
    
    return NextResponse.json(services);
  } catch (error) {
    console.error('Error fetching services:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
