import multer from "multer";

// Use memory storage for Vercel serverless (no filesystem access)
const storage = multer.memoryStorage();

export const uploadMulter = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit for uploads (video)
});
