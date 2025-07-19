

const { connectMongo } = require('../db.js');

const initialItems = [
  {
    name: 'Wagyu Burger',
    price: 22,
    description: 'Juicy Wagyu beef burger with cheddar, lettuce, and tomato',
    image: 'burger.png',
  },
  {
    name: 'BBQ Porkchop',
    price: 19,
    description: 'Tender BBQ porkchop with smoky sauce and grilled veggies',
    image: 'bbq-porkchop.png',
  },
  {
    name: 'Loaded Burrito',
    price: 16,
    description: 'Burrito stuffed with beef, beans, rice, and salsa',
    image: 'burrito1.png',
  },
  {
    name: 'Cal Burger Zone',
    price: 18,
    description: 'Classic California burger with avocado and sprouts',
    image: 'calburgerzone.png',
  },
  {
    name: 'Fries',
    price: 6,
    description: 'Crispy golden fries',
    image: 'fries.png',
  },
  {
    name: 'Combo Platter',
    price: 25,
    description: 'Burger, fries, and drink combo',
    image: 'combo1.png',
  },
  {
    name: 'Soft Drinks',
    price: 3,
    description: 'Assorted sodas and soft drinks',
    image: 'softdrinks.jpg',
  },
  {
    name: 'Ribs',
    price: 24,
    description: 'Slow-cooked pork ribs with BBQ sauce',
    image: 'ribs.png',
  },
];

async function seedItems() {
  try {
    const db = await connectMongo();
    const items = db.collection('items');
    await items.deleteMany({});
    await items.insertMany(initialItems);
    console.log('Seeded initial items!');
    process.exit(0);
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exit(1);
  }
}

seedItems();
