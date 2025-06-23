import { sanityClient } from '../lib/sanityClient'

const articleFields = `
  title,
  "slug": slug.current,
  "category": category->name,
  "author": author->{name, role, "imageUrl": image.asset->url},
  "mainImage": mainImage.asset->url,
  publishedAt,
  readLengthMinutes,
  description,
  content
`

export async function getArticles() {
  const query = `*[_type == "article"]{${articleFields}} | order(publishedAt desc)`
  const data = await sanityClient.fetch(query)
  return data
}

export async function getArticleBySlug(slug: string) {
  const query = `*[_type == "article" && slug.current == $slug][0]{${articleFields}}`
  const params = { slug }
  const data = await sanityClient.fetch(query, params)
  return data
} 