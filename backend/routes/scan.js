const express = require('express');
const Scan = require('../models/Scan');
const router = express.Router();

router.post('/scan', async (req, res) => {
  try {
    const { userId, fileId, status, risk, confidence, reason } = req.body;
    
    if (!userId || !fileId || !status || !risk || confidence === undefined) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    
    const scan = new Scan({ userId, fileId, status, risk, confidence, reason });
    await scan.save();
    
    res.status(201).json({ message: 'Scan result saved successfully', scan });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// User History
router.get('/history/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const scans = await Scan.find({ userId })
      .populate('userId', 'username role')
      .populate('fileId', 'fileName fileType fileUrl')
      .sort({ createdAt: -1 });
    res.json(scans);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Admin History
router.get('/admin/history', async (req, res) => {
  try {
    const scans = await Scan.find()
      .populate('userId', 'username role')
      .populate('fileId', 'fileName fileType fileUrl')
      .sort({ createdAt: -1 });
    res.json(scans);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
