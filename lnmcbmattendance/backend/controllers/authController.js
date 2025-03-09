import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/userSchema.js";
import sendToken from "../utils/jwtToken.js";
import sendEmail from "../utils/sendEmail.js";
import crypto from "crypto";

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

// export const forgetPassword = async (req, res, next) => {
//   const user = await User.findOne({ email: req.body.email });

//   if (!user) {
//     return next("User not found", 404);
//   }
//   console.log("User found:", user);

//   const resetToken = user.getResetPasswordToken();
//   console.log("Generated Reset Token:", resetToken);

//   await user.save({ validateBeforeSave: false });

//   const resetPasswordUri = `${req.protocol}://${req.get(
//     "host"
//   )}/auth/password/reset/${resetToken}`;

//   const message = `Your password reset token is :- \n\n\ ${resetPasswordUri} \n\n If you have not requested this email then, please ignore it.`;
//   try {
//     await sendEmail({
//       email: user.email,
//       subject: `LNMCBM`,
//       message,
//     });

//     res.status(200).json({
//       success: true,
//       message: `Email sent to ${user.email} successfully`,
//     });
//   } catch (error) {
//     user.resetPasswordToken = undefined;
//     user.resetPasswordExpire = undefined;
//     await user.save({ validateBeforeSave: false });

//     return next(error.message, 500);
//   }
// };

export const forgetPassword = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next("User not found", 404);
  }

  // Generate reset token (this function returns raw token)
  const resetToken = user.getResetPasswordToken();

  // Save the user with the hashed token
  await user.save({ validateBeforeSave: false });

  // Send the **raw token** in the email
  const resetPasswordUri = `${req.protocol}://${req.get(
    "host"
  )}/auth/password/reset/${resetToken}`;

  const message = `Your password reset token is: \n\n${resetPasswordUri} \n\nIf you did not request this, please ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: "LNMCBM Password Reset",
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });

    return next(error.message, 500);
  }
};

// export const resetPassword = async (req, res, next) => {
//   const resetPasswordToken = crypto
//     .createHash("sha256")
//     .update(req.params.token)
//     .digest("hex");

//   const user = await User.findOne({
//     resetPasswordToken,
//     resetPasswordExpire: { $gt: Date.now() },
//   });

//   if (!user) {
//     return next("Reset Password Token is invalid or has been expired", 400);
//   }

//   if (req.body.password !== req.body.confirmPassword) {
//     return next("Password does not password", 400);
//   }

//   user.password = req.body.password;
//   user.resetPasswordToken = undefined;
//   user.resetPasswordExpire = undefined;

//   await user.save();

//   sendToken(user, 200, res);
// };

export const resetPassword = async (req, res, next) => {
  console.log("Received Token from URL:", req.params.token); // Debugging

  // Hash the received token from URL
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  console.log("Hashed Token to Match in DB:", resetPasswordToken); // Debugging

  // Find user with matching hashed token
  const user = await User.findOne({
    resetPasswordToken: resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next("Reset Password Token is invalid or has expired", 400);
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next("Passwords do not match", 400);
  }

  // Save new password and remove token fields
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  res.status(200).json({
    success: true,
    message: "Password reset successful",
  });
};
