//Configuring DOTENV first
import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});

// DB Connection setup
import connectDB from "./db/db.js";
import app from "./app.js";

// Connect to DB
connectDB().catch((err) => {
  console.log("Error while Connecting to MONGODB!!!", err);
});

// For local development
if (process.env.NODE_ENV !== "production") {
  app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running at PORT: ${process.env.PORT}`);
  });
}

// Export for Vercel serverless
export default app;
