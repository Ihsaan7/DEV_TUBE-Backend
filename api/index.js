import app from "../src/app.js";
import connectDB from "../src/db/db.js";

// Connect to DB once
let isConnected = false;

const connectToDatabase = async () => {
  if (isConnected) {
    return;
  }
  try {
    await connectDB();
    isConnected = true;
  } catch (err) {
    console.log("Error connecting to MongoDB:", err);
  }
};

// Serverless handler
export default async (req, res) => {
  await connectToDatabase();
  return app(req, res);
};
