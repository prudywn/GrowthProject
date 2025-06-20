"use client";

import Image from "next/image";
import {
  ArrowRight,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Clock,
} from "lucide-react";
import { useRef, useState, useEffect } from "react";
import clsx from "clsx";

const articles = [
  {
    id: 1,
    image: "/images/resources.jpg",
    category: "Sales Techniques",
    title: "5 Proven Techniques to Close More Deals in Less Time",
    description:
      "Learn the time-tested closing techniques that top sales professionals use to increase their conversion rates and close deals faster.",
    author: {
      name: "Sarah Williams",
      role: "Sales Director",
      avatar: "/images/resources.jpg",
    },
    readTime: "8 min read",
  },
  {
    id: 2,
    image: "/images/resources.jpg",
    category: "Marketing",
    title: "Creating a Funnel That Converts",
    description:
      "Explore how to design a high-conversion funnel that turns visitors into paying customers.",
    author: {
      name: "James Carter",
      role: "Marketing Strategist",
      avatar: "/images/resources.jpg",
    },
    readTime: "6 min read",
  },
  {
    id: 3,
    image: "/images/resources.jpg",
    category: "Business Growth",
    title: "How to Scale Your Sales Team",
    description:
      "Discover frameworks to grow and train your sales team efficiently with real-world case studies.",
    author: {
      name: "Linda Moore",
      role: "Business Coach",
      avatar: "/images/resources.jpg",
    },
    readTime: "7 min read",
  },
];

export default function FeaturedArticles() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const scrollToIndex = (index: number) => {
    if (scrollRef.current) {
      const width = scrollRef.current.offsetWidth;
      scrollRef.current.scrollTo({
        left: width * index,
        behavior: "smooth",
      });
    }
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const width = scrollRef.current.offsetWidth;
      const index = Math.round(scrollLeft / width);
      setCurrentSlide(index);
    }
  };

  useEffect(() => {
    const ref = scrollRef.current;
    if (ref) ref.addEventListener("scroll", handleScroll);
    return () => ref?.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="py-10 px-4 max-w-6xl mx-auto relative">
      <h1 className="text-[#195872] md:text-4xl text-3xl font-bold py-4">
        Featured Articles
      </h1>

      {/* Arrow Buttons (only on lg+) */}
      <div className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 z-10">
        <button
          onClick={() => scrollToIndex(currentSlide - 1)}
          className="bg-[#E1F2FE] border shadow p-2 rounded-full "
        >
          <ChevronLeft />
        </button>
      </div>
      <div className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 z-10">
        <button
          onClick={() => scrollToIndex(currentSlide + 1)}
          className="bg-[#E1F2FE] border shadow p-2 rounded-full "
        >
          <ChevronRight />
        </button>
      </div>

      {/* Horizontal Scrollable Container */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth space-x-4 no-scrollbar"
      >
        {articles.map((article, index) => (
          <div
            key={article.id}
            className="min-w-full snap-center flex flex-col lg:flex-row bg-white rounded-3xl shadow-md overflow-hidden border "
          >
            {/* Image */}
            <div className="w-full lg:w-1/2 h-64 lg:h-auto relative">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Content */}
            <div className="w-full lg:w-1/2 p-6 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <span className="bg-[#E6F4F1] text-[#195872]  px-3 py-1 rounded-full inline-block w-max">
                  {article.category}
                </span>
                <h3 className="text-lg md:text-3xl font-bold text-[#195872]">
                  {article.title}
                </h3>
                <p className="text-gray-600 text-base md:text-lg">
                  {article.description}
                </p>
              </div>

              <div className="flex items-start  flex-col flex-wrap gap-2 mt-4">
                <div className="flex items-center gap-2">
                  <Image
                    src={article.author.avatar}
                    alt={article.author.name}
                    width={36}
                    height={32}
                    className="rounded-full"
                  />
                  <div className="text-lg ml-3">
                    <p className="font-semibold">{article.author.name}</p>
                    <p className="text-gray-500 text-base">
                      {article.author.role}
                    </p>
                  </div>
                </div>

                <div className="flex items-center  text-base lg:gap-x-40 gape-x-20  mt-2 lg:mt-3">
                  <button className="flex items-center bg-[#195872] text-white px-4 py-2 rounded-full text-base transition mr-8">
                    <BookOpen className="mr-2 w-4 h-4" /> Read Article
                  </button>
                  <p className="text-[#195872] ml-10 flex items-center">
                    <Clock className="mr-2 w-4 h-4" /> {article.readTime}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center mt-4 space-x-2">
        {articles.map((_, idx) => (
          <div
            key={idx}
            className={clsx(
              "h-2 w-2 rounded-full transition-all",
              currentSlide === idx ? "bg-[#195872]" : "bg-gray-300"
            )}
          />
        ))}
      </div>
    </section>
  );
}
