// services/auth.service.js
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import RefreshToken from "../models/RefreshToken.js";
import crypto from "crypto";

const { JWT_SECRET } = process.env;
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not set. Define it in your backend .env");
}

const signAccess = (id) => jwt.sign({ id }, JWT_SECRET, { expiresIn: "15m" });
const signRefresh = () => crypto.randomBytes(48).toString("hex");

// optional: normalize/validate inputs here
export const register = async ({ name, email, password, role, companyName, trainingProvider }) => {
  email = String(email).trim().toLowerCase();

  const exists = await User.findOne({ email });
  if (exists) {
    const err = new Error("Email already registered");
    err.status = 409;
    throw err;
  }

  // optional: enforce conditionals
  if (role === "employer" && !companyName?.trim()) {
    throw new Error("companyName is required for employer");
  }
  if (role === "trainingProvider" && !trainingProvider?.trim()) {
    throw new Error("trainingProvider is required for trainingProvider role");
  }

  const user = await User.create({ name, email, password, role, companyName, trainingProvider });

  const accessToken = signAccess(user._id);
  const refreshToken = signRefresh();
  await RefreshToken.create({ user: user._id, token: refreshToken });

  return {
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      companyName: user.companyName,
      trainingProvider: user.trainingProvider,
    },
    accessToken,
    refreshToken,
    firstTimeLogin: true,
  };
};

export const login = async ({ email, password }) => {
  email = String(email).trim().toLowerCase();

  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid credentials");

  const ok = await user.matchPassword(password);
  if (!ok) throw new Error("Invalid credentials");

  const accessToken = signAccess(user._id);
  const refreshToken = signRefresh();
  await RefreshToken.create({ user: user._id, token: refreshToken });

  return {
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      companyName: user.companyName,
      trainingProvider: user.trainingProvider,
    },
    accessToken,
    refreshToken,
    firstTimeLogin: false,
  };
};

export const refresh = async ({ refreshToken }) => {
  const found = await RefreshToken.findOne({ token: refreshToken });
  if (!found) throw new Error("Invalid refresh token");

  const accessToken = signAccess(found.user);
  // rotate refresh token
  const newRefresh = signRefresh();
  found.token = newRefresh;
  await found.save();

  return { accessToken, refreshToken: newRefresh };
};

export const logout = async ({ refreshToken }) => {
  await RefreshToken.deleteOne({ token: refreshToken });
  return true;
};
