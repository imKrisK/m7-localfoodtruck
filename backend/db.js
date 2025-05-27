import { MongoClient } from 'mongodb';

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017';
const DB_NAME = process.env.DB_NAME || 'localfoodtruck';

let db = null;

export async function connectMongo() {
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  db = client.db(DB_NAME);
  return db;
}

export function getDb() {
  if (!db) throw new Error('MongoDB not connected!');
  return db;
}
