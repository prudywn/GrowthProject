import {defineField, defineType} from 'sanity'
import {AiSuggestInput} from '../components/AiSuggestInput'

export default defineType({
  name: 'article',
  title: 'Article',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      components: {input: AiSuggestInput},
      validation: Rule => Rule.required().min(5).max(120)
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
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: {type: 'author'},
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: {type: 'category'},
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      components: {input: AiSuggestInput},
      validation: Rule => Rule.required().min(50).max(200)
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
      components: {input: AiSuggestInput},
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      components: {input: AiSuggestInput},
      description: 'A short summary of the article for previews',
      validation: Rule => Rule.max(300)
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags'
      }
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
          description: 'Title for search engines (50-60 characters)'
        },
        {
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          components: {input: AiSuggestInput},
          description: 'Description for search engines (150-160 characters)'
        },
        {
          name: 'keywords',
          title: 'Keywords',
          type: 'string',
          description: 'Comma-separated list of keywords'
        }
      ]
    })
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const {author} = selection
      return {...selection, subtitle: author && `by ${author}`}
    },
  },
})
