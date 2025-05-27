import { ObjectId } from 'mongodb';
import { getDb } from '../db.js';

export function getOrdersCollection() {
  return getDb().collection('orders');
}

export async function getAllOrders() {
  return getOrdersCollection().find().toArray();
}

export async function getOrderById(id) {
  if (!ObjectId.isValid(id)) return null;
  return getOrdersCollection().findOne({ _id: new ObjectId(id) });
}

export async function createOrder(data) {
  const result = await getOrdersCollection().insertOne(data);
  return { _id: result.insertedId, ...data };
}

export async function updateOrder(id, data) {
  if (!ObjectId.isValid(id)) return null;
  const result = await getOrdersCollection().findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: data },
    { returnDocument: 'after', returnOriginal: false }
  );
  const updated = await getOrdersCollection().findOne({ _id: new ObjectId(id) });
  if (!updated) return null;
  return updated;
}

export async function deleteOrder(id) {
  if (!ObjectId.isValid(id)) return null;
  const result = await getOrdersCollection().findOneAndDelete({ _id: new ObjectId(id) });
  const deleted = await getOrdersCollection().findOne({ _id: new ObjectId(id) });
  if (deleted) return null;
  return result.value;
}
