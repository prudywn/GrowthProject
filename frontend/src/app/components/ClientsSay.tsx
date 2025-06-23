"use client";
import { TestimonialsCard } from "@/components/custom/testimonials-card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useRef, useState } from "react";

const cardData = [
  {
    description:
      "GrowthPartners transformed our entire sales approach. Our team's performance improved by 45% within just 3 months of their training program. The results speak for themselves.",
  },
  {
    description:
      "GrowthPartners transformed our entire sales approach. Our team's performance improved by 45% within just 3 months of their training program. The results speak for themselves.",
  },
  {
    description:
      "GrowthPartners transformed our entire sales approach. Our team's performance improved by 45% within just 3 months of their training program. The results speak for themselves.",
  },
];

export default function ClientsSay() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollIndex, setScrollIndex] = useState(1);

  const scroll = (dir: "left" | "right") => {
    const container = scrollRef.current;
    if (!container) return;
    const cardWidth = container.offsetWidth * 0.85;
    container.scrollBy({
      left: dir === "left" ? -cardWidth : cardWidth,
      behavior: "smooth",
    });

    setScrollIndex((prev) =>
      dir === "left"
        ? Math.max(prev - 1, 0)
        : Math.min(prev + 1, cardData.length - 1)
    );
  };
  return (
    <section className="py-24 px-4 max-w-7xl ml-4 mr-4 text-center space-y-12">
      <div className="text-start">
        <h2 className="md:text-5xl text-3xl  font-bold text-[#195872]">
          What Our Clients Say
        </h2>
        <p className="mt-4 text-black">
          Here’s what some of our clients from high profile businesses had to
          say after working with us.
        </p>
      </div>

      {/* Cards Section */}
      <div className="relative">
        {/* Desktop Grid */}
        <div className="hidden lg:grid grid-cols-3 gap-6">
          {cardData.map((card, index) => (
            <TestimonialsCard key={index} description={card.description} />
          ))}
        </div>

        {/* Carousel for md screens only */}
        <div className=" flex lg:hidden items-center">
          <button onClick={() => scroll("left")} className="p-2">
            <ChevronLeft />
          </button>
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory w-full px-2"
          >
            {cardData.map((card, index) => (
              <TestimonialsCard key={index} description={card.description} />
            ))}
          </div>
          <button onClick={() => scroll("right")} className="p-2">
            <ChevronRight />
          </button>
        </div>

        {/* Pagination dots (only for md) */}
        <div className=" flex lg:hidden justify-center gap-2 pt-4">
          {cardData.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full ${
                i === scrollIndex ? "bg-slate-600" : "bg-slate-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
