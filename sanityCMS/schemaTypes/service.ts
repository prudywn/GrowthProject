import {defineField, defineType} from 'sanity'
import {AiSuggestInput} from '../components/AiSuggestInput'

export default defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      components: {input: AiSuggestInput},
      validation: Rule => Rule.required().min(10).max(100)
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description (for cards)',
      type: 'text',
      components: {input: AiSuggestInput},
      validation: Rule => Rule.required().max(200)
    }),
    defineField({
      name: 'description',
      title: 'Full Description',
      type: 'blockContent',
      components: {input: AiSuggestInput},
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'subServices',
      title: 'Sub Services',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'subService'}]
        }
      ],
      validation: Rule => Rule.required().min(1)
    })
  ],
  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
    },
  },
})
