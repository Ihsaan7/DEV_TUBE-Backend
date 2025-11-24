import connectDB from "../src/db/db.js";
import app from "../src/app.js";

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
    throw err;
  }
};

// Middleware to ensure DB connection
app.use(async (req, res, next) => {
  try {
    await connectToDatabase();
    next();
  } catch (err) {
    console.error("Database connection failed:", err);
    res.status(500).json({
      success: false,
      message: "Database connection failed",
      error: err.message,
    });
  }
});

export default app;
