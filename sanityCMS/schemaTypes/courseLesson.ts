export default {
  name: 'courseLesson',
  title: 'Course Lesson',
  type: 'document',
  fields: [
    {
      name: 'lessonName',
      title: 'Lesson Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    { name: 'lessonDescription', title: 'Lesson Description', type: 'text' },
    { name: 'lessonVideoUrl', title: 'Lesson Video URL', type: 'url' },
    {
      name: 'lessonImage',
      title: 'Lesson Image',
      type: 'image',
      options: { hotspot: true },
    },
    { name: 'lessonTranscript', title: 'Lesson Transcript', type: 'text' },
    { name: 'lessonNumber', title: 'Lesson Number', type: 'number' },
  ],
  orderings: [
    {
      title: 'Lesson Number, Asc',
      name: 'lessonNumberAsc',
      by: [{ field: 'lessonNumber', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'lessonName',
      subtitle: 'lessonNumber',
      media: 'lessonImage',
    },
  },
} 