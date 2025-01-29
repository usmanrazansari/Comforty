import { client } from './sanity';

async function testSanityConnection() {
  try {
    // Test read permission
    console.log('Testing read...');
    const test = await client.fetch('*[_type == "user"][0...10]');
    console.log('Read test result:', test);

    // Test write permission
    console.log('Testing write...');
    const testDoc = await client.create({
      _type: 'user',
      email: 'test@example.com',
      password: 'test123',
      createdAt: new Date().toISOString()
    });
    console.log('Write test result:', testDoc);

    // Clean up
    await client.delete(testDoc._id);
    console.log('Test successful!');

    return { success: true };
  } catch (error) {
    console.error('Sanity test failed:', error);
    return { success: false, error };
  }
}

// Run the test
testSanityConnection().then(console.log); 