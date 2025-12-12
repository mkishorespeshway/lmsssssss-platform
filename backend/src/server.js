import dotenv from "dotenv";
import app from "./app.js";
import { connectDB } from "./db.js";

dotenv.config({ override: true });

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://naveendamera317_db_user:1234@cluster0.py9kknq.mongodb.net/?appName=Cluster0";

const start = async () => {
  try {
    await connectDB(MONGO_URI);
    app.listen(PORT, () => {
      console.log(`server running on port number ${PORT}`);
    });
  } catch (e) {
    console.error("startup:error", e?.message || e);
  }
};

start();
