import express, { Express,json } from "express";
import dotenv from "dotenv";
import { router } from "./routes";
import cors from "cors";
import { Db, MongoClient } from "mongodb";

dotenv.config();

const app: Express = express();
const port = 3000;


app.use(cors());
app.use(json());


export let cachedDb: any;


export async function connectToDatabase() {
  if (cachedDb) {
    console.log("Using existing connection to the database.");
    return cachedDb;
  }
  try {
    const mongoUrl = process.env.MONGO_URL!
     cachedDb = new MongoClient(mongoUrl, {
      connectTimeoutMS: 10000
    });
    await cachedDb.connect();
    console.log("=> Connected successfully to database");
    return cachedDb;
  } catch (error) {
    console.log("=> Error While connecting to database");
    console.error(error);
    throw error;
  }
}














app.use('/api', router);


app.listen(port, () => {
  console.log(port)
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
