"use client";
import { useRef, useState } from "react";
import { Card } from "@/components/custom/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { fetchWhyUsContent } from "@/lib/fetcher";

export default function WhyGrowthPartners() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollIndex, setScrollIndex] = useState(1);

  // Fetch why us content from Sanity
  const { data: whyUsContent, isLoading } = useQuery({
    queryKey: ["whyUsContent"],
    queryFn: fetchWhyUsContent,
  });

  const whyUsPoints = whyUsContent?.whyUsPoints || [];

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
        : Math.min(prev + 1, whyUsPoints.length - 1)
    );
  };

  if (isLoading) {
    return <div className="text-center py-20">Loading...</div>;
  }

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto text-center space-y-12">
      <div className="text-start">
        <h2 className="md:text-5xl text-3xl  font-bold text-[#195872]">
          {whyUsContent?.miniboxTitle || "Why Growth Partners"}
        </h2>
        <p className="mt-4 text-black">
          {whyUsContent?.sectionDescription ||
            "The leading consultancy dedicated to driving measurable sales performance improvement in the region."}
        </p>
      </div>

      {/* Cards Section */}
      <div className="relative">
        {/* Desktop Grid */}
        <div className="hidden lg:grid grid-cols-3 gap-6">
          {whyUsPoints.map((point: any, index: number) => (
            <Card
              key={point._id || index}
              title={point.title}
              description={point.reason}
              imageSrc={point.image?.asset?.url}
            />
          ))}
        </div>

        {/* Mobile stacked layout (below md) */}
        <div className="flex flex-col gap-6 lg:hidden md:hidden">
          {whyUsPoints.map((point: any, index: number) => (
            <motion.div
              key={point._id || index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <Card
                title={point.title}
                description={point.reason}
                imageSrc={point.image?.asset?.url}
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
            {whyUsPoints.map((point: any, index: number) => (
              <Card
                key={point._id || index}
                title={point.title}
                description={point.reason}
                imageSrc={point.image?.asset?.url}
              />
            ))}
          </div>
          <button onClick={() => scroll("right")} className="p-2">
            <ChevronRight />
          </button>
        </div>

        {/* Pagination dots (only for md) */}
        <div className="hidden md:flex lg:hidden justify-center gap-2 pt-4">
          {whyUsPoints.map((_: any, i: number) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full ${
                i === scrollIndex ? "bg-slate-600" : "bg-slate-300"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Bottom Row (static for now) */}
      <div className="grid grid-cols-1 md:grid-cols-3  gap-2 mt-12">
        <div className="flex flex-col lg:flex-row items-center text-[#195872]">
          <div className="border rounded-full  px-2 py-1 bg-[#E1F2FE] mr-2">
            <Image
              width={20}
              height={20}
              src="/images/octicon_graph.png"
              alt=" "
              className="mb-2"
            />
          </div>
          <div className="flex justify-center flex-col">
            <h4 className="font-bold md:text-2xl text-lg ">
              High Performing Organization
            </h4>
            <p className="text-base">Strategies, Processes, Structures</p>
          </div>
        </div>
        <div className="flex justify-center flex-col lg:flex-row items-center text-[#195872]">
          <div className="border rounded-full  px-2 py-1 bg-[#E1F2FE] mr-2">
            <Image
              width={20}
              height={20}
              src="/images/graph-bar.png"
              alt=" "
              className="mb-2"
            />
          </div>
          <div className="flex flex-col">
            <h4 className="font-bold md:text-2xl text-lg">Increase Sales</h4>
            <p className="text-base">Sell better, sell more</p>
          </div>
        </div>
        <div className="flex justify-center flex-col lg:flex-row items-center text-[#195872]">
          <div className="border rounded-full  px-2 py-1 bg-[#E1F2FE] mr-2">
            <Image
              width={20}
              height={20}
              src="/images/award.png"
              alt=" "
              className="mb-2"
            />
          </div>
          <div className="flex flex-col">
            <h4 className="font-bold text-lg md:text-2xl">
              Winning Sales Team
            </h4>
            <p className="text-base">Skilled, Motivated, Professional</p>
          </div>
        </div>
      </div>
    </section>
  );
}
