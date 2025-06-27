"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { fetchTrustedClients } from "@/lib/fetcher";

export default function Companies() {
  // Fetch trusted clients from Sanity
  const { data: clients = [], isLoading } = useQuery({
    queryKey: ["trustedClients"],
    queryFn: fetchTrustedClients,
  });

  if (isLoading) {
    return <div className="text-center py-20">Loading companies...</div>;
  }

  // Extract logo URLs
  const logos = clients.map((client: any) => client.logo?.asset?.url).filter(Boolean);

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto space-y-12 overflow-hidden">
      <div className="text-start ml-4 space-y-4">
        <h1 className="md:text-5xl text-3xl font-bold text-[#195872]">
          Trusted by Leading Companies
        </h1>
        <p className="text-[#4D4D4D] text-lg">
          Join hundreds of successful businesses that have transformed their
          sales performance
        </p>
      </div>

      <div className="relative w-full overflow-hidden">
        <motion.div
          className="flex gap-16 w-max items-center"
          initial={{ x: 0 }}
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            duration: 20,
            ease: "linear",
          }}
        >
          {logos.concat(logos).map((src: string, index: number) => (
            <Image
              key={index}
              src={src}
              alt={`company-logo-${index}`}
              width={120}
              height={120}
              className="  transition duration-300 ease-in-out"
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
