import { client } from '../app/lib/sanity';
import { furnitureProducts } from '../app/api/products/route';

async function migrateProducts() {
  try {
    for (const product of furnitureProducts) {
      await client.create({
        _type: 'product',
        name: product.name,
        price: product.price,
        // ... map other fields
      });
    }
    console.log('Migration completed');
  } catch (error) {
    console.error('Migration failed:', error);
  }
}

migrateProducts(); 