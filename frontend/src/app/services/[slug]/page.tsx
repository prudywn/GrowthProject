import { notFound } from 'next/navigation';
import Image from 'next/image';
import { PortableText } from '@portabletext/react';
import { sanityFetch, urlForImage } from '@/lib/sanity/client';
import { SanityService } from '@/types';

const serviceQuery = `*[_type == "service" && slug.current == $slug][0] {
  _id,
  title,
  description,
  mainImage,
  "subServices": subServices[]->{
    _id,
    title,
    description,
    problemsSolved
  }
}`;

const servicesSlugsQuery = `*[_type == "service" && defined(slug.current)][]{ "slug": slug.current }`;

export const revalidate = 60; // Revalidate every 60 seconds

export async function generateStaticParams() {
  const slugs = await sanityFetch<{ slug: string }[]>(servicesSlugsQuery);
  return slugs.map((slug) => ({ slug: slug.slug }));
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  if (!resolvedParams?.slug) return notFound();

  const service = await sanityFetch<SanityService>(serviceQuery, { slug: resolvedParams.slug });

  if (!service) {
    notFound();
  }

  const imageUrl = service.mainImage ? urlForImage(service.mainImage)?.url() : null;

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">{service.title}</h1>

        {imageUrl && (
          <div className="relative w-full h-96 mb-8 rounded-lg overflow-hidden">
            <Image
              src={imageUrl}
              alt={service.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {service.description && (
          <div className="prose max-w-none mb-12">
            <PortableText value={service.description} />
          </div>
        )}

        <div className="space-y-12">
          {service.subServices?.map((subService: any) => (
            <div key={subService._id} className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">{subService.title}</h2>
              <p className="text-gray-700 mb-4">{subService.description}</p>

              {subService.problemsSolved?.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium mb-2">Problems We Solve:</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {subService.problemsSolved.map((problem: string, idx: number) => (
                      <li key={idx} className="text-gray-700">
                        {problem}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
