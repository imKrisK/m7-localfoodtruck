import { connectMongo } from '../db.js';

const initialItems = [
  { name: 'Waggu Burger', price: 20, description: 'Juicy Waggu beef burger', image: 'burger.png' },
  { name: 'BBQ Porkchop', price: 20, description: 'Tender BBQ porkchop', image: 'bbq-porkchop.png' },
  { name: 'The Other Burrito', price: 20, description: 'Loaded burrito', image: 'burrito1.png' },
  { name: 'The Cal Burger Zone', price: 20, description: 'Classic California burger', image: 'calburgerzone.png' }
];

async function seed() {
  const db = await connectMongo();
  const itemsCollection = db.collection('items');
  await itemsCollection.deleteMany({}); // Clear existing
  await itemsCollection.insertMany(initialItems);
  console.log('Seeded initial items!');
  process.exit(0);
}

seed().catch(err => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
