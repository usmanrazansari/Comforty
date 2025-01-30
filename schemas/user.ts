export default {
  name: 'user',
  title: 'User',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule: any) => Rule.required().min(2).max(50),
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule: any) => Rule.required().email().unique().lowercase(),
    },
    {
      name: 'password',
      title: 'Password',
      type: 'string',
      validation: (Rule: any) => Rule.required().min(8).max(128),
      hidden: true,
    },
    {
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      validation: (Rule: any) => Rule.required(),
      readOnly: true,
    }
  ],
  preview: {
    select: {
      title: 'email',
      subtitle: 'name'
    }
  }
}