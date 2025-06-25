'use client';

import { motion } from 'framer-motion';
import React from 'react';
import { useQuery } from "@tanstack/react-query";
import { fetchAboutPageContent } from "@/lib/fetcher";

export default function CEOVideoSection() {
  const { data: aboutContent, isLoading } = useQuery({
    queryKey: ["aboutPageContent"],
    queryFn: fetchAboutPageContent,
  });

  const videoUrl = aboutContent?.ceoVideoUrl; 

  if (isLoading || !videoUrl) return null;

  return (
    <section className="px-4 py-10 sm:py-14 md:py-20 bg-white">
      <div className="max-w-5xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#195872] mb-8"
        >
          Here's what our C.E.O has to say
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative w-full aspect-video max-w-4xl mx-auto overflow-hidden rounded-xl shadow-md"
        >
          <iframe
            className="w-full h-full"
            src={videoUrl}
            title="C.E.O Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </motion.div>
      </div>
    </section>
  );
}
