import express from "express";
const authRoutes = express.Router();
import {
  authenticateUser,
  registerUser,
  getUserData,
} from "../controllers/authController.js";
import protect from "../middleware/authMiddleware.js";

authRoutes.route("/").post(registerUser);
authRoutes.route("/login").post(authenticateUser);
authRoutes.route("/me").get(protect, getUserData);

export default authRoutes;
