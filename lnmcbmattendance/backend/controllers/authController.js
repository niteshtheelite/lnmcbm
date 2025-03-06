import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/userSchema.js";
import sendToken from "../utils/jwtToken.js";

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Ensure only the first registered user is an admin
    const isFirstUser = (await User.countDocuments()) === 0;
    const role = isFirstUser ? "admin" : "teacher"; // First user = admin, others = student

    const user = await User.create({ name, email, password, role });
    sendToken(user, 201, res);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next("Pleasee enter a valid Email and password");
    }

    // Check if user exists
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next("email invalid");
    }

    const ispasswordMatched = await user.comparePassword(password);

    if (!ispasswordMatched) {
      return next("Inavlid password");
    }
    sendToken(user, 200, res);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logout = async (req, res, next) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });

    res.status(200).json({
      success: true,
      message: "Logged Out",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
