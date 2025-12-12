import { Router } from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import multer from "multer";
import { v2 as cloudinary } from 'cloudinary';
import DataUri from 'datauri/parser.js';
import path from 'path';

const router = Router();

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/register", upload.single("profilePicture"), async (req, res, next) => {
  try {
    const { username, email, password, phone } = req.body;
    let profilePicture;

    if (req.file) {
      const parser = new DataUri();
      const fileUri = parser.format(path.extname(req.file.originalname).toString(), req.file.buffer);
      const result = await cloudinary.uploader.upload(fileUri.content);
      profilePicture = result.secure_url;
    }

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    user = new User({
      username,
      email,
      password: hashedPassword,
      phone,
      profilePicture,
    });

    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.status(200).json({ message: "Logged in successfully", user: { id: user._id, username: user.username, email: user.email, role: user.role, phone: user.phone, profilePicture: user.profilePicture } });
  } catch (error) {
    next(error);
  }
});

export default router;
