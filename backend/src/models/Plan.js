import { mongoose } from "../db.js";

const schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, default: "" },
    features: [{ type: String }],
    cta: { type: String, default: "" },
    popular: { type: Boolean, default: false }
  },
  { timestamps: true }
);

const Plan = mongoose.model("Plan", schema);
export default Plan;
