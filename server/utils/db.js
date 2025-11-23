import mongoose from "mongoose";
import { DB_URI } from "../config/env.js";

const connectDB = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    console.error("⚠️  Server will start but database operations will fail");
    console.error("📋 Please install and start MongoDB:");
    console.error("   - On macOS: brew services start mongodb-community");
    console.error("   - On Linux: sudo systemctl start mongod");
    console.error("   - On Windows: Start MongoDB service from Services");
    // Don't exit, allow server to start for static content/testing
  }
};

export default connectDB;
