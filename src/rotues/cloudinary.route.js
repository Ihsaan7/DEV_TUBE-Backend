import Router from "express";
import verifyJWT from "../middlewares/auth.mware.js";
import { generateUploadSignature } from "../controllers/cloudinary.controller.js";

const router = Router();

// Protected route - requires authentication
router.use(verifyJWT);

router.route("/upload-signature").get(generateUploadSignature);

export default router;
