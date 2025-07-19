import { MongoClient } from 'mongodb';

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017';
const DB_NAME = process.env.DB_NAME || 'localfoodtruck';

let db = null;


// Retry logic: try to connect to MongoDB with retries and delay
export async function connectMongo(retries = 10, delayMs = 2000) {
  let lastErr;
  for (let i = 0; i < retries; i++) {
    try {
      const client = new MongoClient(MONGO_URL);
      await client.connect();
      db = client.db(DB_NAME);
      return db;
    } catch (err) {
      lastErr = err;
      console.warn(`MongoDB connection failed (attempt ${i + 1}/${retries}): ${err.message}`);
      if (i < retries - 1) {
        await new Promise(res => setTimeout(res, delayMs));
      }
    }
  }
  throw lastErr;
}

export function getDb() {
  if (!db) throw new Error('MongoDB not connected!');
  return db;
}
