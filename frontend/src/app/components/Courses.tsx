"use client";
import { useRef, useState } from "react";
import { Card } from "@/components/custom/card";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchMainCourses } from "@/lib/fetcher";

// Add CourseCard type
interface CourseCard {
  _id: string;
  name: string;
  description: string;
  accomplishments?: string[];
  imageSrc: string;
}

export default function Courses() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollIndex, setScrollIndex] = useState(1);
  const router = useRouter();

  // Fetch main courses
  const { data: cardData = [], isLoading, isError } = useQuery<CourseCard[]>({
    queryKey: ["mainCourses"],
    queryFn: fetchMainCourses,
  });

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

  const handleOnClick = () => {
    router.push("/courses");
  };

  if (isLoading) {
    return (
      <section className="py-16 px-4 max-w-7xl mx-auto text-center space-y-12 bg-[#E1F2FE]">
        <div className="text-center py-20">Loading courses...</div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="py-16 px-4 max-w-7xl mx-auto text-center space-y-12 bg-[#E1F2FE]">
        <div className="text-center py-20 text-red-500">Failed to load courses.</div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto text-center space-y-12 bg-[#E1F2FE]">
      <div className="text-start ml-4">
        <h2 className="md:text-5xl text-3xl font-bold text-[#195872]">
          Our Training Courses
        </h2>
        <p className="mt-4 text-[#4D4D4D]">
          Our courses offer comprehensive sales training solutions designed to
          drive measurable results and sustainable growth for your business.
        </p>

        {/* See More Courses button in small screens */}
        <div className="flex justify-end mt-4 md:hidden">
          <button className="rounded-full cursor-pointer w-[200px] bg-[#195872] p-2 text-white text-sm">
            See More Courses {"->"}
          </button>
        </div>
      </div>

      {/* Cards Section */}
      <div className="relative">
        {/* Desktop Grid */}
        <div className="hidden lg:grid grid-cols-3 gap-6">
          {cardData.map((card, index) => (
            <Card
              key={index}
              title={card.name}
              description={card.description}
              imageSrc={card.imageSrc}
            />
          ))}
        </div>

        {/* Mobile stacked layout (below md) */}
        {/* Mobile stacked layout (below md) */}
        <div className="flex flex-col gap-6 lg:hidden md:hidden">
          {cardData.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <Card
                title={card.name}
                description={card.description}
                imageSrc={card.imageSrc}
              />
            </motion.div>
          ))}
        </div>

        {/* Carousel for md screens only */}
        <div className="hidden md:flex lg:hidden items-center">
          <button onClick={() => scroll("left")} className="p-2">
            <ChevronLeft />
          </button>
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory w-full px-2"
          >
            {cardData.map((card, index) => (
              <Card
                key={index}
                title={card.name}
                description={card.description}
                imageSrc={card.imageSrc}
              />
            ))}
          </div>
          <button onClick={() => scroll("right")} className="p-2">
            <ChevronRight />
          </button>
        </div>

        {/* Pagination dots (only for md) */}
        <div className="hidden md:flex lg:hidden justify-center gap-2 pt-4">
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

      {/* Bottom Row */}
      <div className="flex justify-between md:flex-row flex-col space-y-2 mt-12 mx-6">
        <p className="max-w-[550px] text-[#4D4D4D] text-lg text-start">
          We can also offer Customised Courses based on your specifications on
          the topic of sales
        </p>

        {/* Desktop "See More Courses" Button */}
        <div className="hidden md:block">
          <button
            className="rounded-full cursor-pointer w-[230px] bg-[#195872] p-2 text-white"
            onClick={handleOnClick}
          >
            See More Courses {"->"}
          </button>
        </div>
      </div>
    </section>
  );
}