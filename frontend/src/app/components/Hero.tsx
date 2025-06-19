"use client";

import Image from "next/image";
import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

export default function HeroSection() {
  const statsRef = useRef(null);
  const isInView = useInView(statsRef, { once: true, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const statVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
      },
    }),
  };

  const stats = [
    { value: "150+", label: "Trusted Clients" },
    { value: "10,000+", label: "Sales Professionals" },
    { value: "15+", label: "Years Of Experience" },
    { value: "750+", label: "Sales People Recruited" },
  ];

  return (
    <section className="bg-[#E5F6FD] px-6 md:px-12 py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-8">
        {/* Left Content */}
        <div>
          <h1 className="text-3xl md:text-5xl font-bold text-[#1A3C56] leading-tight mb-4">
            We Empower <br />
            Your <span className="text-[#02A1C7]">Sales Teams</span>
          </h1>
          <p className="text-[#333] text-base md:text-lg mb-6 max-w-lg">
            Transform your sales performance with our proven training programs.
            Build high-performing teams through expert coaching and strategic
            development.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-[#195872] text-white px-6 py-3 rounded-full font-medium hover:opacity-90 transition">
              Start Your Transformation
            </button>
            <button className="border border-[#195872] text-[#195872] px-6 py-3 rounded-full font-medium hover:bg-[#195872] hover:text-white transition">
              Learn More
            </button>
          </div>
        </div>

        {/* Right Image */}
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

      {/* Animated Stats */}
      <div
        ref={statsRef}
        className="mt-12 bg-white md:rounded-full py-6 px-4 flex flex-wrap justify-around text-center shadow-sm max-w-6xl mx-auto rounded-3xl"
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
            <span className="text-sm md:text-base text-[#195872]">
              {stat.label}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
