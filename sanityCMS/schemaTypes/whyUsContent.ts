export default {
  name: 'whyUsContent',
  title: 'Why Us Page Content',
  type: 'document',
  fields: [
    { name: 'sectionDescription', title: 'Section Description', type: 'text' },
    { name: 'miniboxTitle', title: 'Minibox Title', type: 'string' },
    { name: 'miniboxDescription', title: 'Minibox Description', type: 'text' },
    {
      name: 'miniboxImage',
      title: 'Minibox Image',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'whyUsPoints',
      title: 'Why Us Points',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'whyUsPoint' } }],
    },
  ],
} 