"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { Card } from "@/components/custom/card";
import { extractPlainText } from "@/lib/utils";
import type { SimpleService } from "@/types";

export interface ServicesSectionProps {
  title: string;
  description: string;
  featuredServices: SimpleService[];
}

export default function ServicesSection({
  title,
  description,
  featuredServices,
}: ServicesSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollIndex, setScrollIndex] = useState(0);

  const scroll = (dir: "left" | "right") => {
    const container = scrollRef.current;
    if (!container) return;
    const cardWidth = container.offsetWidth / 3; // Show 3 cards at a time
    container.scrollBy({
      left: dir === "left" ? -cardWidth : cardWidth,
      behavior: "smooth",
    });

    setScrollIndex((prev) =>
      dir === "left"
        ? Math.max(prev - 1, 0)
        : Math.min(prev + 1, Math.max(0, featuredServices.length - 3))
    );
  };

  if (!featuredServices?.length) {
    return null;
  }

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto text-center space-y-12 bg-[#E1F2FE]">
      <div className="text-start ml-4">
        <h2 className="md:text-5xl text-3xl font-bold text-[#195872]">
          {title}
        </h2>
        <p className="mt-4 text-[#4D4D4D]">{description}</p>

        {/* See More Services button in small screens */}
        <div className="flex justify-end mt-4 md:hidden">
          <Link href="/services">
            <button className="rounded-full cursor-pointer w-[200px] bg-[#195872] p-2 text-white text-sm hover:bg-[#2a5d73] transition-colors">
              See More Services {"->"}
            </button>
          </Link>
        </div>
      </div>

      {/* Cards Section */}
      <div className="relative">
        {/* Desktop Grid - Show only 3 cards */}
        <div className="hidden lg:grid grid-cols-3 gap-6 max-w-6xl mx-auto">
          {featuredServices.slice(0, 3).map((service, index) => (
            <motion.div
              key={service._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <Card
                title={service.name || ''}
                description={extractPlainText(service.description)}
                imageSrc={service.imageSrc}
                slug={service.slug?.current}
                category={service.category && typeof service.category.title === 'string' ? {
                  title: service.category.title,
                  color: service.category.color
                } : undefined}
                showViewButton={true}
                viewButtonText="View Service"
                comingSoonText="Service Details Coming Soon"
              />
            </motion.div>
          ))}
        </div>

        {/* Mobile stacked layout (below md) */}
        <div className="flex flex-col gap-6 lg:hidden md:hidden">
          {featuredServices.slice(0, 3).map((service, index) => (
            <motion.div
              key={service._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <Card
                title={service.name || ''}
                description={extractPlainText(service.description)}
                imageSrc={service.imageSrc}
                slug={service.slug?.current}
                category={service.category && typeof service.category.title === 'string' ? {
                  title: service.category.title,
                  color: service.category.color
                } : undefined}
                showViewButton={true}
                viewButtonText="View Service"
                comingSoonText="Service Details Coming Soon"
              />
            </motion.div>
          ))}
        </div>

        {/* Carousel for md screens only - Show 3 cards with scroll */}
        <div className="hidden md:flex lg:hidden items-center">
          <button
            onClick={() => scroll("left")}
            className="p-2 disabled:opacity-50 hover:bg-white/20 rounded-full transition-colors"
            disabled={scrollIndex === 0}
          >
            <ChevronLeft className={scrollIndex === 0 ? "text-gray-400" : "text-gray-700"} />
          </button>
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory w-full px-2"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {featuredServices.map((service) => (
              <div key={service._id} className="flex-shrink-0 w-1/3">
                <Card
                  title={service.name}
                  description={service.description}
                  imageSrc={service.imageSrc}
                  slug={service.slug?.current}
                  category={service.category ? {
                    title: service.category.title,
                    color: service.category.color
                  } : undefined}
                  showViewButton={true}
                />
              </div>
            ))}
          </div>
          <button
            onClick={() => scroll("right")}
            className="p-2 disabled:opacity-50 hover:bg-white/20 rounded-full transition-colors"
            disabled={scrollIndex >= Math.max(0, featuredServices.length - 3)}
          >
            <ChevronRight className={scrollIndex >= Math.max(0, featuredServices.length - 3) ? "text-gray-400" : "text-gray-700"} />
          </button>
        </div>

        {/* Pagination dots (only for md) */}
        <div className="hidden md:flex lg:hidden justify-center gap-2 pt-4">
          {Array.from({
            length: Math.max(1, Math.ceil(featuredServices.length / 3)),
          }).map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full ${
                i === scrollIndex ? "bg-slate-600" : "bg-slate-300"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Bottom Row */}
      <div className="flex justify-between md:flex-row flex-col space-y-2 mt-12 mx-6">
        <p className="max-w-[550px] text-[#4D4D4D] text-lg text-start">
          We can also offer Customised Services based on your specifications and
          business requirements across various domains.
        </p>

        {/* Desktop "See More Services" Button */}
        <div className="hidden md:block">
          <Link href="/services">
            <button className="rounded-full cursor-pointer w-[230px] bg-[#195872] p-2 text-white hover:bg-[#2a5d73] transition-colors">
              See More Services {"->"}
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}