import { connectMongo } from '../db.js';

const favorites = [
  { userEmail: 'demo@example.com', itemName: 'Waggu Burger' },
  { userEmail: 'demo@example.com', itemName: 'BBQ Porkchop' },
  { userEmail: 'arya@winterfell.com', itemName: 'The Other Burrito' },
  { userEmail: 'jon@winterfell.com', itemName: 'The Cal Burger Zone' }
];

async function seed() {
  const db = await connectMongo();
  const favoritesCollection = db.collection('favorites');
  await favoritesCollection.deleteMany({});
  await favoritesCollection.insertMany(favorites);
  console.log('Seeded favorites!');
  process.exit(0);
}

seed().catch(err => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
