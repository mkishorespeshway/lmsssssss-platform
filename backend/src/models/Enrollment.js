import { mongoose } from "../db.js";

const schema = new mongoose.Schema(
  {
    studentName: { type: String, required: true },
    studentEmail: { type: String, default: "" },
    courseTitle: { type: String, required: true },
    amount: { type: Number, default: 0 }
  },
  { timestamps: true }
);

const Enrollment = mongoose.model("Enrollment", schema);
export default Enrollment;
