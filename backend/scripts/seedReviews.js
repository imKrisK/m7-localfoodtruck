import { connectMongo } from '../db.js';

const reviews = [
  {
    userEmail: 'demo@example.com',
    itemName: 'Waggu Burger',
    rating: 5,
    comment: 'Absolutely delicious! Will order again.',
    createdAt: new Date()
  },
  {
    userEmail: 'arya@winterfell.com',
    itemName: 'The Other Burrito',
    rating: 4,
    comment: 'Tasty and filling.',
    createdAt: new Date()
  },
  {
    userEmail: 'jon@winterfell.com',
    itemName: 'The Cal Burger Zone',
    rating: 3,
    comment: 'Good, but could use more sauce.',
    createdAt: new Date()
  }
];

async function seed() {
  const db = await connectMongo();
  const reviewsCollection = db.collection('reviews');
  await reviewsCollection.deleteMany({});
  await reviewsCollection.insertMany(reviews);
  console.log('Seeded reviews!');
  process.exit(0);
}

seed().catch(err => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
