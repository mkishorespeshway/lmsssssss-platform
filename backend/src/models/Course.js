import { mongoose } from "../db.js";

const schema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: "" },
    thumbnail: { type: String, default: "" },
    category: { type: String, index: true },
    instructor: { type: String, index: true },
    duration: { type: String, default: "" },
    lessons: { type: Number, default: 0 },
    students: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    level: { type: String, enum: ["Beginner", "Intermediate", "Advanced"], default: "Beginner" },
    price: { type: Number, default: 0 },
    isFeatured: { type: Boolean, default: false }
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", schema);
export default Course;
