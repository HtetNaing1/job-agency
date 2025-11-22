import * as authService from "../services/auth.service.js";

export const register = async (req, res, next) => {
  try {
    const data = await authService.register(req.body);
    // data should include { accessToken, refreshToken, user, firstTimeLogin? }
    res.status(201).json({ err: 0, message: "OK", data });
  } catch (e) {
    res.status(400).json({ err: 1, message: e.message || "Signup failed" });
  }
};

export const login = async (req, res, next) => {
  try {
    const data = await authService.login(req.body);
    res.status(200).json({ err: 0, message: "OK", data });
  } catch (e) {
    res.status(401).json({ err: 1, message: e.message || "Login failed" });
  }
};
