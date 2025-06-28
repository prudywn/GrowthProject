import {defineField, defineType} from 'sanity'
import {AiSuggestInput} from '../components/AiSuggestInput'

export default defineType({
  name: 'subService',
  title: 'Sub Service',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      components: {input: AiSuggestInput},
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
      components: {input: AiSuggestInput},
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'problemsSolved',
      title: 'Problems Solved',
      type: 'array',
      of: [
        {
          type: 'string',
          components: {input: AiSuggestInput}
        }
      ],
      validation: Rule => Rule.required().min(1)
    })
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description'
    }
  }
})
