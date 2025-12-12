import mongoose from "mongoose";
import initializeDatabase from "./initDB.js";

mongoose.set("bufferCommands", false);

const connectDB = async (uri) => {
  try {
    await mongoose.connect(uri);
    console.log("db:connected");
    await initializeDatabase();
  } catch (err) {
    console.error("db:error", err?.message || err);
    throw err;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("db:disconnected");
});

export { mongoose, connectDB };
