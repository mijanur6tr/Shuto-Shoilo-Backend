import mongoose from "mongoose";
import { seedDatabaseIfEmpty } from "../utils/seeder.js";

let isConnected = false;

const connectDb = async () => {
  try {
    if (mongoose.connection.readyState >= 1) {
      return mongoose.connection;
    }

    if (!process.env.MONGODB_URI) {
      console.warn("MONGODB_URI environment variable is not defined");
      return;
    }

    await mongoose.connect(process.env.MONGODB_URI, {
      bufferCommands: false,
    });
    isConnected = true;
    console.log("MongoDB connected successfully!");

    // Check if initial seeding is needed
    await seedDatabaseIfEmpty();
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
  }
};

export default connectDb;