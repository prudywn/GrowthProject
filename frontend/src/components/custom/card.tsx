import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export type CardProps = {
  title: string;
  description: string;
  imageSrc?: string;
  className?: string;
  slug?: string;
  category?: {
    title: string;
    color?: string;
  };
  showViewButton?: boolean;
  viewButtonText?: string;
  comingSoonText?: string;
};

export const Card = ({ 
  title, 
  description, 
  imageSrc, 
  slug, 
  category, 
  showViewButton = false,
  viewButtonText = "View Course",
  comingSoonText = "Course Details Coming Soon"
}: CardProps) => {
  const cardContent = (
    <div className="bg-white shadow-md rounded-[48px] overflow-hidden w-full max-w-xs mx-auto text-center min-w-[85%] md:min-w-0 snap-center flex-shrink-0 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
      <div className="h-36 w-full overflow-hidden rounded-t-[48px] relative bg-gray-100">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt=""
            title={title}
            width={400}
            height={160}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#E1F2FE] to-[#195872]/10">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto bg-[#195872]/20 rounded-full flex items-center justify-center mb-2">
                <svg className="w-6 h-6 text-[#195872]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-[#195872] text-xs font-medium">Image</p>
            </div>
          </div>
        )}
        {category && (
          <div 
            className="absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-medium text-white"
            style={{ backgroundColor: category.color || '#195872' }}
          >
            {category.title}
          </div>
        )}
      </div>
      <div className="px-4 py-6 min-h-[160px] flex flex-col justify-between">
        <div>
          <h3 className="text-base font-bold text-[#195872] mb-2 line-clamp-2 group-hover:text-[#2a5d73] transition-colors">
            {title}
          </h3>
          <p className="text-base w-[221px] mx-auto text-black line-clamp-4 leading-relaxed mb-4">
            {description}
          </p>
        </div>
        {showViewButton && slug && (
          <div className="mt-auto">
            <div className="inline-flex items-center gap-2 text-[#195872] text-sm font-medium group-hover:text-[#2a5d73] transition-colors">
              {viewButtonText}
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        )}
        {showViewButton && !slug && (
          <div className="mt-auto">
            <div className="inline-flex items-center gap-2 text-gray-400 text-sm font-medium">
              {comingSoonText}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  if (slug) {
    return (
      <Link href={`/courses/${slug}`} className="block">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
};