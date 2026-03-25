const express = require('express');
const multer = require('multer');
const File = require('../models/File');
const Scan = require('../models/Scan');
const deepfakeService = require('../services/deepfakeService');
const crypto = require('crypto');

const router = express.Router();

// Configure Multer for processing multipart/form-data
const upload = multer({ storage: multer.memoryStorage() });

router.post('/analyze', upload.single('file'), async (req, res) => {
  try {
    const { userId } = req.body;
    const file = req.file;

    if (!userId || !file) {
      return res.status(400).json({ error: 'Valid userId and multipart file payload are required.' });
    }

    let fileType = 'pdf';
    if (file.mimetype.startsWith('image/')) fileType = 'image';
    else if (file.mimetype.startsWith('video/')) fileType = 'video';
    else if (file.mimetype.startsWith('audio/')) fileType = 'audio';

    // 1. Generate Deterministic Caching Hash from raw Memory Buffer
    const hash = crypto.createHash('sha256').update(file.buffer).digest('hex');

    // 2. Enforce Strict Identical Result Architecture via DB Search
    const existingScan = await Scan.findOne({ hash });
    if (existingScan) {
      return res.status(200).json({
        status: existingScan.status,
        confidence: existingScan.confidence,
        risk: existingScan.risk,
        reason: existingScan.reason,
        cached: true
      });
    }

    // 3. Offload to External APIs vs Fallbacks
    const apiResult = await deepfakeService.analyzeMedias(file.buffer, file.mimetype, fileType, hash);

    // 2. Log file schema with detected status
    const fileRecord = new File({
      userId,
      fileName: file.originalname,
      fileType,
      fileUrl: `/storage/vault/${file.originalname}`,
      status: apiResult.status
    });
    await fileRecord.save();

    // 5. Process detection logic inside SCANS collection with HASH
    const scan = new Scan({
      userId,
      fileId: fileRecord._id,
      hash,
      status: apiResult.status,
      risk: apiResult.risk,
      confidence: apiResult.confidence,
      reason: apiResult.reason
    });
    await scan.save();

    // 4. Resolve client output
    res.status(200).json({
      status: scan.status,
      confidence: scan.confidence,
      risk: scan.risk,
      reason: scan.reason
    });
  } catch (error) {
    console.error('Analysis Endpoint Error:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
