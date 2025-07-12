import Image from "next/image";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface ProgressiveImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
  placeholderSrc?: string;
}

export default function ProgressiveImage({
  src,
  alt,
  fill = false,
  width,
  height,
  className,
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  placeholderSrc,
}: ProgressiveImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [currentSrc, setCurrentSrc] = useState(placeholderSrc || src);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (placeholderSrc && src !== placeholderSrc) {
      // Load the full resolution image
      const img = new window.Image();
      img.onload = () => {
        setCurrentSrc(src);
        setIsLoading(false);
      };
      img.onerror = () => {
        setHasError(true);
        setIsLoading(false);
      };
      img.src = src;
    }
  }, [src, placeholderSrc]);

  if (hasError) {
    return (
      <div
        className={cn(
          "bg-gray-200 flex items-center justify-center",
          className
        )}
      >
        <span className="text-gray-500 text-sm">Image failed to load</span>
      </div>
    );
  }

  return (
    <div className={cn("relative", className)}>
      {isLoading && placeholderSrc && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
      <Image
        src={currentSrc}
        alt={alt}
        fill={fill}
        width={width}
        height={height}
        className={cn(
          "transition-opacity duration-500",
          isLoading ? "opacity-50" : "opacity-100"
        )}
        priority={priority}
        sizes={sizes}
        onLoad={() => {
          if (!placeholderSrc) {
            setIsLoading(false);
          }
        }}
        onError={() => {
          setHasError(true);
          setIsLoading(false);
        }}
      />
    </div>
  );
}
