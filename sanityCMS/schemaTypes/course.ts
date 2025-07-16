import {defineField, defineType} from 'sanity'
import {AiSuggestInput} from '../components/AiSuggestInput'

export default defineType({
  name: 'course',
  title: 'Course',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      components: {input: AiSuggestInput},
      validation: Rule => Rule.required().min(5).max(120)
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      components: {input: AiSuggestInput},
      validation: Rule => Rule.required().min(50).max(300)
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Main Course', value: 'main'},
          {title: 'Specialty Course', value: 'specialty'},
          {title: 'Single Video Course', value: 'video_single'},
          {title: 'Video Series Course', value: 'video_series'},
        ],
        layout: 'radio',
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      hidden: ({document}) => document?.category !== 'video_single',
    }),
    defineField({
      name: 'objectives',
      title: 'Learning Objectives',
      type: 'array',
      of: [{
        type: 'string',
        components: {input: CharacterCountInput}
      }],
      description: 'What will students learn in this course?',
      validation: Rule => Rule.min(3).max(10)
    }),
    defineField({
      name: 'accomplishments',
      title: 'What This Course Helps Accomplish',
      type: 'array',
      of: [{
        type: 'string',
        components: {input: AiSuggestInput},
        validation: Rule => Rule.required().min(10).max(150)
      }],
      description: 'List the key accomplishments or outcomes students will achieve from this course',
      validation: Rule => Rule.min(3).max(8),
      hidden: ({document}) => document?.category !== 'main',
    }),
    defineField({
      name: 'lessons',
      title: 'Lessons',
      type: 'array',
      of: [{type: 'reference', to: {type: 'courseLesson'}}],
      hidden: ({document}) => document?.category === 'video_single',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        {
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          components: {input: AiSuggestInput},
          description: 'Title for search engines (50-60 characters)',
          validation: Rule => Rule.max(60)
        },
        {
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          components: {input: AiSuggestInput},
          description: 'Description for search engines (150-160 characters)',
          validation: Rule => Rule.max(160)
        }
      ]
    })
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
    }
  }
})