export const getAllPostsQuery = `
  *[_type == "post"] | order(publishedAt desc){
    _id,
    title,
    slug,
    publishedAt,
    mainImage {
      asset->{
        url
      }
    },
    "authorName": author->name,
    "authorBio":author->bio,
    "authorImage": author->image{
      asset->{
        url
      }
    },
    "categories": categories[]->title,
    readTime,
    body
  }
`;

export const getAllCoursesQuery = `
*[_type == "course"]{
    _id,
    title,
    description,
    "imageSrc": image.asset->url
  }
`;

export const getPostBySlugQuery = `
  *[_type == "post" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    publishedAt,
    readTime,
    body,
    mainImage {
      asset-> { url }
    },
    "authorName": author->name,
    "authorImage": author->image { asset-> { url } },
    "authorBio": author->bio
  }
`;

export const getRelatedPostsQuery = `
  *[_type == "post" && slug.current != $currentSlug][0...3]{
    _id,
    title,
    slug,
    readTime,
    mainImage { asset-> { url } },
    "authorName": author->name,
    "authorBio": author->bio,
    "authorImage": author->image { asset-> { url } },
    "categories": categories[]->title,
    body
  }
`;
