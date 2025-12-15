import { mongoose } from "../db.js";

const schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    title: { type: String, default: "" },
    category: { type: String, default: "" },
    courses: { type: Number, default: 0 },
    students: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    image: { type: String, default: "" },
    videoUrls: { type: [String], default: [] },
    videoTitles: { type: [String], default: [] },
    videoDescriptions: { type: [String], default: [] },
    level: { type: String, default: "" },
    videoDuration: { type: String, default: "" }
  },
  { timestamps: true }
);

const Instructor = mongoose.model("Instructor", schema);
export default Instructor;
