import { createClient } from '@sanity/client';

const client = createClient({
  projectId: '8ynylwwf',
  dataset: 'production',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-27'
});

async function deploySchema() {
  try {
    // Create user schema
    const mutation = {
      mutations: [
        {
          create: {
            _type: 'document',
            _id: 'user.schema',
            name: 'user',
            type: 'document',
            fields: [
              {
                name: 'email',
                type: 'string',
                title: 'Email'
              },
              {
                name: 'password',
                type: 'string',
                title: 'Password'
              },
              {
                name: 'createdAt',
                type: 'datetime',
                title: 'Created At'
              }
            ]
          }
        }
      ]
    };

    const result = await client.request({
      url: `/projects/8ynylwwf/datasets/production/mutate`,
      method: 'POST',
      body: mutation
    });

    console.log('Schema deployed:', result);
    return result;
  } catch (error) {
    console.error('Failed to deploy schema:', error);
    throw error;
  }
}

deploySchema().catch(console.error); 