export default {
  name: 'review',
  title: 'Review',
  type: 'document',
  fields: [
    {
      name: 'userId',
      title: 'User ID',
      type: 'string',
    },
    {
      name: 'userName',
      title: 'User Name',
      type: 'string',
    },
    {
      name: 'productId',
      title: 'Product ID',
      type: 'string',
    },
    {
      name: 'rating',
      title: 'Rating',
      type: 'number',
      validation: (Rule: any) => Rule.required().min(1).max(5)
    },
    {
      name: 'comment',
      title: 'Comment',
      type: 'text',
    },
    {
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      readOnly: true,
    }
  ]
} 