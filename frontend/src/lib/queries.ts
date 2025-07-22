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
*[_type == "course" && defined(slug.current)] | order(_createdAt desc) {
    _id,
    name,
    slug,
    description,
    "imageSrc": image.asset->url,
    category->{
      _id,
      title,
      slug,
      color
    }
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

export const getHomepageContentQuery = `
  *[_type == "homepageContent"][0]{
    heroTitle,
    heroDescription,
    clientsCount,
    professionalsTrainedCount,
    yearsOfExperience,
    peopleRecruitedCount,
    servicesSection {
      title,
      description,
      featuredServices[]->{
        _id,
        title,
        shortDescription,
        slug,
        mainImage {
          asset->{
            url
          }
        }
      }
    }
  }
`;

// About Page Content
export const getAboutPageContentQuery = `
  *[_type == "aboutPageContent"][0]{
    missionStatement,
    missionImage { asset->{ url } },
    valuesStatement,
    coreValues[]->{
      _id,
      name,
      text,
      iconKey
    },
    ceoVideoUrl
  }
`;

// Core Values
export const getAllCoreValuesQuery = `
  *[_type == "coreValue"]{
    _id,
    name,
    text,
    iconKey
  }
`;

// Course Lessons
export const getAllCourseLessonsQuery = `
  *[_type == "courseLesson"] | order(lessonNumber asc) {
    _id,
    lessonName,
    lessonDescription,
    lessonVideoUrl,
    lessonImage { asset->{ url } },
    lessonTranscript,
    lessonNumber
  }
`;

// Team Members
export const getAllTeamMembersQuery = `
  *[_type == "teamMember"]{
    _id,
    name,
    role,
    image { asset->{ url } }
  }
`;

// Testimonials
export const getAllTestimonialsQuery = `
  *[_type == "testimonial"]{
    _id,
    personName,
    personRole,
    clientCompanyName,
    responseText
  }
`;

// Trusted Clients
export const getAllTrustedClientsQuery = `
  *[_type == "trustedClient"]{
    _id,
    name,
    logo { asset->{ url } }
  }
`;

// Why Us Content
export const getWhyUsContentQuery = `
  *[_type == "whyUsContent"][0]{
    sectionDescription,
    miniboxTitle,
    miniboxDescription,
    miniboxImage { asset->{ url } },
    whyUsPoints[]->{
      _id,
      title,
      reason,
      image { asset->{ url } }
    }
  }
`;

// Why Us Points
export const getAllWhyUsPointsQuery = `
  *[_type == "whyUsPoint"]{
    _id,
    title,
    reason,
    image { asset->{ url } }
  }
`;

export const getMainCoursesQuery = `
  *[_type == "course" && defined(slug.current)] | order(_createdAt desc) {
    _id,
    name,
    slug,
    description,
    "imageSrc": image.asset->url,
    category->{
      _id,
      title,
      slug,
      color
    }
  }
`;

export const getCourseBySlugQuery = `
  *[_type == "course" && slug.current == $slug][0]{
    _id,
    name,
    slug,
    description,
    image {
      asset-> { url }
    },
    content,
    category->{
      _id,
      title,
      slug,
      description,
      color
    },
    seo
  }
`;

export const getAllCourseCategoriesQuery = `
  *[_type == "courseCategory"] | order(title asc) {
    _id,
    title,
    slug,
    description,
    color
  }
`;
