const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.post('/signup', async (req, res) => {
  try {
    const { username, password, role } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password required' });
    }
    
    const existing = await User.findOne({ username });
    if (existing) {
      return res.status(400).json({ error: 'User already exists' });
    }
    
    const user = new User({ username, password, role: role || 'user' });
    await user.save();
    
    res.status(201).json({ message: 'User created successfully', user: { _id: user._id, username: user.username, role: user.role } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password required' });
    }
    
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: 'User not found. Please click "CREATE NODE" to register first.' });
    }
    if (user.password !== password) {
      return res.status(401).json({ error: 'Incorrect password.' });
    }
    
    res.json({ message: 'Login successful', user: { _id: user._id, username: user.username, role: user.role } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
