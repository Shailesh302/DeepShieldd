const mongoose = require('mongoose');

const scanSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  fileId: { type: mongoose.Schema.Types.ObjectId, ref: 'File', required: true },
  hash: { type: String, required: true },
  status: { type: String, enum: ['REAL', 'FAKE', 'SUSPICIOUS'], required: true },
  risk: { type: String, enum: ['HIGH', 'LOW', 'MEDIUM'], required: true },
  confidence: { type: Number, required: true },
  reason: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Scan', scanSchema);
