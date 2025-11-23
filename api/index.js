import app from "../src/app.js";
import connectDB from "../src/db/db.js";

let dbConnected = false;
async function ensureDB() {
  if (!dbConnected) {
    await connectDB();
    dbConnected = true;
  }
}

let serverlessHandler = null;
async function getHandler() {
  if (serverlessHandler) return serverlessHandler;

  try {
    const { default: serverless } = await import("serverless-http");
    serverlessHandler = serverless(app);
  } catch (err) {
    // serverless-http not installed / import failed — fall back to direct express app
    serverlessHandler = (req, res) => app(req, res);
  }

  return serverlessHandler;
}

export default async function handler(req, res) {
  try {
    await ensureDB();
    const h = await getHandler();
    return h(req, res);
  } catch (err) {
    console.error("Serverless handler error:", err);
    res.statusCode = 500;
    res.end(JSON.stringify({ error: "Internal Server Error" }));
  }
}
