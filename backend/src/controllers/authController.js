// src/controllers/authController.js
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = new User({ email, password });
    await user.save();

    const token = generateToken(user._id);
    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user._id);
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
