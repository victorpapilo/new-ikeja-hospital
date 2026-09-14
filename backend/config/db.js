import mongoose from "mongoose";

// Cached across invocations so Vercel's serverless functions (which can reuse
// a "warm" instance between requests) don't open a new MongoDB connection
// every single time. Locally this just connects once, as before.
let isConnected = false;

const connectDB = async () => {
  if (isConnected || mongoose.connection.readyState === 1) return;
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    isConnected = true;
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    if (process.env.VERCEL !== "1") process.exit(1); // don't kill a serverless function
    throw error;
  }
};

export default connectDB;
