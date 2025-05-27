import { connectMongo } from '../db.js';

const orders = [
  {
    userEmail: 'demo@example.com',
    items: [
      { name: 'Waggu Burger', price: 20, quantity: 2 },
      { name: 'BBQ Porkchop', price: 20, quantity: 1 }
    ],
    total: 60,
    status: 'completed',
    createdAt: new Date()
  },
  {
    userEmail: 'arya@winterfell.com',
    items: [
      { name: 'The Other Burrito', price: 20, quantity: 1 }
    ],
    total: 20,
    status: 'pending',
    createdAt: new Date()
  }
];

async function seed() {
  const db = await connectMongo();
  const ordersCollection = db.collection('orders');
  await ordersCollection.deleteMany({});
  await ordersCollection.insertMany(orders);
  console.log('Seeded orders!');
  process.exit(0);
}

seed().catch(err => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
