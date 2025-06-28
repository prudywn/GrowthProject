"use client";

import { useState, useRef, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { urlForImage } from "@/lib/sanity/client";
import { SanityService } from "@/types";

export interface ServicesSectionProps {
  title: string;
  description: string;
  featuredServices: SanityService[];
}

export default function ServicesSection({ title, description, featuredServices }: ServicesSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.8;
      scrollRef.current.scrollBy({ 
        left: direction === 'left' ? -scrollAmount : scrollAmount, 
        behavior: 'smooth' 
      });
    }
  };

  useEffect(() => {
    const currentRef = scrollRef.current;
    if (currentRef) {
      handleScroll(); // Initial check
      currentRef.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (currentRef) {
        currentRef.removeEventListener('scroll', handleScroll);
      }
    };
  }, [featuredServices]);

  if (!featuredServices?.length) {
    return null;
  }

  const showCarousel = featuredServices.length > 3;

  return (
    <section className="py-20 bg-primary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-primary">{title}</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {description}
          </p>
        </div>

        <div className="relative">
          {showCarousel && (
            <>
              <button 
                onClick={() => scroll('left')}
                disabled={!canScrollLeft}
                className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/80 shadow-md hover:bg-white transition-all disabled:opacity-0 disabled:cursor-not-allowed`}
              >
                <ChevronLeft className="text-primary" />
              </button>
              <button 
                onClick={() => scroll('right')}
                disabled={!canScrollRight}
                className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/80 shadow-md hover:bg-white transition-all disabled:opacity-0 disabled:cursor-not-allowed`}
              >
                <ChevronRight className="text-primary" />
              </button>
            </>
          )}

          <div 
            ref={scrollRef} 
            className={`flex gap-8 ${showCarousel ? 'overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory' : 'grid md:grid-cols-2 lg:grid-cols-3'}`}
          >
            {featuredServices.map((service) => {
              const imageUrl = service.mainImage ? urlForImage(service.mainImage)?.url() : null;

              return (
                <div 
                  key={service._id} 
                  className={`${showCarousel ? 'snap-start flex-shrink-0 w-[calc(100%-2rem)] md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)]' : ''}`}
                >
                  <div
                    className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col"
                  >
                    <div className="relative h-48 w-full overflow-hidden">
                      {imageUrl && (
                        <Image
                          src={imageUrl}
                          alt={service.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      )}
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="text-xl font-semibold mb-2 text-gray-800 group-hover:text-primary transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 mb-4 flex-1">
                        {service.shortDescription}
                      </p>
                      <Link
                        href={`/services/${service.slug.current}`}
                        className="text-primary font-medium inline-flex items-center mt-auto"
                      >
                        Learn more
                        <svg
                          className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="text-center mt-12">
          <Link
            href="/services"
            className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-primary hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl"
          >
            View All Services
          </Link>
        </div>
      </div>
    </section>
  );
}
