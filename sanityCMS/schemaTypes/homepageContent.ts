import {defineField, defineType} from 'sanity'
import {AiSuggestInput} from '../components/AiSuggestInput'

export default defineType({
  name: 'homepageContent',
  title: 'Homepage Content',
  type: 'document',
  fields: [
    defineField({
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
      components: {input: AiSuggestInput},
      validation: Rule => Rule.required().min(10).max(100)
    }),
    defineField({
      name: 'heroDescription',
      title: 'Hero Description',
      type: 'text',
      components: {input: AiSuggestInput},
      validation: Rule => Rule.required().min(50).max(300)
    }),
    defineField({
      name: 'servicesSection',
      title: 'Services Section',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
          validation: Rule => Rule.required()
        }),
        defineField({
          name: 'description',
          title: 'Section Description',
          type: 'text',
          validation: Rule => Rule.required()
        }),
        defineField({
          name: 'featuredServices',
          title: 'Featured Services',
          type: 'array',
          of: [
            {
              type: 'reference',
              to: [{type: 'service'}],
              options: {
                disableNew: true
              }
            }
          ],
          validation: Rule => Rule.required().min(3).max(6)
        })
      ]
    }),
    defineField({
      name: 'clientsCount',
      title: 'Clients Count',
      type: 'number',
      validation: Rule => Rule.required().min(0)
    }),
    defineField({
      name: 'professionalsTrainedCount',
      title: 'Professionals Trained Count',
      type: 'number',
      validation: Rule => Rule.required().min(0)
    }),
    defineField({
      name: 'yearsOfExperience',
      title: 'Years of Experience',
      type: 'number',
      validation: Rule => Rule.required().min(0).max(100)
    }),
    defineField({
      name: 'peopleRecruitedCount',
      title: 'People Recruited Count',
      type: 'number',
      validation: Rule => Rule.required().min(0)
    })
  ]
})