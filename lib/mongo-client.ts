import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("Missing MONGODB_URI environment variable.");
}

declare global {
  var __trustpayMongoClientPromise: Promise<MongoClient> | undefined;
}

const client = new MongoClient(uri);

export const mongoClientPromise =
  global.__trustpayMongoClientPromise ?? client.connect();

if (!global.__trustpayMongoClientPromise) {
  global.__trustpayMongoClientPromise = mongoClientPromise;
}

export async function getMongoDb() {
  const mongoClient = await mongoClientPromise;
  return mongoClient.db(process.env.MONGODB_DB ?? "trustpay");
}
