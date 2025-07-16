"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { fetchHomepageContent } from "@/lib/fetcher";

export default function HeroSection() {
  const { data: content, isLoading } = useQuery({
    queryKey: ["homepageContent"],
    queryFn: fetchHomepageContent,
  });

  const statVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.6 },
    }),
  };

  const stats =
    content && [
      {
        value: `${content.clientsCount}+`,
        label: "Happy Clients",
      },
      {
        value: `${content.professionalsTrainedCount.toLocaleString()}+`,
        label: "Professionals Trained",
      },
      {
        value: `${content.yearsOfExperience}+`,
        label: "Years of Experience",
      },
      {
        value: `${content.peopleRecruitedCount}+`,
        label: "People Recruited",
      },
    ];

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
            <Link 
              href="/contact-us" 
              className="bg-[#195872] text-white px-6 py-3 rounded-full font-medium hover:opacity-90 transition cursor-pointer text-center"
            >
              Start Your Transformation
            </Link>
            <Link 
              href="/services" 
              className="border border-[#195872] text-[#195872] px-6 py-3 rounded-full font-medium bg-white cursor-pointer text-center hover:bg-[#195872] hover:text-white transition"
            >
              Learn More
            </Link>
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
        className="mt-12 bg-[#195872] md:rounded-full py-8 px-4 flex flex-wrap justify-around text-center shadow-lg max-w-6xl mx-auto rounded-3xl"
      >
        {stats.map((stat: any, index: number) => (
          <motion.div
            key={stat.label}
            custom={index}
            initial="hidden"
            animate="visible"
            variants={statVariants}
            className="flex flex-col px-4 py-2 min-w-[130px]"
          >
            <span className="text-3xl md:text-4xl font-bold text-white">
              {stat.value}
            </span>
            <span className="text-sm md:text-base text-white/90">
              {stat.label}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
