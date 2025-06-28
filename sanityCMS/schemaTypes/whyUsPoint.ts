import {defineField, defineType} from 'sanity'
import {AiSuggestInput} from '../components/AiSuggestInput'

export default defineType({
  name: 'whyUsPoint',
  title: 'Why Us Point',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      components: {input: AiSuggestInput},
      validation: Rule => Rule.required().min(5).max(100),
      description: 'A short, impactful title for this point'
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
      name: 'reason',
      title: 'Reason',
      type: 'text',
      components: {input: AiSuggestInput},
      validation: Rule => Rule.required().min(30).max(300),
      description: 'A clear explanation of this benefit (2-3 sentences)'
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: Rule => Rule.required(),
      description: 'An icon or image that represents this point'
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Optional: Choose an icon to represent this point',
      options: {
        list: [
          {title: 'Award', value: 'award'},
          {title: 'Lightbulb', value: 'lightbulb'},
          {title: 'Rocket', value: 'rocket'},
          {title: 'Users', value: 'users'},
          {title: 'Shield', value: 'shield'},
          {title: 'Chart', value: 'chart'},
        ]
      }
    }),
    defineField({
      name: 'ctaText',
      title: 'Call to Action Text',
      type: 'string',
      components: {input: AiSuggestInput},
      description: 'Optional: Text for a call-to-action button',
      validation: Rule => Rule.max(30)
    }),
    defineField({
      name: 'ctaLink',
      title: 'Call to Action Link',
      type: 'string',
      description: 'Optional: Link for the call-to-action button',
      hidden: ({parent}) => !parent?.ctaText
    })
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'reason',
      media: 'image'
    }
  }
})