import asyncHandler from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import jwt from "jsonwebtoken";

export const register = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new ApiError(400, "All fields are required!");
  }

  const existUser = await User.findOne({ email });
  if (existUser) {
    throw new ApiError(400, "User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  res.status(201).json({
    success: true,
    message: "User registered successfully",
  });
});

export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "All fields are required!");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(401, "Invalid credentials");
  }

  const passwordMatch = await user.comparePassword(password);
  if (!passwordMatch) {
    throw new ApiError(401, "Invalid credentials");
  }

  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.json({
    success: true,
    token,
  });
});