import { sanityClient } from "@/lib/sanity";
import { fetchCourseBySlug } from "@/lib/fetcher";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { ChevronLeft, Home, Calendar, User } from "lucide-react";
import type { Course } from "@/types";
import type { Metadata } from "next";

interface CoursePageProps {
  params: Promise<{ slug: string }>;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: CoursePageProps): Promise<Metadata> {
  const resolvedParams = await params;
  if (!resolvedParams?.slug) return {};

  try {
    const course: Course = await fetchCourseBySlug(resolvedParams.slug);
    
    if (!course) return {};

    return {
      title: course.seo?.metaTitle || `${course.name} | Training Course`,
      description: course.seo?.metaDescription || course.description,
      openGraph: {
        title: course.name,
        description: course.description,
        images: course.image?.asset?.url ? [course.image.asset.url] : [],
        type: 'website',
      },
    };
  } catch (error) {
    return {};
  }
}

export default async function CoursePage({ params }: CoursePageProps) {
  const resolvedParams = await params;
  if (!resolvedParams?.slug) return notFound();

  let course: Course;
  try {
    course = await fetchCourseBySlug(resolvedParams.slug);
  } catch (error) {
    return notFound();
  }

  if (!course) return notFound();

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
            <Link href="/courses" className="text-gray-500 hover:text-[#195872]">
              Courses
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-[#195872] font-medium truncate max-w-xs">
              {course.name}
            </span>
          </div>
        </div>
      </nav>

      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 pt-6">
        <Link 
          href="/courses" 
          className="inline-flex items-center gap-2 text-[#195872] hover:text-[#2a5d73] transition-colors group"
        >
          <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Back to Courses
        </Link>
      </div>

      {/* Course Header */}
      <header className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Course Info */}
          <div className="space-y-4">
            {/* Category Badge */}
            <div className="flex items-center gap-3">
              <span 
                className="inline-block px-3 py-1 rounded-full text-sm font-medium text-white"
                style={{ backgroundColor: course.category.color || '#195872' }}
              >
                {course.category.title}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#195872] leading-tight">
              {course.name}
            </h1>
            
            <p className="text-lg text-gray-600 leading-relaxed">
              {course.description}
            </p>

            {/* Course Meta */}
            <div className="flex flex-wrap items-center gap-4 pt-4 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <User size={16} />
                <span>Professional Training</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>Self-paced Learning</span>
              </div>
            </div>
          </div>

          {/* Course Image */}
          <div className="relative">
            <div className="relative w-full h-64 md:h-80 lg:h-96 rounded-2xl overflow-hidden shadow-lg bg-gray-100">
              {course.image?.asset?.url ? (
                <Image
                  src={course.image.asset.url}
                  alt={course.name}
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
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <p className="text-[#195872] font-medium">Course Image</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Course Content */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold text-[#195872] mb-8">
            Course Content
          </h2>
          
          <article className="prose prose-lg max-w-none prose-headings:text-[#195872] prose-a:text-[#195872] prose-strong:text-[#195872]">
            <PortableText 
              value={course.content}
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
                          alt={value?.alt || "Course content image"}
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
              Transform your skills with our comprehensive training program. 
              Contact us to learn more about enrollment and customization options.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact-us"
                className="bg-[#195872] text-white px-8 py-3 rounded-full font-medium hover:bg-[#2a5d73] transition-colors"
              >
                Contact Us
              </Link>
              <Link 
                href="/courses"
                className="border border-[#195872] text-[#195872] px-8 py-3 rounded-full font-medium hover:bg-[#195872] hover:text-white transition-colors"
              >
                View All Courses
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}