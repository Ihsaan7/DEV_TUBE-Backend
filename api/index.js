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
    // Continue; Express can still respond with errors and CORS
  }
};

// Helper to set CORS headers regardless of success or failure
const DEFAULT_ORIGIN = "https://dev-tube-frontend.vercel.app";
const ALLOWED_ORIGINS = [
  DEFAULT_ORIGIN,
  "http://localhost:5173",
  process.env.CORS_ORIGIN,
].filter(Boolean);

function setCorsHeaders(res, origin) {
  const useOrigin = origin && ALLOWED_ORIGINS.includes(origin) ? origin : DEFAULT_ORIGIN;
  res.setHeader("Access-Control-Allow-Origin", useOrigin);
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
}

// Serverless handler with preflight and error fallback
export default async (req, res) => {
  try {
    // Always set CORS before any response
    setCorsHeaders(res, req.headers.origin);

    // Short-circuit preflight
    if (req.method === "OPTIONS") {
      res.statusCode = 200;
      res.end();
      return;
    }

    // Ensure DB is connected (or at least attempted)
    await connectToDatabase();

    // Delegate to Express app
    return app(req, res);
  } catch (err) {
    // Defensive: ensure CORS headers and return JSON on uncaught errors
    setCorsHeaders(res, req.headers.origin);
    console.error("Unhandled API error:", err);
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.end(
      JSON.stringify({
        success: false,
        message: "Internal server error",
        error: process.env.NODE_ENV === "development" ? String(err) : undefined,
      })
    );
  }
};
