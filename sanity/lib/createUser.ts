import { client } from '@/lib/sanity';

async function createUserType() {
  try {
    // First, check if the schema exists
    const existingSchema = await client.fetch(`*[_type == "user"][0]`);
    console.log('Existing schema:', existingSchema);

    // Create a test user to verify permissions
    const testUser = await client.create({
      _type: 'user',
      email: 'test@test.com',
      password: 'test123',
      createdAt: new Date().toISOString()
    });
    
    console.log('Test user created:', testUser);
    
    // Clean up
    await client.delete(testUser._id);
    console.log('Test user deleted');

    return { success: true };
  } catch (error) {
    console.error('Error:', error);
    return { success: false, error };
  }
}

// Run this function
createUserType().then(console.log); 