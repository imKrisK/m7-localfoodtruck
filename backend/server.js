import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import { connectMongo } from './db.js';
import itemsRouter from './routes/items.js';
import Stripe from 'stripe';

const app = express();
const PORT = process.env.PORT || 5380;
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // Use env variable in production

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true // Allow cookies/auth headers
}));
app.use(express.json());

connectMongo()
  .then(() => {
    app.use('/items', itemsRouter);
    import('./routes/users.js').then(({ default: usersRouter }) => {
      app.use('/users', usersRouter);
      import('./routes/orders.js').then(({ default: ordersRouter }) => {
        app.use('/orders', ordersRouter);
        import('./routes/favorites.js').then(({ default: favoritesRouter }) => {
          app.use('/favorites', favoritesRouter);
          import('./routes/reviews.js').then(({ default: reviewsRouter }) => {
            app.use('/reviews', reviewsRouter);
            app.listen(PORT, () => {
              console.log(`Backend server running on http://localhost:${PORT}`);
            });
          });
        });
      });
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err.message);
    process.exit(1);
  });

app.post('/create-payment-intent', async (req, res) => {
  const { amount } = req.body; // amount in cents
  if (!amount || typeof amount !== 'number' || amount < 50) {
    return res.status(400).send({ error: 'Invalid amount' });
  }
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
    });
    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});
