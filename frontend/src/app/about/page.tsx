// components/AboutSections.tsx
"use client";

import Image from "next/image";
import React, { useRef } from "react";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Users,
  Star,
  BarChart2,
} from "lucide-react";
import { Card } from "@/components/custom/card";

const values = [
  {
    icon: <TrendingUp size={32} className="text-[#195872] mx-auto mb-2" />,
    title: "Results-Driven",
    description:
      "We focus on measurable outcomes and sustainable growth for every client we serve.",
  },
  {
    icon: <Users size={32} className="text-[#195872] mx-auto mb-2" />,
    title: "People-First",
    description:
      "We believe that great sales results come from empowering and developing great people.",
  },
  {
    icon: <Star size={32} className="text-[#195872] mx-auto mb-2" />,
    title: "Excellence",
    description:
      "We maintain the highest standards in everything we do, from training to client service.",
  },
  {
    icon: <BarChart2 size={32} className="text-[#195872] mx-auto mb-2" />,
    title: "Continuous Growth",
    description:
      "We're committed to staying ahead of industry trends and evolving our methodologies.",
  },
];

const team = [
  {
    title: "Samuel Karuri",
    description: "CEO",
    imageSrc: "/images/team1.jpg",
  },
  {
    title: "Samuel Ndubi",
    description: "CTO",
    imageSrc: "/images/team2.jpg",
  },
  {
    title: "Samuel Kimani",
    description: "COO",
    imageSrc: "/images/team3.jpg",
  },
];

export default function AboutSections() {
  const teamScrollRef = useRef<HTMLDivElement>(null);

  const scrollTeam = (dir: "left" | "right") => {
    const container = teamScrollRef.current;
    if (!container) return;
    const cardWidth = container.offsetWidth * 0.85;
    container.scrollBy({
      left: dir === "left" ? -cardWidth : cardWidth,
      behavior: "smooth",
    });
  };

  return (
    <section className="space-y-24">
      {/* Our Mission */}
      <div className="bg-[#EAF6FB] px-4 py-16 flex flex-col md:flex-row gap-8 items-center max-w-7xl mx-auto ">
        <div className="md:w-2/3 space-y-4 ml-4">
          <h2 className="text-4xl font-bold text-[#195872]">Our Mission</h2>
          <p className="text-black text-base md:text-lg">
            To provide high-leverage business growth solutions in the form of
            ideas, products, and services. We do this through innovation in the
            solutions we provide and how we deliver them. We aim to see each of
            our clients maximize returns from the financial and time invested in
            our services.
          </p>
        </div>
        <div className="md:w-1/3 mr-4">
          <Image
            src="/images/about.jpg"
            alt="Our Mission"
            width={400}
            height={300}
            className="rounded-3xl object-cover w-full h-auto"
          />
        </div>
      </div>

      {/* Our Values */}
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="md:text-5xl text-3xl font-bold text-[#195872] mb-6">
          Our Values
        </h2>
        <p className="mb-12 text-[#4D4D4D] text-base">
          These are some of the core principles that guide everything we do
        </p>
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {values.map((value, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="bg-white shadow-md rounded-t-[40px] rounded-b-[40px] w-[250px] p-6 text-center"
            >
              {value.icon}
              <h3 className="text-xl font-bold text-[#195872] mb-2">
                {value.title}
              </h3>
              <p className="text-base text-[#4D4D4D]">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Meet Our Team */}
      <div className="bg-[#EAF6FB] py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-[#195872] text-center mb-12">
            Meet Our Team
          </h2>
          <div className="relative">
            <div className="hidden md:grid grid-cols-3 gap-6">
              {team.map((person, index) => (
                <Card
                  key={index}
                  title={person.title}
                  description={person.description}
                  imageSrc={person.imageSrc}
                />
              ))}
            </div>

            {/* Mobile Scroll */}
            <div className="md:hidden flex items-center">
              <button onClick={() => scrollTeam("left")} className="p-2">
                <ChevronLeft />
              </button>
              <div
                ref={teamScrollRef}
                className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory w-full px-2"
              >
                {team.map((person, index) => (
                  <Card
                    key={index}
                    title={person.title}
                    description={person.description}
                    imageSrc={person.imageSrc}
                  />
                ))}
              </div>
              <button onClick={() => scrollTeam("right")} className="p-2">
                <ChevronRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
