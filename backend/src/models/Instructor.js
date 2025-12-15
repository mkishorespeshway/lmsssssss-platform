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
    levelVideos: {
      Beginner: {
        videos: [{ url: String, title: String, description: String }],
        videoDuration: { type: String, default: "" },
      },
      Intermediate: {
        videos: [{ url: String, title: String, description: String }],
        videoDuration: { type: String, default: "" },
      },
      Advanced: {
        videos: [{ url: String, title: String, description: String }],
        videoDuration: { type: String, default: "" },
      },
    },
    level: { type: String, default: "" },
  },
  { timestamps: true }
);

const Instructor = mongoose.model("Instructor", schema);
export default Instructor;
