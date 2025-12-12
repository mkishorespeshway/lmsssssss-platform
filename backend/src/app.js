import 'dotenv/config';
import express from "express";
import cors from "cors";
import morgan from "morgan";
import { v2 as cloudinary } from 'cloudinary';
import routes from "./routes/index.js";
import { errorHandler, notFound } from "./middlewares/errorHandler.js";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/uploads", express.static("uploads")); // Serve static files from the 'uploads' directory
app.use("/api", routes);
app.use(notFound);
app.use(errorHandler);

export default app;
