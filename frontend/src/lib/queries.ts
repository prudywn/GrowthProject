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
