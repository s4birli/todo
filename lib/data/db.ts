import { MongoClient, MongoClientOptions, Db } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

export async function connectToDatabase(): Promise<Db> {
  const options: MongoClientOptions = {
    // @ts-ignore
    useUnifiedTopology: true,
  };

  const url: string = process.env.MONGODB_URL ? process.env.MONGODB_URL : "";
  const client = new MongoClient(url, options);

  try {
    await client.connect();
    const db = client.db();
    return db;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}
