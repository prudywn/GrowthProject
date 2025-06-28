import {defineField, defineType} from 'sanity'
import {AiSuggestInput} from '../components/AiSuggestInput'

// CEO Section Schema
const ceoSectionSchema = {
  name: 'ceoSection',
  title: 'CEO Section',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Section Title',
      components: {input: AiSuggestInput},
      validation: Rule => Rule.required().min(5).max(100),
      description: 'e.g., "A Message From Our CEO"'
    }),
    defineField({
      name: 'videoUrl',
      type: 'url',
      title: 'Video URL',
      description: 'Link to the CEO/leadership video',
      validation: Rule => Rule.required().uri({scheme: ['http', 'https']})
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'CEO/Leader Photo',
      options: {hotspot: true},
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'name',
      type: 'string',
      title: 'Name',
      components: {input: AiSuggestInput},
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'positionTitle',
      type: 'string',
      title: 'Position Title',
      components: {input: AiSuggestInput},
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'quote',
      type: 'text',
      title: 'Quote/Message',
      components: {input: AiSuggestInput},
      validation: Rule => Rule.required().min(30).max(500),
      description: 'A brief message from your CEO/leader'
    })
  ]
}

// Team Section Schema
const teamSectionSchema = {
  name: 'teamSection',
  title: 'Team Section',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Section Title',
      components: {input: AiSuggestInput},
      validation: Rule => Rule.required().min(5).max(100),
      description: 'e.g., "Meet Our Team"'
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Section Description',
      components: {input: AiSuggestInput},
      validation: Rule => Rule.min(30).max(300)
    })
  ]
}

// SEO Schema
const seoSchema = {
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      components: {input: AiSuggestInput},
      description: 'Title for search engines (50-60 characters)',
      validation: Rule => Rule.max(60).required()
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      components: {input: AiSuggestInput},
      description: 'Description for search engines (150-160 characters)',
      validation: Rule => Rule.max(160).required()
    })
  ]
}

// Main Schema
export default defineType({
  name: 'aboutPageContent',
  title: 'About Page Content',
  type: 'document',
  fields: [
    defineField({
      name: 'pageTitle',
      title: 'Page Title',
      type: 'string',
      components: {input: AiSuggestInput},
      validation: Rule => Rule.required().min(5).max(100),
      description: 'Main title for the About page'
    }),
    defineField({
      name: 'missionStatement',
      title: 'Mission Statement',
      type: 'text',
      components: {input: AiSuggestInput},
      validation: Rule => Rule.required().min(100).max(500),
      description: 'Your organization\'s mission statement (2-3 paragraphs)'
    }),
    defineField({
      name: 'missionImage',
      title: 'Mission Image',
      type: 'image',
      options: {hotspot: true},
      validation: Rule => Rule.required(),
      description: 'Image that represents your mission'
    }),
    defineField({
      name: 'valuesStatement',
      title: 'Values Statement',
      type: 'text',
      components: {input: AiSuggestInput},
      validation: Rule => Rule.required().min(100).max(500),
      description: 'Describe your core values and principles'
    }),
    defineField({
      name: 'valuesImage',
      title: 'Values Image',
      type: 'image',
      options: {hotspot: true},
      description: 'Optional: Image that represents your values'
    }),
    defineField({
      name: 'coreValues',
      title: 'Core Values',
      type: 'array',
      of: [{
        type: 'reference',
        to: [{type: 'coreValue'}]
      }],
      validation: Rule => Rule.min(3).max(6).required(),
      description: 'Select 3-6 core values that define your organization'
    }),
    defineField(ceoSectionSchema),
    defineField(teamSectionSchema),
    defineField(seoSchema)
  ],
  preview: {
    select: {
      title: 'pageTitle',
      media: 'missionImage'
    }
  }
})