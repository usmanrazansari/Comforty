import { client } from '../app/lib/sanity';
import { furnitureProducts } from '../app/lib/data';

async function migrateProducts() {
  try {
    for (const product of furnitureProducts) {
      await client.create({
        _type: 'product',
        name: product.name,
        price: product.price,
        category: product.category.name,
        images: product.images,
        description: product.description,
        // ... map other fields
      });
    }
    console.log('Migration completed');
  } catch (error) {
    console.error('Migration failed:', error);
  }
}

migrateProducts(); 