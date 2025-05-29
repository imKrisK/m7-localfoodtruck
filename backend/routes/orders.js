import express from 'express';
import * as ordersController from '../controllers/ordersController.js';
import Stripe from 'stripe';

const router = express.Router();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

router.get('/', ordersController.getAllOrders);
router.get('/:id', ordersController.getOrderById);
router.post('/', ordersController.createOrder);
router.put('/:id', ordersController.updateOrder);
router.delete('/:id', ordersController.deleteOrder);

// Add this route for MongoDB-based receipt lookup by orderId and email
router.get('/by-id-email', async (req, res) => {
  const { orderId, email } = req.query;
  if (!orderId || !email) return res.status(400).json({ error: 'Order ID and Email are required.' });
  try {
    // Try to find by orderId (string) and guestInfo.email or userEmail
    const db = req.app.get('db') || require('../db.js');
    const getDb = db.getDb || db.default.getDb;
    const ordersCollection = getDb().collection('orders');
    const order = await ordersCollection.findOne({
      $and: [
        { $or: [ { orderId }, { _id: orderId } ] },
        { $or: [ { 'guestInfo.email': email }, { userEmail: email } ] }
      ]
    });
    if (!order) return res.status(404).json({ error: 'Order not found.' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
});

// Payment route
router.post('/create-payment-intent', async (req, res) => {
  const { amount } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // amount in cents
      currency: 'usd',
    });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
