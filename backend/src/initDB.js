import Plan from "./models/Plan.js";
import Announcement from "./models/Announcement.js";
import Course from "./models/Course.js";
import Enrollment from "./models/Enrollment.js";
import User from "./models/User.js";
import Payment from "./models/Payment.js";

const initializeDatabase = async () => {
  try {
    await Plan.createCollection();
    await Announcement.createCollection();
    await Course.createCollection();
    await Enrollment.createCollection();
    await User.createCollection();
    await Payment.createCollection();
    console.log("All collections ensured.");
  } catch (error) {
    console.error("Error ensuring collections:", error);
  }
};

export default initializeDatabase;
