import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/authSchema.js";
import config from "config";

// token
const TOKEN_KEY = config.get("TOKEN_KEY");

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      // Verify Token
      const decoded = jwt.verify(token, TOKEN_KEY);

      //Get User from Token
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (err) {
      res.status(400);
      throw new Error("Not Authorized");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("No authorized, no token");
  }
});

export default protect;
