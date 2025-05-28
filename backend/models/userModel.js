import { ObjectId } from 'mongodb';
import { getDb } from '../db.js';
import bcrypt from 'bcrypt';

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
  // Hash password before saving
  const hashedPassword = await bcrypt.hash(data.password, 10);
  const userData = { ...data, password: hashedPassword };
  const result = await getUsersCollection().insertOne(userData);
  return { _id: result.insertedId, ...userData };
}

export async function updateUser(id, data) {
  if (!isValidObjectId(id)) return null;
  let updateData = { ...data };
  if (data.password) {
    updateData.password = await bcrypt.hash(data.password, 10);
  }
  const result = await getUsersCollection().findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: updateData },
    { returnDocument: 'after', returnOriginal: false }
  );
  // Workaround: fetch the user after update to confirm
  const updated = await getUsersCollection().findOne({ _id: new ObjectId(id) });
  if (!updated) return null;
  return updated;
}

export async function deleteUser(id) {
  if (!isValidObjectId(id)) return null;
  const result = await getUsersCollection().findOneAndDelete({ _id: new ObjectId(id) });
  // Workaround: check if user still exists after delete
  const deleted = await getUsersCollection().findOne({ _id: new ObjectId(id) });
  if (deleted) return null; // If still exists, deletion failed
  return result.value;
}
