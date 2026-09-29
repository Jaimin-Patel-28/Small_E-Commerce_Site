import UserModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateTokens.js";
import jwt from "jsonwebtoken";

const registerUser = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  const existingUser = await UserModel.findOne({ email });

  if (existingUser) {
    return res.status(409).json({
      message: "Email already registered",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await UserModel.create({
    name,
    email,
    passwordHash: hashedPassword,
  });

  newUser.passwordHash = undefined;

  res.status(201).json({
    message: "User created successfully",
    data: newUser,
  });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email }).select("+passwordHash");

  if (!user) {
    return res.status(401).json({
      message: "Invalid email or password",
    });
  }

  const isMatch = await bcrypt.compare(password, user.passwordHash);

  if (!isMatch) {
    return res.status(401).json({
      message: "Invalid email or passwword",
    });
  }

  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
  user.refreshToken = hashedRefreshToken;
  await user.save();

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    message: "Login scuccessful",
    accessToken,
  });
};

const getMe = async (req, res) => {
  const user = await UserModel.findById(req.user.id);

  res.status(200).json({ user });
};

const refreshAccessToken = async (req, res) => {
  const incomingRefreshToken = req.cookies.refreshToken;

  if (!incomingRefreshToken) {
    return res.status(401).json({
      message: "Refresh token missing",
    });
  }

  try {
    const decoded = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET,
    );

    const user = await UserModel.findById(decoded.id).select("+refreshToken");

    if (!user || !user.refreshToken) {
      return res.status(401).json({
        message: "Invalid refresh token",
      });
    }

    const isMatch = await bcrypt.compare(
      incomingRefreshToken,
      user.refreshToken,
    );

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid refresh token",
      });
    }

    const newAccessToken = generateAccessToken(user._id);

    res.status(200).json({
      accessToken: newAccessToken,
    });
  } catch (error) {
    return res.status(401).json({
      message: "invalid or expired refresh token",
    });
  }
};

const logoutUser = async (req, res) => {
  await UserModel.findByIdAndUpdate(req.user.id, { refreshToken: null });

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  });

  res.status(200).json({
    message: "Logout successfully",
  });
};

export { registerUser, loginUser, getMe, refreshAccessToken, logoutUser };
