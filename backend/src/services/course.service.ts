import { sanityClient } from '../lib/sanityClient'

const courseFields = `
  name,
  description,
  "imageUrl": image.asset->url,
  category,
  videoUrl,
  "lessons": lessons[]->{
    lessonName,
    lessonDescription,
    lessonVideoUrl,
    "lessonImageUrl": lessonImage.asset->url,
    lessonTranscript,
    lessonNumber
  } | order(lessonNumber asc)
`

export async function getCourses(category?: string) {
  let query = `*[_type == "course"`;
  const params: { [key: string]: any } = {};

  if (category) {
    query += ` && category == $category`;
    params.category = category;
  }

  query += `]{${courseFields}}`;
  const data = await sanityClient.fetch(query, params);
  return data;
}

export async function getCourseById(id: string) {
  const query = `*[_type == "course" && _id == $id][0]{${courseFields}}`
  const params = { id }
  const data = await sanityClient.fetch(query, params)
  return data
}

export async function createCourse(courseData: any) {
  const data = await sanityClient.create({ _type: 'course', ...courseData });
  return data;
}

export async function updateCourse(id: string, courseData: any) {
  const data = await sanityClient.patch(id).set(courseData).commit();
  return data;
}

export async function deleteCourse(id: string) {
  const data = await sanityClient.delete(id);
  return data;
}
