import { mongoose } from "../db.js";

const schema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, unique: true, sparse: true },
    profilePicture: { type: String },
    role: { type: String, enum: ["student", "instructor", "admin"], default: "student" },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const User = mongoose.model("User", schema);
export default User;
