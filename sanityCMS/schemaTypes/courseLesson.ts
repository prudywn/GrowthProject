import {defineField, defineType} from 'sanity'
import {AiSuggestInput} from '../components/AiSuggestInput'

export default defineType({
  name: 'courseLesson',
  title: 'Course Lesson',
  type: 'document',
  fields: [
    defineField({
      name: 'lessonName',
      title: 'Lesson Name',
      type: 'string',
      components: {input: AiSuggestInput},
      validation: Rule => Rule.required().min(5).max(120)
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'lessonName',
        maxLength: 96,
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'lessonDescription',
      title: 'Lesson Description',
      type: 'text',
      components: {input: AiSuggestInput},
      validation: Rule => Rule.required().min(50).max(300)
    }),
    defineField({
      name: 'lessonVideoUrl',
      title: 'Lesson Video URL',
      type: 'url',
      description: 'URL to the video content for this lesson'
    }),
    defineField({
      name: 'lessonImage',
      title: 'Lesson Image',
      type: 'image',
      options: { 
        hotspot: true 
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'lessonTranscript',
      title: 'Lesson Transcript',
      type: 'text',
      components: {input: AiSuggestInput},
      description: 'Full transcript of the video content'
    }),
    defineField({
      name: 'lessonNumber',
      title: 'Lesson Number',
      type: 'number',
      validation: Rule => Rule.required().min(1),
      description: 'The order number of this lesson in the course'
    }),
    defineField({
      name: 'keyPoints',
      title: 'Key Learning Points',
      type: 'array',
      of: [{
        type: 'string',
        components: {input: AiSuggestInput}
      }],
      description: 'Main takeaways from this lesson',
      validation: Rule => Rule.min(3).max(10)
    }),
    defineField({
      name: 'resources',
      title: 'Additional Resources',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              type: 'string',
              components: {input: AiSuggestInput},
              validation: Rule => Rule.required()
            },
            {
              name: 'url',
              type: 'url',
              validation: Rule => Rule.required()
            },
            {
              name: 'description',
              type: 'text',
              components: {input: AiSuggestInput}
            }
          ]
        }
      ]
    })
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
})