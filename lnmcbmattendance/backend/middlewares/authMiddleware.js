import jwt from "jsonwebtoken";
import { User } from "../models/userSchema.js";

export const isAuthenticatedUser = async (req, res, next) => {
  try {
    const token =
      req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ message: "Please login to access" });
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch user from DB
    req.user = await User.findById(decodedData.id);

    if (!req.user) {
      return res
        .status(401)
        .json({ message: "User does not exist. Please log in again." });
    }

    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid Token", error: error.message });
  }
};

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    // Ensure user is defined
    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    // Check if user role is allowed
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: `Role: ${req.user.role} is not allowed to access this resource`,
      });
    }

    // Continue if the role is authorized
    next();
  };
};
