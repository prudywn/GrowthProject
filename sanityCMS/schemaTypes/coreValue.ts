import {defineField, defineType} from 'sanity'
import {AiSuggestInput} from '../components/AiSuggestInput'

export default defineType({
  name: 'coreValue',
  title: 'Core Value',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      components: {input: AiSuggestInput},
      validation: Rule => Rule.required().min(3).max(50),
      description: 'The name/title of this core value (e.g., "Excellence", "Integrity")'
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
      validation: Rule => Rule.required().min(30).max(300),
      description: 'A brief description of this core value (1-2 sentences)'
    }),
    defineField({
      name: 'detailedExplanation',
      title: 'Detailed Explanation',
      type: 'text',
      components: {input: AiSuggestInput},
      description: 'A more detailed explanation of what this value means to your organization'
    }),
    defineField({
      name: 'iconKey',
      title: 'Icon',
      type: 'string',
      options: {
        list: [
          { title: 'Trending Up', value: 'trendingUp' },
          { title: 'Users', value: 'users' },
          { title: 'Star', value: 'star' },
          { title: 'Bar Chart', value: 'barChart2' },
          { title: 'Award', value: 'award' },
          { title: 'Lightbulb', value: 'lightbulb' },
          { title: 'Shield', value: 'shield' },
          { title: 'Heart', value: 'heart' },
          { title: 'Target', value: 'target' },
          { title: 'Rocket', value: 'rocket' }
        ],
        layout: 'dropdown'
      },
      validation: Rule => Rule.required(),
      description: 'Select an icon that best represents this value'
    }),
    defineField({
      name: 'image',
      title: 'Custom Icon/Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Optional: Upload a custom icon/image instead of using the preset icons'
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      description: 'The order in which this value should appear (lower numbers come first)',
      initialValue: 0
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured Value',
      type: 'boolean',
      description: 'Mark this as a featured value to highlight it',
      initialValue: false
    })
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'displayOrderAsc',
      by: [
        {field: 'displayOrder', direction: 'asc'},
        {field: 'name', direction: 'asc'}
      ]
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'description',
      media: 'image',
      icon: 'iconKey'
    },
    prepare(selection) {
      const {title, subtitle, media, icon} = selection
      return {
        title,
        subtitle: subtitle || 'No description',
        media: media || (icon ? {icon: icon} : null)
      }
    }
  }
})