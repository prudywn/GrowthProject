import {defineConfig} from 'sanity'
import {structureTool, type StructureResolver} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

const singletonTypes = new Set(['homepageContent', 'aboutPageContent', 'whyUsContent'])

const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // Our singleton type has a list item with a custom child
      S.listItem()
        .title('Homepage Content')
        .id('homepageContent')
        .child(S.document().schemaType('homepageContent').documentId('homepageContent')),
      S.listItem()
        .title('About Page Content')
        .id('aboutPageContent')
        .child(S.document().schemaType('aboutPageContent').documentId('aboutPageContent')),
      S.listItem()
        .title('Why Us Page Content')
        .id('whyUsContent')
        .child(S.document().schemaType('whyUsContent').documentId('whyUsContent')),

      S.divider(),

      // Regular document types
      S.documentTypeListItem('article').title('Articles'),
      S.documentTypeListItem('course').title('Courses'),
      S.documentTypeListItem('courseLesson').title('Course Lessons'),
      S.documentTypeListItem('author').title('Authors'),
      S.documentTypeListItem('category').title('Categories'),
      S.documentTypeListItem('teamMember').title('Team Members'),
      S.documentTypeListItem('testimonial').title('Testimonials'),
      S.documentTypeListItem('trustedClient').title('Trusted Clients'),
      S.documentTypeListItem('coreValue').title('Core Values'),
      S.documentTypeListItem('whyUsPoint').title('Why Us Points'),
    ])

export default defineConfig({
  name: 'default',
  title: 'GrowthPartners',

  projectId: 'ytu6ofa6',
  dataset: 'production',

  plugins: [
    structureTool({
      structure,
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
    // Filter out singleton types from being created
    templates: (templates) => templates.filter(({schemaType}) => !singletonTypes.has(schemaType)),
  },

  document: {
    // For singleton types, filter out actions that are not explicitly allowed
    // So that that document cannot be deleted or duplicated
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(({action}) => action && ['publish', 'discardChanges', 'restore'].includes(action))
        : input,
  },
})
