import { mongoose } from "../db.js";

const schema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    message: { type: String, required: true },
    publishedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

const Announcement = mongoose.model("Announcement", schema);
export default Announcement;
