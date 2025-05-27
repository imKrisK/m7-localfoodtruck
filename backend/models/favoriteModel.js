import { ObjectId } from 'mongodb';
import { getDb } from '../db.js';

export function getFavoritesCollection() {
  return getDb().collection('favorites');
}

export async function getAllFavorites() {
  return getFavoritesCollection().find().toArray();
}

export async function getFavoriteById(id) {
  if (!ObjectId.isValid(id)) return null;
  return getFavoritesCollection().findOne({ _id: new ObjectId(id) });
}

export async function createFavorite(data) {
  const result = await getFavoritesCollection().insertOne(data);
  return { _id: result.insertedId, ...data };
}

export async function deleteFavorite(id) {
  if (!ObjectId.isValid(id)) return null;
  const result = await getFavoritesCollection().findOneAndDelete({ _id: new ObjectId(id) });
  const deleted = await getFavoritesCollection().findOne({ _id: new ObjectId(id) });
  if (deleted) return null;
  return result.value;
}
