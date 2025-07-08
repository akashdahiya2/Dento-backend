// adminController.js
const Admin = require('../models/adminModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// Signup
const signupAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const adminExists = await Admin.findOne({ email });
    if (adminExists) {
      return res.status(400).json({ message: 'Admin already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = await Admin.create({
      name,
      email,
      password: hashedPassword,
    });
    res.status(201).json({
      _id: newAdmin._id,
      name: newAdmin.name,
      email: newAdmin.email,
      token: generateToken(newAdmin._id),
    });
  } catch (error) {
    res.status(500).json({ message: 'Admin signup failed', error: error.message });
  }
};

// Login
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    res.status(200).json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      token: generateToken(admin._id),
    });
  } catch (error) {
    res.status(500).json({ message: 'Admin login failed', error: error.message });
  }
};

// Dashboard
const getAdminDashboard = async (req, res) => {
  res.status(200).json({
    message: 'Welcome to admin dashboard',
    admin: req.admin,
  });
};

// ✅ Export all
module.exports = {
  signupAdmin,
  loginAdmin,
  getAdminDashboard,
};