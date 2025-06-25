export default {
  name: 'coreValue',
  title: 'Core Value',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'text',
      title: 'Text',
      type: 'text',
    },
    
    {
      name: 'iconKey',
      title: 'Icon Key',
      type: 'string',
      options: {
        list: [
          { title: 'Trending Up', value: 'trendingUp' },
          { title: 'Users', value: 'users' },
          { title: 'Star', value: 'star' },
          { title: 'Bar Chart', value: 'barChart2' },
        ],
      },
    },
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
    },
  },
} 