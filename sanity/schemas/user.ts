export default {
  name: 'user',
  title: 'User',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'password',
      title: 'Password',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      readOnly: true,
      options: {
        dateFormat: 'YYYY-MM-DD',
        timeFormat: 'HH:mm',
      }
    }
  ],
  preview: {
    select: {
      title: 'email'
    }
  }
} 