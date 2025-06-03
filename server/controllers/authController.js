const User = require("../models/User");
const Role = require("../models/Role");
const generateToken = require("../utils/generateToken");

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    // Find default role
    const defaultRole = await Role.findOne({ name: "user" });
    if (!defaultRole) {
      return res.status(500).json({ message: "Default role not found. Please seed roles first." });
    }

    // Create user with default role
    const user = await User.create({
      name,
      email,
      password,
      role: defaultRole._id,
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: defaultRole.name, // Optional, for frontend
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password").populate("role");
    if (!user) return res.status(401).json({ message: "Invalid email or password" });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(401).json({ message: "Invalid email or password" });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role?.name || null,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password").populate("role");
  res.json(user);
};
