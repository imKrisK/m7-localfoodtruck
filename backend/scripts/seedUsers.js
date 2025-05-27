import bcrypt from 'bcrypt';
import { connectMongo } from '../db.js';

const users = [
  { name: 'Demo User', email: 'demo@example.com', password: 'password123' },
  { name: 'Admin', email: 'admin@example.com', password: 'adminpass' },
  { name: 'Arya Stark', email: 'arya@winterfell.com', password: 'needle' },
  { name: 'Jon Snow', email: 'jon@winterfell.com', password: 'ghost' }
];

async function seed() {
  const db = await connectMongo();
  const usersCollection = db.collection('users');
  await usersCollection.deleteMany({});
  // Hash passwords before inserting
  const usersWithHashed = await Promise.all(users.map(async user => ({
    ...user,
    password: await bcrypt.hash(user.password, 10)
  })));
  await usersCollection.insertMany(usersWithHashed);
  console.log('Seeded users with hashed passwords!');
  process.exit(0);
}

seed().catch(err => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
