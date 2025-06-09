import mongoose from "mongoose"; // Import mongoose
import "dotenv/config";

const url = process.env.DB_URL; // DB url

export const connectUsingMongoose = async () => {
  try {
    await mongoose.connect(url);
    console.log("MongoDB connected using mongoose");
  } catch (error) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};
