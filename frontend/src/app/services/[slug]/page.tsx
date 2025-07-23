import { fetchServiceBySlug } from "@/lib/fetcher";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { ChevronLeft, Home, Calendar, User } from "lucide-react";
import type { Service } from "@/types";
import type { Metadata } from "next";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const resolvedParams = await params;
  if (!resolvedParams?.slug) return {};

  try {
    const service: Service = await fetchServiceBySlug(resolvedParams.slug);
    
    if (!service) return {};

    return {
      title: service.seo?.metaTitle || `${service.name} | Professional Service`,
      description: service.seo?.metaDescription || service.description,
      openGraph: {
        title: service.name,
        description: service.description,
        images: service.image?.asset?.url ? [service.image.asset.url] : [],
        type: 'website',
      },
    };
  } catch (error) {
    return {};
  }
}

export default async function ServicePage({ params }: ServicePageProps) {
  const resolvedParams = await params;
  if (!resolvedParams?.slug) {
    console.error('Service page: No slug provided');
    return notFound();
  }

  console.log('Service page: Looking for slug:', resolvedParams.slug);

  let service: Service;
  try {
    service = await fetchServiceBySlug(resolvedParams.slug);
    console.log('Service page: Found service:', service ? service.name : 'null');
  } catch (error) {
    console.error('Service page: Error fetching service:', error);
    return notFound();
  }

  if (!service) {
    console.error('Service page: No service found for slug:', resolvedParams.slug);
    return notFound();
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Breadcrumb Navigation */}
      <nav className="bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-[#195872] flex items-center gap-1">
              <Home size={16} />
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <Link href="/services" className="text-gray-500 hover:text-[#195872]">
              Services
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-[#195872] font-medium truncate max-w-xs">
              {service.name}
            </span>
          </div>
        </div>
      </nav>

      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 pt-6">
        <Link 
          href="/services" 
          className="inline-flex items-center gap-2 text-[#195872] hover:text-[#2a5d73] transition-colors group"
        >
          <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Back to Services
        </Link>
      </div>

      {/* Service Header */}
      <header className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Service Info */}
          <div className="space-y-4">
            {/* Category Badge */}
            <div className="flex items-center gap-3">
              <span 
                className="inline-block px-3 py-1 rounded-full text-sm font-medium text-white"
                style={{ backgroundColor: service.category.color || '#195872' }}
              >
                {service.category.title}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#195872] leading-tight">
              {service.name}
            </h1>
            
            <p className="text-lg text-gray-600 leading-relaxed">
              {service.description}
            </p>

            {/* Service Meta */}
            <div className="flex flex-wrap items-center gap-4 pt-4 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <User size={16} />
                <span>Professional Service</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>Available Now</span>
              </div>
            </div>
          </div>

          {/* Service Image */}
          <div className="relative">
            <div className="relative w-full h-64 md:h-80 lg:h-96 rounded-2xl overflow-hidden shadow-lg bg-gray-100">
              {service.image?.asset?.url ? (
                <Image
                  src={service.image.asset.url}
                  alt={service.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#E1F2FE] to-[#195872]/10">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 mx-auto bg-[#195872]/20 rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-[#195872]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <p className="text-[#195872] font-medium">Service Image</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Service Content */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold text-[#195872] mb-8">
            Service Details
          </h2>
          
          <article className="prose prose-lg max-w-none prose-headings:text-[#195872] prose-a:text-[#195872] prose-strong:text-[#195872]">
            <PortableText 
              value={service.content}
              components={{
                block: {
                  h1: ({children}) => <h1 className="text-3xl font-bold text-[#195872] mt-8 mb-4">{children}</h1>,
                  h2: ({children}) => <h2 className="text-2xl font-bold text-[#195872] mt-6 mb-3">{children}</h2>,
                  h3: ({children}) => <h3 className="text-xl font-bold text-[#195872] mt-4 mb-2">{children}</h3>,
                  h4: ({children}) => <h4 className="text-lg font-bold text-[#195872] mt-4 mb-2">{children}</h4>,
                  normal: ({children}) => <p className="mb-4 leading-relaxed text-gray-700">{children}</p>,
                  blockquote: ({children}) => (
                    <blockquote className="border-l-4 border-[#195872] pl-4 py-2 my-6 bg-gray-50 italic">
                      {children}
                    </blockquote>
                  ),
                },
                list: {
                  bullet: ({children}) => <ul className="list-disc list-inside space-y-2 my-4">{children}</ul>,
                },
                listItem: {
                  bullet: ({children}) => <li className="text-gray-700">{children}</li>,
                },
                marks: {
                  strong: ({children}) => <strong className="font-bold text-[#195872]">{children}</strong>,
                  em: ({children}) => <em className="italic">{children}</em>,
                  link: ({children, value}) => (
                    <a 
                      href={value?.href} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[#195872] hover:text-[#2a5d73] underline"
                    >
                      {children}
                    </a>
                  ),
                },
                types: {
                  image: ({value}) => (
                    value?.asset?.url ? (
                      <div className="my-8">
                        <Image
                          src={value.asset.url}
                          alt={value?.alt || "Service content image"}
                          width={800}
                          height={400}
                          className="rounded-lg shadow-md w-full h-auto"
                        />
                        {value?.caption && (
                          <p className="text-sm text-gray-500 text-center mt-2">
                            {value.caption}
                          </p>
                        )}
                      </div>
                    ) : null
                  ),
                },
              }}
            />
          </article>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-[#E1F2FE] py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-[#195872] mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-gray-700 mb-8 leading-relaxed">
              Transform your business with our professional service solutions. 
              Contact us to learn more about how we can help you achieve your goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact-us"
                className="bg-[#195872] text-white px-8 py-3 rounded-full font-medium hover:bg-[#2a5d73] transition-colors"
              >
                Contact Us
              </Link>
              <Link 
                href="/services"
                className="border border-[#195872] text-[#195872] px-8 py-3 rounded-full font-medium hover:bg-[#195872] hover:text-white transition-colors"
              >
                View All Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}