import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { sanityFetch } from "@/lib/sanity/client";
import { getCachedImageUrl } from "@/lib/sanity/imageCache";
import { SanityService } from "@/types";
import Link from "next/link";

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

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  if (!resolvedParams?.slug) return notFound();

  const service = await sanityFetch<SanityService>(serviceQuery, {
    slug: resolvedParams.slug,
  });

  if (!service) {
    notFound();
  }

  const imageUrl = service.mainImage
    ? getCachedImageUrl(service.mainImage, "large")
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#195872]/10 to-[#195872]/5" />
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-[#195872] mb-6">
              {service.title}
            </h1>
            <div className="w-24 h-1 bg-[#195872] mx-auto mb-8" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-16">
        <div className="max-w-6xl mx-auto">
          {/* Main Image */}
          {imageUrl && (
            <div className="relative w-full h-96 md:h-[500px] mb-16 rounded-2xl overflow-hidden shadow-2xl transform -translate-y-8">
              <Image
                src={imageUrl}
                alt={service.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          )}

          {/* Description */}
          {service.description && (
            <div className="max-w-4xl mx-auto mb-20">
              <div className="prose prose-lg max-w-none prose-headings:text-slate-800 prose-p:text-slate-600 prose-p:leading-relaxed">
                <PortableText value={service.description} />
              </div>
            </div>
          )}

          {/* Sub Services */}
          {service.subServices && service.subServices.length > 0 && (
            <div className="space-y-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-slate-800 mb-4">
                  Our Services
                </h2>
                <div className="w-16 h-1 bg-[#195872] mx-auto" />
              </div>

              <div className="grid gap-8 md:grid-cols-2">
                {service.subServices.map((subService: any, index: number) => (
                  <div
                    key={subService._id}
                    className={`group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-[#195872]/30 ${
                      index % 2 === 0
                        ? "md:hover:-translate-y-2"
                        : "md:hover:translate-y-2"
                    }`}
                  >
                    {/* Card number */}
                    <div className="absolute -top-4 -right-4 w-12 h-12 bg-[#195872] rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      {index + 1}
                    </div>

                    {/* Content */}
                    <div className="space-y-6">
                      <h3 className="text-2xl font-bold text-slate-800 group-hover:text-[#195872] transition-colors">
                        {subService.title}
                      </h3>

                      <p className="text-slate-600 leading-relaxed">
                        {subService.description}
                      </p>

                      {subService.problemsSolved?.length > 0 && (
                        <div className="pt-4 border-t border-slate-100">
                          <h4 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
                            <span className="w-2 h-2 bg-[#195872] rounded-full mr-3"></span>
                            Problems We Solve
                          </h4>
                          <div className="space-y-3">
                            {subService.problemsSolved.map(
                              (problem: string, idx: number) => (
                                <div
                                  key={idx}
                                  className="flex items-start space-x-3"
                                >
                                  <div className="w-1.5 h-1.5 bg-[#195872] rounded-full mt-2 flex-shrink-0" />
                                  <span className="text-slate-600 leading-relaxed">
                                    {problem}
                                  </span>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Hover effect overlay */}
                    <div className="absolute inset-0 bg-[#195872]/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Call to Action */}
          <div className="mt-20 text-center">
            <div className="bg-[#195872] rounded-2xl p-12 text-white">
              <h3 className="text-3xl font-bold mb-4">Ready to Get Started?</h3>
              <p className="text-white mb-8 max-w-2xl mx-auto">
                Contact our team to learn more about how we can help solve your
                challenges
              </p>
              <Link href="/contact-us">
                <button className="bg-white text-[#195872] px-8 py-3 rounded-lg font-semibold hover:bg-slate-50 transition-colors shadow-lg cursor-pointer">
                  Get in Touch
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
