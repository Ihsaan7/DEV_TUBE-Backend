import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/apiResponse.js";
import { v2 as cloudinary } from "cloudinary";

// Generate signature for direct Cloudinary upload
const generateUploadSignature = asyncHandler(async (req, res) => {
  const timestamp = Math.round(new Date().getTime() / 1000);
  
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp: timestamp,
      upload_preset: "devtube_uploads", // We'll create this preset
    },
    process.env.CLOUDINARY_API_SECRET
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        signature,
        timestamp,
        cloudName: process.env.CLOUDINARY_CLOUD_NAME,
        apiKey: process.env.CLOUDINARY_API_KEY,
      },
      "Upload signature generated"
    )
  );
});

export { generateUploadSignature };
