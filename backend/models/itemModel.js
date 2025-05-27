import { ObjectId } from 'mongodb';
import { getDb } from '../db.js';

export function getItemsCollection() {
  return getDb().collection('items');
}

export async function getAllItems() {
  return getItemsCollection().find().toArray();
}

export async function getItemById(id) {
  return getItemsCollection().findOne({ _id: new ObjectId(id) });
}

export async function createItem(data) {
  const result = await getItemsCollection().insertOne(data);
  return { _id: result.insertedId, ...data };
}

export async function updateItem(id, data) {
  const result = await getItemsCollection().findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: data },
    { returnDocument: 'after' }
  );
  return result.value;
}

export async function deleteItem(id) {
  const result = await getItemsCollection().findOneAndDelete({ _id: new ObjectId(id) });
  return result.value;
}
