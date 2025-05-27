import { ObjectId } from 'mongodb';
import { getDb } from '../db.js';

function isValidObjectId(id) {
  return typeof id === 'string' && id.match(/^[a-fA-F0-9]{24}$/);
}

export function getUsersCollection() {
  return getDb().collection('users');
}

export async function getAllUsers() {
  return getUsersCollection().find().toArray();
}

export async function getUserById(id) {
  if (!isValidObjectId(id)) return null;
  return getUsersCollection().findOne({ _id: new ObjectId(id) });
}

export async function getUserByEmail(email) {
  return getUsersCollection().findOne({ email });
}

export async function createUser(data) {
  const result = await getUsersCollection().insertOne(data);
  return { _id: result.insertedId, ...data };
}

export async function updateUser(id, data) {
  if (!isValidObjectId(id)) return null;
  const result = await getUsersCollection().findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: data },
    { returnDocument: 'after', returnOriginal: false }
  );
  console.log('[updateUser] id:', id, 'result:', result);
  // Workaround: fetch the user after update to confirm
  const updated = await getUsersCollection().findOne({ _id: new ObjectId(id) });
  if (!updated) return null;
  return updated;
}

export async function deleteUser(id) {
  if (!isValidObjectId(id)) return null;
  const result = await getUsersCollection().findOneAndDelete({ _id: new ObjectId(id) });
  console.log('[deleteUser] id:', id, 'result:', result);
  // Workaround: check if user still exists after delete
  const deleted = await getUsersCollection().findOne({ _id: new ObjectId(id) });
  if (deleted) return null; // If still exists, deletion failed
  return result.value;
}
