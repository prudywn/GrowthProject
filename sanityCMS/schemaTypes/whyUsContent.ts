import {defineField, defineType} from 'sanity'
import {AiSuggestInput} from '../components/AiSuggestInput'

export default defineType({
  name: 'whyUsContent',
  title: 'Why Us Page Content',
  type: 'document',
  fields: [
    defineField({
      name: 'sectionDescription',
      title: 'Section Description',
      type: 'text',
      components: {input: AiSuggestInput},
      validation: Rule => Rule.required().min(50).max(500),
      description: 'Main description for the "Why Us" section'
    }),
    defineField({
      name: 'miniboxTitle',
      title: 'Minibox Title',
      type: 'string',
      components: {input: AiSuggestInput},
      validation: Rule => Rule.required().min(5).max(100)
    }),
    defineField({
      name: 'miniboxDescription',
      title: 'Minibox Description',
      type: 'text',
      components: {input: AiSuggestInput},
      validation: Rule => Rule.required().min(30).max(300)
    }),
    defineField({
      name: 'miniboxImage',
      title: 'Minibox Image',
      type: 'image',
      options: { 
        hotspot: true 
      },
      validation: Rule => Rule.required(),
      description: 'Image that appears in the minibox section'
    }),
    defineField({
      name: 'ctaButton',
      title: 'Call to Action Button',
      type: 'object',
      fields: [
        {
          name: 'text',
          type: 'string',
          title: 'Button Text',
          components: {input: AiSuggestInput},
          validation: Rule => Rule.required().max(30)
        },
        {
          name: 'url',
          type: 'string',
          title: 'Button URL',
          validation: Rule => Rule.required()
        }
      ]
    }),
    defineField({
      name: 'whyUsPoints',
      title: 'Why Us Points',
      type: 'array',
      of: [{ 
        type: 'reference', 
        to: { type: 'whyUsPoint' } 
      }],
      validation: Rule => Rule.min(3).max(6),
      description: 'Select 3-6 key points that highlight why clients should choose us'
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
      title: 'miniboxTitle',
      subtitle: 'sectionDescription',
      media: 'miniboxImage'
    }
  }
})