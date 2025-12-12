import mongoose from "mongoose";
import Plan from "./models/Plan.js";
import Announcement from "./models/Announcement.js";
import Course from "./models/Course.js";
import Enrollment from "./models/Enrollment.js";
import User from "./models/User.js";
import Payment from "./models/Payment.js";

mongoose.set("bufferCommands", false);

const connectDB = async (uri) => {
  try {
    await mongoose.connect(uri);
    console.log("db:connected");
    await Plan.createCollection();
    await Announcement.createCollection();
    await Course.createCollection();
    await Enrollment.createCollection();
    await User.createCollection();
    await Payment.createCollection();
    console.log("All collections ensured.");
  } catch (err) {
    console.error("db:error", err?.message || err);
    throw err;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("db:disconnected");
});

export { mongoose, connectDB };
