import { Router } from "express";
import {
  signup,
  login,
  logout,
  sendOtpHandler,
  verifyOtp,
  getMe,
} from "../controllers/authController.js";
import protect from "../middleware/authMiddleware.js";

const router = Router();

// Public auth endpoints
router.post("/signup", signup);
router.post("/login", login);
router.post("/send-otp", sendOtpHandler);
router.post("/verify-otp", verifyOtp);

// Protected user endpoints
router.post("/logout", protect, logout);
router.get("/me", protect, getMe);

export default router;
