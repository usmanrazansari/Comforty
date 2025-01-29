export const config = {
  sanity: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiToken: process.env.SANITY_API_TOKEN,
    jwtSecret: process.env.JWT_SECRET
  }
};