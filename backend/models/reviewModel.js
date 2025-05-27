import { ObjectId } from 'mongodb';
import { getDb } from '../db.js';

export function getReviewsCollection() {
  return getDb().collection('reviews');
}

export async function getAllReviews() {
  return getReviewsCollection().find().toArray();
}

export async function getReviewById(id) {
  if (!ObjectId.isValid(id)) return null;
  return getReviewsCollection().findOne({ _id: new ObjectId(id) });
}

export async function createReview(data) {
  const result = await getReviewsCollection().insertOne(data);
  return { _id: result.insertedId, ...data };
}

export async function updateReview(id, data) {
  if (!ObjectId.isValid(id)) return null;
  const result = await getReviewsCollection().findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: data },
    { returnDocument: 'after', returnOriginal: false }
  );
  const updated = await getReviewsCollection().findOne({ _id: new ObjectId(id) });
  if (!updated) return null;
  return updated;
}

export async function deleteReview(id) {
  if (!ObjectId.isValid(id)) return null;
  const result = await getReviewsCollection().findOneAndDelete({ _id: new ObjectId(id) });
  const deleted = await getReviewsCollection().findOne({ _id: new ObjectId(id) });
  if (deleted) return null;
  return result.value;
}
