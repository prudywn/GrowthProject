export default {
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    {
      name: 'personName',
      title: 'Person Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'personRole',
      title: 'Person Role',
      type: 'string',
    },
    {
      name: 'clientCompanyName',
      title: 'Client Company Name',
      type: 'string',
    },
    {
      name: 'responseText',
      title: 'Response Text',
      type: 'text',
      validation: (Rule: any) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'personName',
      subtitle: 'clientCompanyName',
    },
  },
} 