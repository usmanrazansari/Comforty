import { client } from './sanity';

async function verifyToken() {
  try {
    console.log('Project ID:', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);
    console.log('Dataset:', process.env.NEXT_PUBLIC_SANITY_DATASET);
    console.log('Token:', process.env.SANITY_API_TOKEN?.substring(0, 10) + '...');

    const projectInfo = await client.request({
      uri: '/projects/8ynylwwf',
      method: 'GET'
    });

    console.log('Project info:', projectInfo);
    return { success: true, info: projectInfo };
  } catch (error) {
    console.error('Token verification failed:', error);
    return { success: false, error };
  }
}

verifyToken().then(console.log); 