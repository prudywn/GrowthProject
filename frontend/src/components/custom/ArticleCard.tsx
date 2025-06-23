import Image from "next/image";
import Link from "next/link";
import { BookOpen, Clock } from "lucide-react";

interface ArticleCardProps {
  article: {
    _id: string;
    title: string;
    mainImage: { asset: { url: string } };
    categories?: string[];
    body?: { children?: { text?: string }[] }[];
    authorImage?: { asset: { url: string } };
    authorName: string;
    slug: { current: string };
    readTime?: string;
  };
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <div className="min-w-full snap-center flex flex-col lg:flex-row bg-white rounded-3xl shadow-md overflow-hidden border">
      {/* Image */}
      <div className="w-full lg:w-1/2 h-64 lg:h-auto relative">
        <Image
          src={article.mainImage.asset.url}
          alt={article.title}
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="w-full lg:w-1/2 p-6 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <span className="bg-[#E6F4F1] text-[#195872] px-3 py-1 rounded-full inline-block w-max">
            {article.categories?.[0] || "General"}
          </span>
          <h3 className="text-lg md:text-3xl font-bold text-[#195872]">
            {article.title}
          </h3>
          <p className="text-gray-600 text-base md:text-lg line-clamp-3">
            {article.body?.[0]?.children?.[0]?.text}
          </p>
        </div>

        <div className="flex items-start flex-col flex-wrap gap-2 mt-4">
          <div className="flex items-center gap-2">
            {article.authorImage && (
              <Image
                src={article.authorImage.asset.url}
                alt={article.authorName}
                width={36}
                height={36}
                className="rounded-full"
              />
            )}
            <div className="text-lg ml-3">
              <p className="font-semibold">{article.authorName}</p>
              <p className="text-gray-500 text-base">Author</p>
            </div>
          </div>

          <div className="flex items-center  text-base lg:gap-x-40 mt-2 lg:mt-3">
            {article.slug?.current ? (
              <Link href={`/articles/${article.slug.current}`}>
                <button className="flex items-center bg-[#195872] text-white px-4 py-2 rounded-full text-base transition mr-8">
                  <BookOpen className="mr-2 w-4 h-4" /> Read Article
                </button>
              </Link>
            ) : null}

            <p className="text-[#195872] ml-10 flex items-center">
              <Clock className="mr-2 w-4 h-4" />{" "}
              {article.readTime || "5 min read"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
