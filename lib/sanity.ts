import { createClient } from 'next-sanity'
import { config } from './config'

export const client = createClient({
  projectId: config.sanity.projectId,
  dataset: config.sanity.dataset,
  apiVersion: '2023-05-03',
  token: config.sanity.apiToken,
  useCdn: false,
  perspective: 'published',
  stega: false
}) 