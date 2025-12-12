import { mongoose } from "../db.js";

const schema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String, default: "" },
    color: { type: String, default: "" },
    courseCount: { type: Number, default: 0 }
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", schema);
export default Category;
