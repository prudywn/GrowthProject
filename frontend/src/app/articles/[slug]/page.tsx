import { sanityClient } from "@/lib/sanity";
import { getPostBySlugQuery, getRelatedPostsQuery } from "@/lib/queries";
import { notFound } from "next/navigation";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { Clock } from "lucide-react";
import RelatedArticles from "@/app/components/RelatedArticles";

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  if (!resolvedParams?.slug) return notFound();

  const article = await sanityClient.fetch(getPostBySlugQuery, {
    slug: resolvedParams.slug,
  });

  if (!article) return notFound();

  const related = await sanityClient.fetch(getRelatedPostsQuery, {
    currentSlug: resolvedParams.slug,
  });

  return (
    <main className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold text-[#195872]">
          {article.title}
        </h1>
        <div className="flex items-center gap-3 text-sm text-gray-600">
          {article.authorImage?.asset?.url && (
            <Image
              src={article.authorImage.asset.url}
              alt={article.authorName}
              width={36}
              height={36}
              className="rounded-full"
            />
          )}
          <span>{article.authorName}</span>
          <span>•</span>
          <span>
            <Clock className="inline mr-1 w-4 h-4" />
            {article.readTime}
          </span>
        </div>
      </div>

      <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden">
        <Image
          src={article.mainImage.asset.url}
          alt={article.title}
          fill
          className="object-cover"
        />
      </div>

      <article className="prose max-w-none prose-blue">
        <PortableText value={article.body} />
      </article>

      <section>
        <RelatedArticles posts={related} />
      </section>
    </main>
  );
}