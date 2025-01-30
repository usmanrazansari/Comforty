// In-memory user storage (for demonstration)
interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

// Using a Map for better user storage
const userMap = new Map<string, User>();

export const users: User[] = [];

export const addUser = (user: User) => {
  userMap.set(user.email, user);
  users.push(user);
  console.log('=== ADDING USER ===');
  console.log('New user:', { email: user.email, id: user.id });
  console.log('Total users:', userMap.size);
  console.log('All users:', Array.from(userMap.values()));
  console.log('=================');
};

export const findUser = (email: string) => {
  console.log('=== FINDING USER ===');
  console.log('Looking for email:', email);
  const user = userMap.get(email);
  console.log('Found user:', user ? { id: user.id, email: user.email } : 'Not found');
  console.log('Total users in store:', userMap.size);
  console.log('All users:', Array.from(userMap.values()));
  console.log('==================');
  return user;
};
