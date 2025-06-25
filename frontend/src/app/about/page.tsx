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
import { useQuery } from "@tanstack/react-query";
import { fetchAboutPageContent, fetchTeamMembers } from "@/lib/fetcher";


const iconMap: Record<string, React.ReactNode> = {
  trendingUp: <TrendingUp size={32} className="text-[#195872] mx-auto mb-2" />,
  users: <Users size={32} className="text-[#195872] mx-auto mb-2" />,
  star: <Star size={32} className="text-[#195872] mx-auto mb-2" />,
  barChart2: <BarChart2 size={32} className="text-[#195872] mx-auto mb-2" />,
};

export default function AboutSections() {
  const teamScrollRef = useRef<HTMLDivElement>(null);

  // Fetch About Page Content (mission, values)
  const { data: aboutContent, isLoading: aboutLoading } = useQuery({
    queryKey: ["aboutPageContent"],
    queryFn: fetchAboutPageContent,
  });

  // Fetch Team Members
  const { data: teamMembers, isLoading: teamLoading } = useQuery({
    queryKey: ["teamMembers"],
    queryFn: fetchTeamMembers,
  });

  const scrollTeam = (dir: "left" | "right") => {
    const container = teamScrollRef.current;
    if (!container) return;
    const cardWidth = container.offsetWidth * 0.85;
    container.scrollBy({
      left: dir === "left" ? -cardWidth : cardWidth,
      behavior: "smooth",
    });
  };

  // Loading state
  if (aboutLoading || teamLoading) {
    return <div className="text-center py-20">Loading...</div>;
  }

  return (
    <section className="space-y-24">
      {/* Our Mission */}
      <div className="bg-[#EAF6FB] px-4 py-16 flex flex-col md:flex-row gap-8 items-center max-w-7xl mx-auto ">
        <div className="md:w-2/3 space-y-4 ml-4">
          <h2 className="text-5xl font-bold text-[#195872]">Our Mission</h2>
          <p className="text-black text-base md:text-lg">
            {aboutContent?.missionStatement}
          </p>
        </div>
        <div className="md:w-1/3 mr-4">
          {aboutContent?.missionImage?.asset?.url && (
            <Image
              src={aboutContent.missionImage.asset.url}
              alt="Our Mission"
              width={400}
              height={300}
              className="rounded-3xl object-cover w-full h-auto"
            />
          )}
        </div>
      </div>

      {/* Our Values */}
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="md:text-5xl text-3xl font-bold text-[#195872] mb-6">
          Our Values
        </h2>
        <p className="mb-12 text-[#4D4D4D] text-base">
          {aboutContent?.valuesStatement ||
            "These are some of the core principles that guide everything we do"}
        </p>
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {aboutContent?.coreValues?.map((value: any, idx: number) => (
            <motion.div
              key={value._id || idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="bg-white shadow-md rounded-t-[40px] rounded-b-[40px] w-[250px] p-6 text-center"
            >
              {/* Icon from iconKey, fallback to image if not set */}
              {value.iconKey && iconMap[value.iconKey]}
              {!value.iconKey && value.image?.asset?.url && (
                <Image
                  src={value.image.asset.url}
                  alt={value.name}
                  width={64}
                  height={64}
                  className="mx-auto mb-2 rounded-full object-cover"
                />
              )}
              <h3 className="text-xl font-bold text-[#195872] mb-2">
                {value.name}
              </h3>
              <p className="text-base text-[#4D4D4D]">{value.text}</p>
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
              {teamMembers?.map((person: any, index: number) => (
                <Card
                  key={person._id || index}
                  title={person.name}
                  description={person.role}
                  imageSrc={person.image?.asset?.url || "/images/team-placeholder.jpg"}
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
                {teamMembers?.map((person: any, index: number) => (
                  <Card
                    key={person._id || index}
                    title={person.name}
                    description={person.role}
                    imageSrc={person.image?.asset?.url || "/images/team-placeholder.jpg"}
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
