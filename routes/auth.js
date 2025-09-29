import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// Student Register
router.post('/register', async (req, res) => {
  try {
    const { rollNumber, password } = req.body;

    const userExists = await User.findOne({ rollNumber });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({
      rollNumber,
      password,
      role: 'student'
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        rollNumber: user.rollNumber,
        role: user.role,
        token: generateToken(user._id)
      });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Student Login
router.post('/login', async (req, res) => {
  try {
    const { rollNumber, password } = req.body;

    const user = await User.findOne({ rollNumber });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        rollNumber: user.rollNumber,
        role: user.role,
        token: generateToken(user._id)
      });
    } else {
      res.status(401).json({ message: 'Invalid roll number or password' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Admin Login
router.post('/admin/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check for hardcoded admin credentials
    if (username === 'admin@campuscare.com' && password === 'Admin123!') {
      // Create or find admin user
      let adminUser = await User.findOne({ rollNumber: 'admin' });
      
      if (!adminUser) {
        adminUser = await User.create({
          rollNumber: 'admin',
          password: 'Admin123!',
          role: 'admin'
        });
      }

      res.json({
        _id: adminUser._id,
        rollNumber: adminUser.rollNumber,
        role: adminUser.role,
        token: generateToken(adminUser._id)
      });
    } else {
      res.status(401).json({ message: 'Invalid admin credentials' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
