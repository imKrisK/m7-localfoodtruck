import * as OrderModel from '../models/orderModel.js';

export async function getAllOrders(req, res) {
  const orders = await OrderModel.getAllOrders();
  res.json(orders);
}

export async function getOrderById(req, res) {
  try {
    const order = await OrderModel.getOrderById(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch {
    res.status(400).json({ error: 'Invalid ID' });
  }
}

export async function createOrder(req, res) {
  const order = await OrderModel.createOrder(req.body);
  res.status(201).json(order);
}

export async function updateOrder(req, res) {
  try {
    const updated = await OrderModel.updateOrder(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: 'Order not found' });
    res.json(updated);
  } catch {
    res.status(400).json({ error: 'Invalid ID' });
  }
}

export async function deleteOrder(req, res) {
  try {
    const deleted = await OrderModel.deleteOrder(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Order not found' });
    res.json(deleted);
  } catch {
    res.status(400).json({ error: 'Invalid ID' });
  }
}
