import { mongoose } from "../db.js";

const schema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: "" },
    icon: { type: String, default: "" }
  },
  { timestamps: true }
);

const Achievement = mongoose.model("Achievement", schema);
export default Achievement;
