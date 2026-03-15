const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const admin = await Admin.findOne({ username });
    if (admin && (await admin.matchPassword(password))) {
      res.json({
        _id: admin._id,
        username: admin.username,
        token: generateToken(admin._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/seed', async (req, res) => {
  try {
    const exists = await Admin.findOne({ username: 'admin' });
    if (exists) return res.status(400).json({ message: 'Admin already exists' });
    const admin = await Admin.create({ username: 'admin', password: 'admin123' });
    res.status(201).json({ message: 'Admin created', username: admin.username });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
