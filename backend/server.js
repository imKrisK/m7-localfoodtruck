import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import { connectMongo } from './db.js';
import itemsRouter from './routes/items.js';
import Stripe from 'stripe';


const stripe = Stripe(process.env.STRIPE_SECRET_KEY); // Stripe secret key loaded from .env
const app = express();
const PORT = process.env.PORT || 5380;


app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true // Allow cookies/auth headers
}));
app.use(express.json());

app.post('/api/create-checkout-session', async (req, res) => {
  const { items, customer } = req.body;
  // Map your cart items to Stripe line items
  const line_items = items.map(item => ({
    price_data: {
      currency: 'usd',
      product_data: { name: item.item },
      unit_amount: Math.round(Number(item.price.replace(/[^\\d.]/g, '')) * 100),
    },
    quantity: item.quantity,
  }));
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: 'http://localhost:5173/receipt.html?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'http://localhost:5173/checkout.html',
      customer_email: customer.email,
    });
    res.json({ url: session.url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/stripe-session', async (req, res) => {
  const sessionId = req.query.session_id;
  if (!sessionId) return res.status(400).json({ error: 'Missing session_id' });
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, { expand: ['line_items', 'customer'] });
    // Build order object for receipt page
    const items = (session.line_items && session.line_items.data) ? session.line_items.data.map(li => ({
      item: li.description,
      quantity: li.quantity,
      price: `$${(li.price.unit_amount / 100).toFixed(2)}`
    })) : [];
    const guestInfo = {
      name: session.customer_details?.name || '',
      email: session.customer_details?.email || '',
      address: session.customer_details?.address ? Object.values(session.customer_details.address).filter(Boolean).join(', ') : ''
    };
    res.json({
      items,
      guestInfo,
      orderId: session.id
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

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
            import('./routes/payments.js').then(({ default: paymentsRouter }) => {
              app.use('/payments', paymentsRouter);
              app.listen(PORT, () => {
                console.log(`Backend server running on http://localhost:${PORT}`);
              });
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
