export default {
  name: 'aboutPageContent',
  title: 'About Page Content',
  type: 'document',
  fields: [
    { name: 'missionStatement', title: 'Mission Statement', type: 'text' },
    {
      name: 'missionImage',
      title: 'Mission Image',
      type: 'image',
      options: { hotspot: true },
    },
    { name: 'valuesStatement', title: 'Values Statement', type: 'text' },
    {
      name: 'coreValues',
      title: 'Core Values',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'coreValue' } }],
    },
  ],
} 