// routes/authRoutes.js
import { Router } from "express";
import { register, login } from "../controllers/authController.js";
import * as authService from "../services/auth.service.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);

router.post("/refresh", async (req, res) => {
  try {
    const data = await authService.refresh(req.body); // { refreshToken }
    res.json({ err: 0, message: "OK", data });
  } catch (e) {
    res.status(401).json({ err: 1, message: e.message || "Refresh failed" });
  }
});

router.post("/logout", async (req, res) => {
  try {
    await authService.logout(req.body); // { refreshToken }
    res.json({ err: 0, message: "OK", data: true });
  } catch (e) {
    res.status(400).json({ err: 1, message: e.message || "Logout failed" });
  }
});

export default router;
