"use server";

import Image from "next/image";
import Link from "next/link";
import { sanityFetch, urlForImage } from "@/lib/sanity/client";
import { SanityService } from "@/types";

const servicesQuery = `*[_type == "service"] | order(_createdAt desc) {
  _id,
  title,
  slug,
  shortDescription,
  mainImage
}`;

export default async function ServicesPage() {
  const services = await sanityFetch<SanityService[]>(servicesQuery);

  return (
    <div className="bg-white">
      <div className="bg-primary/5 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4 text-primary">Our Services</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive solutions tailored to your business needs
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {services?.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              const imageUrl = service.mainImage ? urlForImage(service.mainImage)?.url() : null;
              return (
                <Link
                  key={service._id}
                  href={`/services/${service.slug.current}`}
                  className="group block bg-white overflow-hidden rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="relative h-48 overflow-hidden">
                    {imageUrl && (
                      <Image
                        src={imageUrl}
                        alt={service.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    )}
                  </div>
                  <div className="p-6">
                    <h2 className="text-xl font-semibold mb-2 text-gray-800 group-hover:text-primary transition-colors">
                      {service.title}
                    </h2>
                    <p className="text-gray-600 mb-4">
                      {service.shortDescription}
                    </p>
                    <span className="text-primary font-medium inline-flex items-center">
                      Learn more
                      <svg
                        className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-lg text-gray-500">No services found. Please check back later.</p>
          </div>
        )}
      </div>
    </div>
  );
}
