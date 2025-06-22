import React from "react";

export default function ArticleCardSkeleton() {
  return (
    <div className="min-w-[300px] max-w-[350px] w-full bg-white rounded-lg shadow-md overflow-hidden animate-pulse flex flex-col">
      <div className="h-48 bg-gray-200" />
      <div className="p-4 space-y-3">
        <div className="h-4 w-3/4 bg-gray-300 rounded" />
        <div className="h-3 w-1/2 bg-gray-300 rounded" />
        <div className="h-3 w-full bg-gray-300 rounded" />
        <div className="h-3 w-5/6 bg-gray-300 rounded" />
        <div className="flex items-center gap-2 pt-2">
          <div className="h-8 w-8 bg-gray-300 rounded-full" />
          <div className="h-3 w-24 bg-gray-300 rounded" />
        </div>
      </div>
    </div>
  );
}
