import { mongoose } from "../db.js";

const schema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    amount: { type: Number, required: true },
    paymentDate: { type: Date, default: Date.now },
    status: { type: String, enum: ["pending", "completed", "failed"], default: "completed" },
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", schema);
export default Payment;
