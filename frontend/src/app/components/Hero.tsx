"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { useInView, useAnimation, motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { fetchHomepageContent } from "@/lib/fetcher";

export default function HeroSection() {
  const statsRef = useRef(null);
  const isInView = useInView(statsRef, { once: true, margin: "-100px" });
  const controls = useAnimation();

  const { data: content, isLoading } = useQuery({
    queryKey: ["homepageContent"],
    queryFn: fetchHomepageContent,
  });

  useEffect(() => {
    if (isInView) controls.start("visible");
  }, [isInView, controls]);

  const statVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6 },
    }),
  };

  const stats = content
    ? [
        { value: `${content.clientsCount}+`, label: "Trusted Clients" },
        {
          value: `${content.professionalsTrainedCount.toLocaleString()}+`,
          label: "Sales Professionals",
        },
        {
          value: `${content.yearsOfExperience}+`,
          label: "Years of Experience",
        },
        {
          value: `${content.peopleRecruitedCount}+`,
          label: "Sales People Recruited",
        },
      ]
    : [];

  if (isLoading || !content) {
    return (
      <section className="bg-[#E5F6FD] px-6 md:px-12 py-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-8">
          <div>
            <div className="h-12 w-3/4 bg-gray-200 rounded mb-4 animate-pulse" />
            <div className="h-6 w-2/3 bg-gray-100 rounded mb-6 animate-pulse" />
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="h-12 w-48 bg-gray-200 rounded-full animate-pulse" />
              <div className="h-12 w-48 bg-gray-100 rounded-full animate-pulse" />
            </div>
          </div>
          <div className="flex justify-center md:justify-end">
            <div className="w-[500px] h-[400px] bg-gray-200 rounded-[30px] animate-pulse" />
          </div>
        </div>
        {/* Stats Skeleton */}
        <div
          className="mt-12 bg-white/45 md:rounded-full py-6 px-4 flex flex-wrap justify-around text-center shadow-sm max-w-6xl mx-auto rounded-3xl"
        >
          {[1,2,3,4].map((_, index) => (
            <div
              key={index}
              className="flex flex-col px-4 py-2 min-w-[130px]"
            >
              <div className="h-8 w-16 bg-gray-200 rounded mx-auto mb-2 animate-pulse" />
              <div className="h-4 w-24 bg-gray-100 rounded mx-auto animate-pulse" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#E5F6FD] px-6 md:px-12 py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-8">
        <div>
          <h1 className="text-3xl md:text-5xl font-bold text-[#1A3C56] leading-tight mb-4">
            {content.heroTitle}
          </h1>
          <p className="text-[#333] text-base md:text-lg mb-6 max-w-lg">
            {content.heroDescription}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-[#195872] text-white px-6 py-3 rounded-full font-medium hover:opacity-90 transition cursor-pointer">
              Start Your Transformation
            </button>
            <button className="border border-[#195872] text-[#195872] px-6 py-3 rounded-full font-medium bg-white cursor-pointer">
              Learn More
            </button>
          </div>
        </div>

        <div className="flex justify-center md:justify-end">
          <Image
            src="/images/hero.jpg"
            alt="Graph"
            width={500}
            height={400}
            className="rounded-[30px] object-cover shadow-md"
          />
        </div>
      </div>

      {/* Stats */}
      <div
        ref={statsRef}
        className="mt-12 bg-white/45 md:rounded-full py-6 px-4 flex flex-wrap justify-around text-center shadow-sm max-w-6xl mx-auto rounded-3xl"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            custom={index}
            initial="hidden"
            animate={controls}
            variants={statVariants}
            className="flex flex-col px-4 py-2 min-w-[130px]"
          >
            <span className="text-2xl md:text-3xl font-bold text-[#195872]">
              {stat.value}
            </span>
            <span className="text-sm md:text-base font-bold text-[#195872]">
              {stat.label}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
