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
    console.error("MongoDB connection error:", err);
  }
};

// Serverless handler
export default async (req, res) => {
  try {
    // Connect to database
    await connectToDatabase();
    
    // Let Express handle the request (CORS is already configured in app.js)
    return app(req, res);
  } catch (err) {
    console.error("Serverless function error:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
