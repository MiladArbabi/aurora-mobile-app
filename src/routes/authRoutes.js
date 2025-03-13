import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { body, validationResult } from "express-validator";
import User from "../models/User.js";

const router = express.Router();

// @route   POST /api/auth/register
// @desc    Register a new user
router.post(
  "/register",
  [
    body("name", "Name is required").notEmpty(),
    body("email", "Valid email required").isEmail(),
    body("password", "Min 6 characters required").isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (user) return res.status(400).json({ msg: "User already exists" });

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      user = new User({ name, email, password: hashedPassword });
      await user.save();

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
      res.json({ token });
    } catch (err) {
      res.status(500).json({ msg: "Server error" });
    }
  }
);

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
router.post(
  "/login",
  [
    body("email", "Valid email required").isEmail(),
    body("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (!user) return res.status(400).json({ msg: "Invalid credentials" });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
      res.json({ token });
    } catch (err) {
      res.status(500).json({ msg: "Server error" });
    }
  }
);

export default router;
