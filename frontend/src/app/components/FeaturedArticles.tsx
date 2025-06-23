"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { sanityClient } from "@/lib/sanity";
import { getAllPostsQuery } from "@/lib/queries";
import ArticleCard from "@/components/custom/ArticleCard";
import ArticleCardSkeleton from "@/components/custom/ArticleCardSkeleton";

interface Article {
  _id: string;
  title: string;
  mainImage: {
    asset: {
      url: string;
    };
  };
  categories?: string[];
  body?: { children?: { text?: string }[] }[];
  authorImage?: {
    asset: {
      url: string;
    };
  };
  authorName: string;
  slug: {
    current: string;
  };
  readTime: string;
}

export default function FeaturedArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchArticles() {
      setLoading(true);
      try {
        const posts = await sanityClient.fetch(getAllPostsQuery);
        setArticles(posts);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchArticles();
  }, []);

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
    <section className="py-10 px-4 max-w-[1200px] mx-auto relative">
      <h1 className="text-[#195872] text-start md:text-4xl text-3xl font-bold py-4">
        Featured Articles
      </h1>

      {/* Arrows */}
      <div className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 z-10">
        <button
          onClick={() => scrollToIndex(currentSlide - 1)}
          className="bg-[#E1F2FE] border shadow p-2 rounded-full"
        >
          <ChevronLeft />
        </button>
      </div>
      <div className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 z-10">
        <button
          onClick={() => scrollToIndex(currentSlide + 1)}
          className="bg-[#E1F2FE] border shadow p-2 rounded-full"
        >
          <ChevronRight />
        </button>
      </div>

      <div
        ref={scrollRef}
        className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth space-x-4 no-scrollbar"
      >
        {loading
          ? Array.from({ length: 3 }).map((_, i) => (
              <ArticleCardSkeleton key={i} />
            ))
          : articles
              .slice(0, 3)
              .map((article) => (
                <ArticleCard key={article._id} article={article} />
              ))}
      </div>

      {/* Dots */}
      {!loading && (
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
      )}
    </section>
  );
}
