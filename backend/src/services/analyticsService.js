import Course from "../models/Course.js";
import Enrollment from "../models/Enrollment.js";

const overview = async () => {
  const totalStudents = await Enrollment.countDocuments();
  const totalCourses = await Course.countDocuments();
  const totalEnrollments = totalStudents;
  const totalRevenueAgg = await Enrollment.aggregate([
    { $group: { _id: null, sum: { $sum: "$amount" } } }
  ]);
  const totalRevenue = totalRevenueAgg.length ? totalRevenueAgg[0].sum : 0;
  return { totalStudents, totalCourses, totalEnrollments, totalRevenue };
};

export default { overview };
