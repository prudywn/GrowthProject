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

export async function getCourses() {
  const query = `*[_type == "course"]{${courseFields}}`
  const data = await sanityClient.fetch(query)
  return data
}

export async function getCourseById(id: string) {
  const query = `*[_type == "course" && _id == $id][0]{${courseFields}}`
  const params = { id }
  const data = await sanityClient.fetch(query, params)
  return data
}
