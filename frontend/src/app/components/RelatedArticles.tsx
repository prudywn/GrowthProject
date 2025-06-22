"use client";
import { useRef, useEffect, useState } from "react";
import clsx from "clsx";

import Post from "@/components/custom/Post";
import { PortableTextBlock } from "@portabletext/react";

interface RelatedArticlesProps {
  posts: {
    _id: string;
    title: string;
    slug: { current: string };
    mainImage: { asset: { url: string } };
    authorName: string;
    authorImage?: { asset: { url: string } };
    authorBio: PortableTextBlock[];
    readTime?: string;
    categories?: string[];
    body?: { children?: { text?: string }[] }[];
  }[];
}

export default function RelatedArticles({ posts }: RelatedArticlesProps) {
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
    <section className="mt-12">
      <h2 className="text-3xl font-bold text-[#195872] mb-2">
        Related Articles
      </h2>
      <p className="text-gray-600 mb-6">
        Get the latest insights and strategies from top sales professionals
        around the globe.
      </p>

      {/* Slider */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth space-x-6 no-scrollbar pb-4"
      >
        {posts.map((post) => (
          <Post key={post._id} article={post} />
        ))}
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center mt-4 space-x-2">
        {posts.map((_, idx) => (
          <div
            key={idx}
            className={clsx(
              "h-2 w-2 rounded-full transition-all",
              currentSlide === idx ? "bg-[#195872]" : "bg-blue-100"
            )}
          />
        ))}
      </div>
    </section>
  );
}
