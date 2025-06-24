import { BookOpen, Clock } from "lucide-react";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { PortableText, PortableTextBlock } from "@portabletext/react";

interface ArticleCardProps {
  article: {
    _id: string;
    title: string;
    mainImage: { asset: { url: string } };
    categories?: string[];
    body?: { children?: { text?: string }[] }[];
    authorImage?: { asset: { url: string } };
    authorName: string;
    authorBio: PortableTextBlock[];
    slug: { current: string };
    readTime?: string;
  };
}

export default function Post({ article }: ArticleCardProps) {
  return (
    <div className="snap-start shrink-0 w-[90%] md:w-[620px] bg-white rounded-[24px] overflow-hidden shadow-md flex flex-col md:flex-row transition-all">
      {/* Image */}
      <div className="w-full md:w-1/2 h-48 md:h-auto relative">
        <Image
          src={article.mainImage.asset.url}
          alt={article.title}
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
        {/* Category Tag */}
        {article.categories?.[0] && (
          <span className="text-sm bg-[#E1F2FE] text-black font-semibold px-3 py-1 rounded-full w-fit">
            ● {article.categories[0]}
          </span>
        )}

        {/* Title & Description */}
        <div>
          <h3 className="text-[#195872] font-bold text-lg leading-snug mb-1">
            {article.title}
          </h3>
          <p className="text-base text-gray-600 line-clamp-3">
            {article.body?.[0]?.children?.[0]?.text}
          </p>
        </div>

        {/* Author + CTA */}
        <div className="flex items-start flex-col flex-wrap gap-2 mt-4">
          <div className="flex items-center gap-3">
            {article.authorImage?.asset.url && (
              <Image
                src={article.authorImage.asset.url}
                alt={article.authorName}
                width={48}
                height={48}
                className="rounded-full"
              />
            )}
            <div>
              <p className="text-base font-semibold">{article.authorName}</p>
              <p className="text-sm text-gray-500">
                <PortableText value={article.authorBio} />
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 lg:gap-x-8 mt-2 lg:mt-3">
            {article.slug?.current ? (
              <Link href={`/articles/${article.slug.current}`}>
                <button className="bg-[#195872] text-white text-base px-4 py-2 rounded-full flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  Read Article
                </button>
              </Link>
            ) : null}
            <span className="text-sm text-gray-500 flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {article.readTime || "5 min"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
