import * as authService from "../services/auth.service.js";

export const register = async (req, res, next) => {
  try {
    const data = await authService.register(req.body);
    // data should include { accessToken, refreshToken, user, firstTimeLogin? }

    // Set cookies via HTTP headers for better reliability
    const cookieOptions = {
      httpOnly: false, // Allow client-side access for API calls
      secure: process.env.NODE_ENV === 'production', // HTTPS only in production
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      path: '/',
    };

    res.cookie('accessToken', data.accessToken, { ...cookieOptions, maxAge: 15 * 60 * 1000 }); // 15 minutes
    res.cookie('refreshToken', data.refreshToken, cookieOptions); // 7 days

    res.status(201).json({ err: 0, message: "OK", data });
  } catch (e) {
    res.status(400).json({ err: 1, message: e.message || "Signup failed" });
  }
};

export const login = async (req, res, next) => {
  try {
    const data = await authService.login(req.body);

    // Set cookies via HTTP headers for better reliability
    const cookieOptions = {
      httpOnly: false, // Allow client-side access for API calls
      secure: process.env.NODE_ENV === 'production', // HTTPS only in production
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      path: '/',
    };

    res.cookie('accessToken', data.accessToken, { ...cookieOptions, maxAge: 15 * 60 * 1000 }); // 15 minutes
    res.cookie('refreshToken', data.refreshToken, cookieOptions); // 7 days

    res.status(200).json({ err: 0, message: "OK", data });
  } catch (e) {
    res.status(401).json({ err: 1, message: e.message || "Login failed" });
  }
};
