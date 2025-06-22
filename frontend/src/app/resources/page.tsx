"use client";
import React from "react";
import FeaturedArticles from "../components/FeaturedArticles";
import LatestArticles from "../components/LatestArticles";

export default function page() {
  return (
    <div>
      <div className="flex-col space-y-3 pl-3 bg-[#E1F2FE] h-40 flex items-start justify-center">
        <h1 className="text-[#195872] font-bold text-4xl ">
          Get Sales Improvement Ideas
        </h1>
        <p className="text-[#4D4D4D] text-base">
          Get actionable insights, strategies, and expert advice to help your
          sales team reach new heights of performance and success from our blog
        </p>
      </div>
      <FeaturedArticles />
      <LatestArticles />
    </div>
  );
}
