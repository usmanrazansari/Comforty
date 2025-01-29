import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-03-19',
  useCdn: process.env.NODE_ENV === 'production'
})

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

// Add methods for CRUD operations
export const sanityApi = {
  async getProducts() {
    return client.fetch(`*[_type == "product"]`);
  },
  async createProduct(data: any) {
    return client.create({ _type: 'product', ...data });
  },
  // ... other methods
}
