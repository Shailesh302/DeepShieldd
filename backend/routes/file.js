const express = require('express');
const File = require('../models/File');
const router = express.Router();

router.post('/upload', async (req, res) => {
  try {
    const { userId, fileName, fileType, fileUrl } = req.body;
    
    if (!userId || !fileName || !fileType) {
      return res.status(400).json({ error: 'userId, fileName, and fileType are required' });
    }
    
    const file = new File({ userId, fileName, fileType, fileUrl });
    await file.save();
    
    res.status(201).json({ message: 'File recorded successfully', file });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
