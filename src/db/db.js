import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectionInstant = await mongoose.connect(process.env.MONGODB_URI);
    console.log(
      `\n Connection Successfull MONGODB HOST: ${connectionInstant.connection.host}`
    );
  } catch (err) {
    console.log("Connection Error to MONGODB!!!", err);
    // Do not terminate the process in serverless environments.
    // Throw the error so the caller can handle it and still respond with CORS headers.
    throw err;
  }
};

export default connectDB;
