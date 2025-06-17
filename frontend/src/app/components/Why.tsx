"use client";
import { useRef, useState } from "react";
import { Card } from "@/components/custom/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const cardData = [
  {
    title: "Philosophy",
    description:
      "Sales training must deliver ROI, from design to post-training reinforcement.",
    imageSrc: "/philosophy.jpg",
  },
  {
    title: "Sales Results Commitment",
    description:
      "Training is part of a larger engine driving measurable sales success.",
    imageSrc: "/sales-commitment.jpg",
  },
  {
    title: "Approach",
    description:
      "Global best practices tailored to local business needs make real impact.",
    imageSrc: "/approach.jpg",
  },
];

export default function WhyGrowthPartners() {
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
    <section className="py-16 px-4 max-w-7xl mx-auto text-center space-y-12">
      <div className="text-start">
        <h2 className="md:text-5xl text-3xl  font-bold text-[#195872]">
          Why Growth Partners
        </h2>
        <p className="mt-4 text-black">
          The leading consultancy dedicated to driving measurable sales
          performance improvement in the region.
        </p>
      </div>

      {/* Carousel Wrapper */}
      <div className="relative">
        <div className="hidden lg:grid grid-cols-3 ">
          <Card
            title="Philosophy"
            description="Sales training must deliver ROI, from design to post-training reinforcement."
            imageSrc="/images/philosophy.jpg"
          />
          <Card
            title="Sales Results Commitment"
            description="Training is part of a larger engine driving measurable sales success."
            imageSrc="/images/sales-result.jpg"
          />
          <Card
            title="Approach"
            description="Global best practices tailored to local business needs make real impact."
            imageSrc="/images/approach.png"
          />
        </div>

        {/* Mobile Carousel */}
        <div className="lg:hidden flex items-center">
          <button onClick={() => scroll("left")} className="p-2">
            <ChevronLeft />
          </button>
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory w-full px-2"
          >
            <Card
              title="Philosophy"
              description="Sales training must deliver ROI, from design to post-training reinforcement."
              imageSrc="/images/philosophy.jpg"
            />
            <Card
              title="Sales Results Commitment"
              description="Training is part of a larger engine driving measurable sales success."
              imageSrc="/images/sales-result.jpg"
            />
            <Card
              title="Approach"
              description="Global best practices tailored to local business needs make real impact."
              imageSrc="/images/approach.png"
            />
          </div>
          <button onClick={() => scroll("right")} className="p-2">
            <ChevronRight />
          </button>
        </div>

        {/* Pagination dots */}
        <div className="lg:hidden flex justify-center gap-2 pt-4">
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
