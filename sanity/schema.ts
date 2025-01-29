import { type SchemaTypeDefinition } from 'sanity'
import product from './schemas/product'
import category from './schemas/category'
import user from './schemas/user'
import order from './schemas/order'
import review from './schemas/review'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product, category, user, order, review],
} 