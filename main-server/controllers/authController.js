import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/authSchema.js";
import config from "config";

// token
const TOKEN_KEY = config.get("TOKEN_KEY");

// @desc   Authenticate User
// @route  POST api/user/login
// @access Public
const authenticateUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // Validate if user exist in our database
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    const token = generateJWT(user._id);
    res.status(200).json({
      _id: user._id,
      email: user.email,
      name: user.name,
      phone: user.phone,
      dealer: user.dealer,
      userIcon: user.userIcon,
      token: token,
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

// @desc   Register User
// @route  POST api/user
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, dealer, password, phone, userIcon } = req.body;
  if (!name || !email || !dealer || !password || !phone || !userIcon) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  // Validate if user exist in our database by email
  const existUser = await User.findOne({ email });

  if (existUser) {
    res.status(400);
    throw new Error("User already exist");
  }

  //Encrypt user password
  const hashedPassword = await bcrypt.hash(password, 10);

  // create a new user object with User constructor
  const user = await User.create({
    name,
    email: email.toLowerCase(),
    dealer,
    phone,
    password: hashedPassword,
    userIcon
  });

  if (user) {
    const token = generateJWT(user._id);
    res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      dealer: user.dealer,
      phone: user.phone,
      userIcon: user.userIcon,
      token: token,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc   Get User Data
// @route  GET api/user/me
// @access Private
const getUserData = asyncHandler(async (req, res) => {
  const { _id, name, email } = await User.findById(req.user.id);
  res.status(200).json({
    id: _id,
    name,
    email,
  });
});

// Generate JWT
const generateJWT = (id) => {
  return jwt.sign({ id }, TOKEN_KEY, {
    expiresIn: "30d",
  });
};

export { authenticateUser, registerUser, getUserData };
