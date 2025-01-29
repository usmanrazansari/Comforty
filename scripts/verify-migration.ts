import { client } from '../app/lib/sanity';

async function verifyMigration() {
  const products = await client.fetch('*[_type == "product"]');
  console.log(`Found ${products.length} products in Sanity`);
  return products;
} 