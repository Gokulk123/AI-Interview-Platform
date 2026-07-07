const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require("../utils/asyncHandler");

const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const existingUser = await User.findUserByEmail(email);
  if (existingUser) {
    return res.status(400).json({
      message: "Email exists",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.createUser(name, email, hashedPassword);
  res.status(201).json({
    message: "User created",
    user,
  });
});

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findUserByEmail(email);
    if (!existingUser) {
      return res.status(400).json({
        message: "User doesn't exists",
      });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Password Doesn't match",
      });
    }

    const token = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
        role: existingUser.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      },
    );
    res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  register,
  login,
};
