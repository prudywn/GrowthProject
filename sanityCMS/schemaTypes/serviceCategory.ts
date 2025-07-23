import {defineField, defineType} from 'sanity'
import {AiSuggestInput} from '../components/AiSuggestInput'

export default defineType({
  name: 'serviceCategory',
  title: 'Service Category',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      components: {input: AiSuggestInput},
      validation: Rule => Rule.required().min(5).max(50)
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
      name: 'description',
      title: 'Description',
      type: 'text',
      components: {input: AiSuggestInput},
      validation: Rule => Rule.required().min(20).max(200)
    }),
    defineField({
      name: 'color',
      title: 'Category Color',
      type: 'string',
      description: 'Optional hex color code for UI theming (e.g., #FF5733)',
      validation: Rule => Rule.regex(/^#[0-9A-Fa-f]{6}$/, {
        name: 'hex color',
        invert: false
      }).warning('Please enter a valid hex color code (e.g., #FF5733)')
    })
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
    }
  }
})